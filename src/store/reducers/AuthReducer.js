import { LOGIN, SIGNUP, SIGNOUT, SET_AUTH_ERROR } from '../actions/AuthActions';

const initialState = {
    token: null,
    userId: null,
    userName: null,
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
                userName: null
            }
        case SET_AUTH_ERROR: {
            return {
                ...state,
                authError: action.error
            }
        }
        default:
            return state;
    }
}

export default AuthReducer;