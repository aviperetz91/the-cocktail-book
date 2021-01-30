import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const SIGNOUT = 'SIGNOUT';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const SET_PHOTO = 'SET_PHOTO';

export const signup = (name, email, passowrd) => {
    return async dispatch => {
        let errorMessage;
        try {
            await auth().createUserWithEmailAndPassword(email, passowrd)
            const idTokenResult = await auth().currentUser.getIdTokenResult()
            const token = idTokenResult.token;
            const userId = idTokenResult.claims.user_id;
            await database().ref(`/users/${userId}`).set({ userId: userId, userName: name })
            dispatch({ type: SIGNUP, token: token, userId: userId, userName: name })
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
            const token = idTokenResult.token;
            const userId = idTokenResult.claims.user_id;
            const snapshot = await database().ref(`/users/${userId}`).once('value');
            const user = snapshot.val();
            dispatch({ type: LOGIN, token: token, userId: userId, userName: user.userName, userPhoto: user.userPhoto })
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

export const setPhoto = (photo) => {
    return { type: SET_PHOTO, photo: photo }
}