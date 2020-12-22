import { LOGIN, SIGNUP, SIGNOUT } from '../actions/AuthActions';

const initialState = {
    token: null,
    userId: null,
    userName: null,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                token: action.token,
                userId: action.userId,
                userName: action.userName
            }
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId,
                userName: action.userName
            }
        case SIGNOUT:
            return {
                token: null,
                userId: null,
                userName: null
            }
        default:
            return state;
    }
}

export default AuthReducer;