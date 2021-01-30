import { LOGIN, SIGNUP, SIGNOUT, SET_AUTH_ERROR, SET_PHOTO } from '../actions/AuthActions';

const initialState = {
    token: null,
    userId: null,
    userName: null,
    userPhoto: null,
    authError: null
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                userName: action.userName,
                userPhoto: action.userPhoto
            }
        case SIGNUP:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                userName: action.userName
            }
        case SIGNOUT:
            return {
                ...state,
                token: null,
                userId: null,
                userName: null,
                userPhoto: null,
            }
        case SET_AUTH_ERROR: 
            return {
                ...state,
                authError: action.error
            }
        case SET_PHOTO:
            return {
                ...state,
                userPhoto: action.photo
            }
        
        default:
            return state;
    }
}

export default AuthReducer;