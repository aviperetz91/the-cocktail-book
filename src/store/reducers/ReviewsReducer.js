import { GET_REVIEWS, SET_REVIEWS_ERROR } from '../actions/ReviewsActions';

const initialState = {
    reviews: null,
    ratingAvg: 0,
    reviewsError: null
}

const ReviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.reviews,
                ratingAvg: action.ratingAvg ? action.ratingAvg : 0
            }
        case SET_REVIEWS_ERROR:
            return {
                ...state,
                reviewsError: action.error
            }
        default:
            return state;
    }
}

export default ReviewsReducer;