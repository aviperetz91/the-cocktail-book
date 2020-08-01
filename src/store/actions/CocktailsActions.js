import axios from 'axios';

export const SET_CATEGORIES = 'GET_CATEGORIES';

export const getCategories = () => {
    return async dispatch => {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        dispatch({ type: SET_CATEGORIES, categories: response.data.drinks })
    }
}