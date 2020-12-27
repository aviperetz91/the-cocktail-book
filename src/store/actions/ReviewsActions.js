import database from '@react-native-firebase/database';

export const LEAVE_FEEDBACK = 'LEAVE_FEEDBACK';
export const GET_REVIEWS = 'GET_REVIEWS';


export const leaveFeedback = (idDrink, token, userId, userName, rating, content) => {
    return async dispatch => {
        const dateNow = Date.now()
        await database().ref(`/reviews/${idDrink}/${userId}_${dateNow}`).set({
            userId: userId,
            autor: userName,
            rating: rating,
            content: content,
            date: new Date(dateNow)
        })
    }
}

export const getReviewsById = (idDrink) => {
    return async dispatch => {
        const snapshot = await database().ref(`/reviews/${idDrink}`).once('value');
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
    }
}