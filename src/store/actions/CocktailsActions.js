import axios from 'axios';
import { API_URL } from '@env';
import database from '@react-native-firebase/database';

export const GET_ALL_COCKTAILS = 'GET_ALL_COCKTAILS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORY_COCKTAILS = 'GET_COCKTAILS';
export const GET_COCKTAIL_DETAILS = 'GET_COCKTAIL_DETAILS';
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
export const GET_COCKTAIL_REVIEWS = 'GET_COCKTAIL_REVIEWS';
export const GET_INGREDIENT_LIST = 'GET_INGREDIENT_LIST';
export const GET_GLASS_LIST = 'GET_GLASS_LIST';
export const GET_ALCOHOLIC_LIST = 'GET_ALCOHOLIC_LIST';
export const CLEAR_DATA = 'CLEAR_DATA';

export const getAllCocktails = () => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return async dispatch => {
        letters.forEach(async letter => {
            const response = await axios.get(`${API_URL}/search.php?f=${letter}`)
            dispatch({ type: GET_ALL_COCKTAILS, cocktails: response.data.drinks })
        })
    }
}

export const getCategories = () => {
    return async dispatch => {
        const response = await axios.get(`${API_URL}/list.php?c=list`)
        let categoriesLength = {};
        response.data.drinks.forEach(async category => {
            const categoryCocktails = await axios.get(`${API_URL}/filter.php?c=${category.strCategory}`)
            categoriesLength[category.strCategory] = categoryCocktails.data.drinks.length
            dispatch({ type: GET_CATEGORIES, categories: response.data.drinks, categoriesLength })
        })
    }
}

export const getCategoryCocktails = category => {
    return async dispatch => {
        const response = await axios.get(`${API_URL}/filter.php?c=${category}`)
        dispatch({ type: GET_CATEGORY_COCKTAILS, categoryCocktails: response.data.drinks })
    }
}

export const getCocktailById = id => {
    return async dispatch => {
        const response = await axios.get(`${API_URL}/lookup.php?i=${id}`)
        const selected = response.data.drinks[0]
        dispatch({ type: GET_COCKTAIL_DETAILS, selectedCocktail: selected })
    }
}

export const getCocktailByName = name => {
    return async dispatch => {
        const response = await axios.get(`${API_URL}//search.php?s=${name}`)
        dispatch({ type: GET_SEARCH_RESULTS, searchResults: response.data.drinks })
    }
}

export const getReviewsByCocktailId = (idDrink) => {
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
                dispatch({ type: GET_COCKTAIL_REVIEWS, reviews, ratingAvg })
            } else {
                dispatch({ type: GET_COCKTAIL_REVIEWS, reviews })
            }
        });
    }
}

export const getIngredientList = () => {
    return async dispatch => {
        const response = await axios.get(`${API_URL}/list.php?i=list`)
        dispatch({ type: GET_INGREDIENT_LIST, ingredientList: response.data.drinks })
    }
}

export const getGlassList = () => {
    return async dispatch => {
        const response = await axios.get(`${API_URL}/list.php?g=list`)
        dispatch({ type: GET_GLASS_LIST, glassList: response.data.drinks })
    }
}

export const getAlcoholicList = () => {
    return async dispatch => {
        const response = await axios.get(`${API_URL}/list.php?a=list`)
        dispatch({ type: GET_ALCOHOLIC_LIST, alcoholicList: response.data.drinks })
    }
}

export const clearData = (variable) => {
    return { type: CLEAR_DATA, variable }
}