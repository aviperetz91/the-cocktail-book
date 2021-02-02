import database from '@react-native-firebase/database';

export const LEAVE_FEEDBACK = 'LEAVE_FEEDBACK';
export const GET_REVIEWS = 'GET_REVIEWS';
export const SET_REVIEWS_ERROR = 'SET_REVIEWS_ERROR';


export const leaveFeedback = (idDrink, strDrink, strDrinkThumb, userId, userName, rating, content) => {
    return async dispatch => {
        const dateNow = Date.now()
        const review = {
            idDrink: idDrink,
            strDrink: strDrink,
            strDrinkThumb: strDrinkThumb,
            userId: userId,
            autor: userName,
            rating: rating,
            content: content,
            date: new Date(dateNow)
        }
        try {
            await database().ref(`/reviews/${idDrink}/${dateNow}`).set(review)
            await database().ref(`/users/${userId}/reviews/${dateNow}`).set(review)
        } catch (err) {
            let error;
            if (err.code === 'database/permission-denied') {
                error = 'You need to be logged in to do that';
            } else {
                error = error.message;
            }
            dispatch({ type: SET_REVIEWS_ERROR, error: error })
        }
    }
}

export const getReviewsById = (idDrink) => {
    return async dispatch => {
        database().ref(`/reviews/${idDrink}`).on('value', (snapshot) => {
            const revObj = snapshot.val();
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
        });
    }
}