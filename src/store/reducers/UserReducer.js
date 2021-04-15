import {
    LOGIN,
    SIGNUP,
    SIGNOUT,
    SET_AUTH_ERROR,
    SET_USER_DETAILS,
    UPDATE_NAME,
    UPDATE_PHOTO,
} from '../actions/UserActions';

const initialState = {
    userId: null,
    userName: null,
    userPhoto: null,
    authError: null,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return {
                ...state,
                userId: action.userId,
                userName: action.userName
            }
        case LOGIN:
            return {
                ...state,
                userId: action.userId,
                userName: action.userName,
                userPhoto: action.userPhoto,
            }
        case SIGNOUT:
            return {
                ...state,
                userId: null,
                userName: null,
                userPhoto: null,
            }
        case SET_AUTH_ERROR:
            return {
                ...state,
                authError: action.error
            }
        case SET_USER_DETAILS:
            return {
                ...state,
                userId: action.userId,
                userName: action.userName,
                userPhoto: action.userPhoto,
            }
        case UPDATE_NAME:
            return {
                ...state,
                userName: action.name
            }
        case UPDATE_PHOTO:
            return {
                ...state,
                userPhoto: action.photo
            }
        default:
            return state;
    }
}

export default AuthReducer;