import axios from 'axios';
import { API_URL } from '@env';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_CATEGORY_COCKTAILS = 'SET_COCKTAILS';
export const SET_COCKTAIL_DETAILS = 'SET_COCKTAIL_DETAILS';

export const SET_INGREDIENT_LIST = 'SET_INGREDIENT_LIST';
export const SET_GLASS_LIST = 'SET_GLASS_LIST';
export const SET_ALCOHOLIC_LIST = 'SET_ALCOHOLIC_LIST';

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

export const getIngredientList = () => {
    return async dispatch => {
        const response = await axios.get(`${API_URL}/list.php?i=list`)
        dispatch({ type: SET_INGREDIENT_LIST, ingredientList: response.data.drinks })
    }
}

export const getGlassList = () => {
    return async dispatch => {
        const response = await axios.get(`${API_URL}/list.php?g=list`)
        dispatch({ type: SET_GLASS_LIST, glassList: response.data.drinks })
    }
}

export const getAlcoholicList = () => {
    return async dispatch => {
        const response = await axios.get(`${API_URL}/list.php?a=list`)
        dispatch({ type: SET_ALCOHOLIC_LIST, alcoholicList: response.data.drinks })
    }
}