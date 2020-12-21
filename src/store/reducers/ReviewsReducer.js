import { GET_REVIEWS } from '../actions/ReviewsActions';

const initialState = {
    reviews: null,
    ratingAvg: 0
}

const ReviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            return {
                reviews: action.reviews,
                ratingAvg: action.ratingAvg ? action.ratingAvg : 0
            }
        default:
            return state;
    }
}

export default ReviewsReducer;