import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const SIGNOUT = 'SIGNOUT';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const UPDATE_NAME = 'UPDATE_NAME';
export const UPDATE_PHOTO = 'UPDATE_PHOTO';
export const GET_USER_FAVORITES = 'GET_USER_FAVORITES';
export const GET_USER_REVIEWS = 'GET-USER_REVIEWS';
export const LEAVE_FEEDBACK = 'LEAVE_FEEDBACK';


export const signup = (name, email, passowrd) => {
    return async dispatch => {
        let errorMessage;
        try {
            await auth().createUserWithEmailAndPassword(email, passowrd)
            const idTokenResult = await auth().currentUser.getIdTokenResult()
            const userId = idTokenResult.claims.user_id;
            await database().ref(`/users/${userId}`).set({ userId: userId, userName: name })
            dispatch({ type: SIGNUP, userId: userId, userName: name })
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'That email address is already in use!';
                console.log(errorMessage);
            }
            if (error.code === 'auth/invalid-email') {
                errorMessage = 'That email address is invalid!';
                console.log(errorMessage);
            }
            if (error.code === 'auth/operation-not-allowed') {
                errorMessage = 'That account is not enabled!';
                console.log(errorMessage);
            }
            if (error.code === 'auth/weak-password') {
                errorMessage = 'That password is not strong enough!';
                console.log(errorMessage);
            }
            dispatch({ type: SET_AUTH_ERROR, error: errorMessage })
        }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        let errorMessage;
        try {
            await auth().signInWithEmailAndPassword(email, password)
            const idTokenResult = await auth().currentUser.getIdTokenResult()
            const userId = idTokenResult.claims.user_id;
            const snapshot = await database().ref(`/users/${userId}`).once('value');
            const user = snapshot.val();
            let favoriteIds;
            if (user.favorites) {
                favoriteIds = Object.keys(user.favorites);
            }
            let reviews = []
            if (user.reviews) {
                for (let index in user.reviews) {
                    reviews.push(user.reviews[index])
                }
            }
            dispatch({ type: LOGIN, userId: userId, userName: user.userName, userPhoto: user.userPhoto, userFavoriteIds: favoriteIds, userReviews: reviews })
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                errorMessage = 'That email address is already in use!';
                console.log(errorMessage);
            }
            if (error.code === 'auth/user-disabled') {
                errorMessage = 'The user corresponding to the given email has been disabled!';
                console.log(errorMessage);
            }
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'There is no user corresponding to the that email!';
                console.log(errorMessage);
            }
            if (error.code === 'auth/wrong-password') {
                errorMessage = 'That password is not valid!';
                console.log(errorMessage);
            }
            dispatch({ type: SET_AUTH_ERROR, error: errorMessage })
        }
    }
}

export const setAuthError = (value) => {
    return { type: SET_AUTH_ERROR, error: value }
}

export const signout = () => {
    return async dispatch => {
        await auth().signOut()
        dispatch({ type: SIGNOUT })
    }
}

export const getUserFavoriteIds = (userId) => {
    return async dispatch => {
        const snapshot = await database().ref(`users/${userId}/favorites`).once('value')
        const favoriteObj = snapshot.val()
        if (favoriteObj) {
            const favoriteIds = Object.keys(favoriteObj);
            dispatch({ type: GET_USER_FAVORITES, favorites: favoriteIds })
        }
    }
}

export const toggleFavorite = (favorites, idDrink, userId) => {
    return async dispatch => {
        let updatedFavorites = favorites ? [...favorites] : [];
        const isExist = updatedFavorites.some(fav => fav === idDrink);
        if (isExist) {
            updatedFavorites = favorites.filter(fav => fav !== idDrink)
            await database().ref(`users/${userId}/favorites/${idDrink}`).remove()
        } else {
            updatedFavorites.push(idDrink)
            await database().ref(`users/${userId}/favorites/${idDrink}`).set({ idDrink: idDrink })
        }
        dispatch({ type: GET_USER_FAVORITES, favorites: updatedFavorites })
    }
}

export const getUserReviews = (userId) => {
    return async dispatch => {
        const reviews = [];
        const snapshot = await database().ref(`users/${userId}/reviews`).once('value')
        const reviewsObj = snapshot.val()
        if (reviewsObj) {
            for (let index in reviewsObj) {
                reviews.push(reviewsObj[index])
            }
            dispatch({ type: GET_USER_REVIEWS, reviews: reviews })
        }
    }
}

export const leaveFeedback = (idDrink, strDrink, strDrinkThumb, userId, userName, rating, content) => {
    return async dispatch => {
        const dateNow = Date.now()
        const review = {
            idDrink: idDrink,
            strDrink: strDrink,
            strDrinkThumb: strDrinkThumb,
            userId: userId,
            autor: userName,
            rating: rating,
            content: content,
            date: new Date(dateNow)
        }
        try {
            await database().ref(`/reviews/${idDrink}/${dateNow}`).set(review)
            await database().ref(`/users/${userId}/reviews/${dateNow}`).set(review)
            dispatch({ type: LEAVE_FEEDBACK, review: review })
        } catch (err) {
            let error;
            if (err.code === 'database/permission-denied') {
                error = 'You need to be logged in to do that';
            } else {
                error = error.message;
            }
            console.log(error)
        }
    }
}

export const updateName = (name) => {
    return { type: UPDATE_NAME, name: name }
}

export const updatePhoto = (photo) => {
    return { type: UPDATE_PHOTO, photo: photo }
}

