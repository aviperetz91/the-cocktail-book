import axios from 'axios';
import { FB_URL } from '@env';

export const LEAVE_FEEDBACK = 'LEAVE_FEEDBACK';
export const GET_REVIEWS = 'GET_REVIEWS';


export const leaveFeedback = (idDrink, token, userId, rating, comment) => {
    return async dispatch => {
        const response = await axios.post(`${FB_URL}/reviews/${idDrink}.json?auth=${token}`, {
            userId: userId,
            rating: rating,
            comment: comment
        })
    }
}

export const getReviewsById = (idDrink) => {
    return async dispatch => {
        const response = await axios.get(`${FB_URL}/reviews/${idDrink}.json`)
        const revObj = response.data;
        const reviews = [];
        for (let i in revObj) {
            reviews.push(revObj[i])
        }
        let ratingSum = 0, ratingAvg = 0;
        if (reviews.length > 0) {
            reviews.forEach(rev => ratingSum += rev.rating);
            ratingAvg = ratingSum / reviews.length;
            dispatch({ type: GET_REVIEWS, reviews, ratingAvg })
        } else {
            dispatch({ type: GET_REVIEWS, reviews })
        }
    }
}