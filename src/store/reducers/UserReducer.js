import {
    LOGIN,
    SIGNUP,
    SIGNOUT,
    SET_AUTH_ERROR,
    UPDATE_NAME,
    UPDATE_PHOTO,
    GET_USER_FAVORITES,
    GET_USER_REVIEWS,
    LEAVE_FEEDBACK,
} from '../actions/UserActions';

const initialState = {
    userId: null,
    userName: null,
    userPhoto: null,
    authError: null,
    userFavoriteIds: null,
    userReviews: null,
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
                userReviews: action.userReviews
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
        case GET_USER_REVIEWS:
            return {
                ...state,
                userReviews: action.reviews
            }
        case LEAVE_FEEDBACK:
            const reviews = state.userReviews ? [...state.userReviews] : [];
            reviews.push(action.review)
            return {
                ...state,
                userReviews: reviews
            }
        default:
            return state;
    }
}

export default AuthReducer;