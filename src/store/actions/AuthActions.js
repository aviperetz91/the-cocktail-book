import axios from 'axios';
import { SECRET_KEY } from '@env';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const SIGNOUT = 'SIGNOUT';

export const signup = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${SECRET_KEY}`, {
                email: email,
                password: password,
                returnSecureToken: true
            });
            dispatch({ type: SIGNUP, token: response.data.idToken, userId: response.data.localId })
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
            dispatch({ type: LOGIN, token: response.data.idToken, userId: response.data.localId })
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