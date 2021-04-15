import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const SIGNOUT = 'SIGNOUT';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const UPDATE_NAME = 'UPDATE_NAME';
export const UPDATE_PHOTO = 'UPDATE_PHOTO';

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
            }
            if (error.code === 'auth/invalid-email') {
                errorMessage = 'That email address is invalid!';
            }
            if (error.code === 'auth/operation-not-allowed') {
                errorMessage = 'That account is not enabled!';
            }
            if (error.code === 'auth/weak-password') {
                errorMessage = 'That password is not strong enough!';
            }
            dispatch({ type: SET_AUTH_ERROR, error: errorMessage })
        }
    }
}

export const login = (email, password, uid) => {
    return async dispatch => {
        let errorMessage;
        try {
            await auth().signInWithEmailAndPassword(email, password)
            const idTokenResult = await auth().currentUser.getIdTokenResult()
            const userId = idTokenResult.claims.user_id;
            const snapshot = await database().ref(`/users/${userId}`).once('value');
            const user = snapshot.val();
            dispatch({ type: LOGIN, userId: userId, userName: user.userName, userPhoto: user.userPhoto })
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                errorMessage = 'That email address is already in use!';
            }
            if (error.code === 'auth/user-disabled') {
                errorMessage = 'The user corresponding to the given email has been disabled!';
            }
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'There is no user corresponding to the that email!';
            }
            if (error.code === 'auth/wrong-password') {
                errorMessage = 'That password is not valid!';
            }
            dispatch({ type: SET_AUTH_ERROR, error: errorMessage })
        }
    }
}

export const signout = () => {
    return async dispatch => {
        await auth().signOut()
        dispatch({ type: SIGNOUT })
    }
}

export const setAuthError = (value) => {
    return { type: SET_AUTH_ERROR, error: value }
}

export const setUserDetails = (userId) => {
    return async dispatch => {
        await database().ref(`/users/${userId}`).once('value', snapshot => {
            const user = snapshot.val();
            dispatch({ type: SET_USER_DETAILS, userId: userId, userName: user.userName, userPhoto: user.userPhoto })
        })
    }
}

export const toggleFavorite = (favorites, idDrink, userId) => {
    return async dispatch => {
        let updatedFavorites = favorites ? [...favorites] : [];
        const isExist = updatedFavorites.some(fav => fav === idDrink);
        if (isExist) {
            updatedFavorites = favorites.filter(fav => fav !== idDrink)
            await database().ref(`users/${userId}/favoritesIds/${idDrink}`).remove()
        } else {
            updatedFavorites.push(idDrink)
            await database().ref(`users/${userId}/favoritesIds/${idDrink}`).set({ idDrink: idDrink })
        }
    }
}

export const leaveFeedback = (idDrink, strDrink, strDrinkThumb, userId, userName, rating, content) => {
    return async dispatch => {
        const dateNow = Date.now()
        const review = {
            reviewId: `${userId}_${dateNow}`,
            idDrink: idDrink,
            strDrink: strDrink,
            strDrinkThumb: strDrinkThumb,
            userId: userId,
            autor: userName,
            rating: rating,
            content: content,
            date: dateNow
        }
        try {
            await database().ref(`/reviews/${idDrink}/${userId}_${dateNow}`).set(review)
            await database().ref(`/users/${userId}/reviewsIds/${userId}_${dateNow}`).set({ reviewId: review.reviewId })
        } catch (err) {
            let error;
            if (err.code === 'database/permission-denied') {
                error = 'You need to be logged in to do that';
            } else {
                error = error.message;
            }
        }
    }
}

export const editFeedback = (idDrink, date, content, userId) => {
    return async dispatch => {
        try {
            await database().ref(`/reviews/${idDrink}/${userId}_${date}`).update({content: content})
        } catch(err) {
            console.log(err)
        }
    }
}

export const deleteFeedback = (idDrink, date, userId) => {
    return async dispatch => {
        try {
            await database().ref(`/reviews/${idDrink}/${userId}_${date}`).remove()
            await database().ref(`/users/${userId}/reviewsIds/${userId}_${date}`).remove()
        } catch(err) {
            console.log(err)
        }
    }
}

export const updateName = (name) => {
    return { type: UPDATE_NAME, name: name }
}

export const updatePhoto = (photo) => {
    return { type: UPDATE_PHOTO, photo: photo }
}

