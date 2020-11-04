import axios from 'axios';
import { SECRET_KEY } from '@env';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${SECRET_KEY}`, {
                email: email,
                password: password,
                returnSecureToken: true
            });
            console.log(response.data)
            dispatch({ type: SIGNUP })
        } catch (err) {
            console.log(err)
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
            });
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
        dispatch({ type: LOGIN })
    }
}