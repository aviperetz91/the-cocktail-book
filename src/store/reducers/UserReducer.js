import {
    LOGIN,
    SIGNUP,
    SIGNOUT,
    SET_AUTH_ERROR,
    SET_USER_DETAILS,
    UPDATE_NAME,
    UPDATE_PHOTO,
    GET_USER_FAVORITES,
} from '../actions/UserActions';

const initialState = {
    userId: null,
    userName: null,
    userPhoto: null,
    authError: null,
    userFavoriteIds: null,
    userReviews: null
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
                userFavoriteIds: action.userFavoriteIds,
                userReviews: action.reviews,
            }
        case SIGNOUT:
            return {
                ...state,
                userId: null,
                userName: null,
                userPhoto: null,
                userFavoriteIds: null,
                userReviews: null,
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
                userFavoriteIds: action.userFavoriteIds,
                userReviews: action.userReviews
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
        case GET_USER_FAVORITES:
            return {
                ...state,
                userFavoriteIds: action.favorites
            }
        default:
            return state;
    }
}

export default AuthReducer;