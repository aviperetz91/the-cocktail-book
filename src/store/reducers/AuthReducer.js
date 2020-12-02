import { LOGIN, SIGNUP, SIGNOUT } from '../actions/AuthActions';

const initialState = {
    token: null,
    userId: null,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                token: action.token,
                userId: action.userId
            }
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId
            }
        case SIGNOUT:
            return {
                token: null,
                userId: null
            }
        default:
            return state;
    }
}

export default AuthReducer;