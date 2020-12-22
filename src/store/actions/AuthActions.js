import axios from 'axios';
import { SECRET_KEY, FB_URL } from '@env';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const SIGNOUT = 'SIGNOUT';

export const signup = (name, email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${SECRET_KEY}`, {
                email: email,
                password: password,
                returnSecureToken: true
            });
            const userId = response.data.localId;
            const token = response.data.idToken;
            await axios.post(`${FB_URL}/users/${userId}.json?auth=${token}`, { userId: userId, userName: name })
            dispatch({ type: SIGNUP, token: token, userId: userId, userName: name })
            return response.data;
        } catch (err) {
            let errorMessage = '';
            const errorType = err.response.data.error.message;
            if (errorType === 'EMAIL_EXISTS') {
                errorMessage = 'This email address is already in use'            
            } else if (errorType === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                errorMessage = 'We have blocked all requests from this device due to unusual activity'
            }
            throw new Error(errorMessage)
        }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${SECRET_KEY}`, {
                email: email,
                password: password,
                returnSecureToken: true
            })
            const userId = response.data.localId;
            const token = response.data.idToken;
            const userData = await axios.get(`${FB_URL}/users/${userId}.json`)
            const keys = Object.keys(userData.data)
            const userName = userData.data[keys[0]].userName;
            dispatch({ type: LOGIN, token: token, userId: userId, userName: userName })
            return response.data;
        } catch (err) {
            let errorMessage = '';
            const errorType = err.response.data.error.message;
            if (errorType === 'EMAIL_NOT_FOUND') {
                errorMessage = 'This email could not be found'
            } else if (errorType === 'INVALID_PASSWORD') {
                errorMessage = 'This password is not valid'
            } else if (errorType === 'USER_DISABLED') {
                errorMessage = 'The user account has been disabled by an administrator'
            } else if (errorType === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                errorMessage = 'Access to this account has been temporarily disabled due to many failed login attempts'
            }
            throw new Error(errorMessage)
        }
    }
}

export const signout = () => {
    return { type: SIGNOUT }
}