import axios from 'axios';
import { API_URL } from '@env';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_CATEGORY_COCKTAILS = 'SET_COCKTAILS';
export const SET_COCKTAIL_DETAILS = 'SET_COCKTAIL_DETAILS'

export const getCategories = () => {
    return async dispatch => {
        const response = await axios.get(`${API_URL}/list.php?c=list`)
        dispatch({ type: SET_CATEGORIES, categories: response.data.drinks })
    }
}

export const getCategoryCocktails = category => {
    return async dispatch => {
        const response = await axios.get(`${API_URL}/filter.php?c=${category}`)
        dispatch({ type: SET_CATEGORY_COCKTAILS, cocktails: response.data.drinks })
    }
}

export const getCocktailById = id => {
    return async dispatch => {
        const response = await axios.get(`${API_URL}/lookup.php?i=${id}`)
        const selected = response.data.drinks[0]
        dispatch({ type: SET_COCKTAIL_DETAILS, selectedCocktail: selected })
    }
}