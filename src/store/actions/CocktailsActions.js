import axios from 'axios';
import { API_URL } from '@env';
import database from '@react-native-firebase/database';

export const GET_COCKTAILS = 'GET_COCKTAILS';
export const GET_LATEST_COCKTAILS = 'GET_LATEST_COCKTAILS';
export const GET_POPULAR_COCKTAILS = 'GET_POPULAR_COCKTAILS';
export const GET_RANDOM_COCKTAILS = 'GET_RANDOM_COCKTAILS';
export const GET_REVIEWS = 'GET_REVIEWS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORY_COCKTAILS = 'GET_CATEGORY_COCKTAILS';
export const GET_COCKTAIL_DETAILS = 'GET_COCKTAIL_DETAILS';
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
export const GET_INGREDIENT_COCKTAILS = 'GET_INGREDIENT_COCKTAILS';
export const GET_INGREDIENT_LIST = 'GET_INGREDIENT_LIST';
export const GET_GLASS_LIST = 'GET_GLASS_LIST';
export const GET_ALCOHOLIC_LIST = 'GET_ALCOHOLIC_LIST';
export const CLEAR_DATA = 'CLEAR_DATA';

export const getCocktails = () => {
    return async dispatch => {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        letters.forEach(async letter => {
            const letterCocktails = await axios.get(`${API_URL}/search.php?f=${letter}`)
            dispatch({ type: GET_COCKTAILS, cocktails: letterCocktails.data.drinks })
        })
    }
}

export const getLatestCocktails = () => {
    return async dispatch => {
        const latest = await axios.get(`${API_URL}/latest.php?`)
        dispatch({ type: GET_LATEST_COCKTAILS, latestList: latest.data.drinks })
    }
}

export const getPopularCocktails = () => {
    return async dispatch => {
        const popular = await axios.get(`${API_URL}/popular.php?`)
        dispatch({ type: GET_POPULAR_COCKTAILS, popularList: popular.data.drinks })
    }
}

export const getRandomCocktails = () => {
    return async dispatch => {
        const random = await axios.get(`${API_URL}/randomselection.php?`)
        dispatch({ type: GET_RANDOM_COCKTAILS, randomList: random.data.drinks })
    }
}

export const getReviews = () => {
    return async dispatch => {
        database().ref(`/reviews`).on('value', snapshot => {
            const reviewsObj = snapshot.val();
            const reviews = [];
            let sum, ratingAvg, cocktailRatingMap = {};
            if (reviewsObj) {
                for (let idDrink in reviewsObj) {
                    sum = 0, ratingAvg = 0;
                    if (reviewsObj[idDrink]) {
                        for (let rev in reviewsObj[idDrink]) {
                            if (reviewsObj[idDrink][rev]) {
                                reviews.push(reviewsObj[idDrink][rev])
                                sum += reviewsObj[idDrink][rev].rating;
                            }
                        }
                        ratingAvg = sum / Object.keys(reviewsObj[idDrink]).length
                        cocktailRatingMap[idDrink] = ratingAvg
                    }
                }
                reviews.sort((a, b) => new Date(b.date) - new Date(a.date))
            }
            dispatch({ type: GET_REVIEWS, reviews, cocktailRatingMap })
        });
    }
}

export const getCategories = () => {
    return async dispatch => {
        let categorylist = await axios.get(`${API_URL}/list.php?c=list`)
        categorylist = categorylist.data.drinks;
        const categories = categorylist && categorylist.length > 0 ? categorylist.map(category => category.strCategory) : null;
        const extendedCategories = [];
        for (let i = 0; i < categories.length; i++) {
            const categoryCocktails = await axios.get(`${API_URL}/filter.php?c=${categories[i]}`)
            extendedCategories.push({ name: categories[i], length: categoryCocktails.data.drinks.length })
        }
        dispatch({ type: GET_CATEGORIES, categories: extendedCategories })
    }
}

export const getCategoryCocktails = category => {
    return async dispatch => {
        const categoryCocktails = await axios.get(`${API_URL}/filter.php?c=${category}`)
        dispatch({ type: GET_CATEGORY_COCKTAILS, categoryCocktails: categoryCocktails.data.drinks })
    }
}

export const getCocktailById = id => {
    return async dispatch => {
        const selected = await axios.get(`${API_URL}/lookup.php?i=${id}`)
        dispatch({ type: GET_COCKTAIL_DETAILS, selectedCocktail: selected.data.drinks[0] })
    }
}

export const getCocktailByName = name => {
    return async dispatch => {
        const results = await axios.get(`${API_URL}/search.php?s=${name}`)
        dispatch({ type: GET_SEARCH_RESULTS, searchResults: results.data.drinks })
    }
}

export const getIngredientCocktails = ingredient => {
    return async dispatch => {
        const ingredientCocktails = await axios.get(`${API_URL}/filter.php?i=${ingredient}`)
        dispatch({ type: GET_INGREDIENT_COCKTAILS, ingredientCocktails: ingredientCocktails.data.drinks })
    }
}

export const getIngredientList = () => {
    return async dispatch => {
        let ingredientList = await axios.get(`${API_URL}/list.php?i=list`)
        ingredientList = ingredientList.data.drinks;
        ingredientList = ingredientList && ingredientList.length > 0 ? ingredientList.map(ingredient => ingredient.strIngredient1) : null;
        dispatch({ type: GET_INGREDIENT_LIST, ingredientList })
    }
}

export const getGlassList = () => {
    return async dispatch => {
        let glassList = await axios.get(`${API_URL}/list.php?g=list`)
        glassList = glassList.data.drinks;
        const glasses = []
        if (glassList && glassList.length > 0) {
            glassList.forEach((glass, index) => {
                if (index !== glassList.length - 1) {
                    glasses.push(glass.strGlass);
                }
            })
        }
        dispatch({ type: GET_GLASS_LIST, glassList: glasses })
    }
}

export const getAlcoholicList = () => {
    return async dispatch => {
        let alcoholicList = await axios.get(`${API_URL}/list.php?a=list`)
        alcoholicList = alcoholicList.data.drinks;
        alcoholicList = alcoholicList && alcoholicList.length > 0 ? alcoholicList.map(alcoholic => alcoholic.strAlcoholic) : null;
        dispatch({ type: GET_ALCOHOLIC_LIST, alcoholicList })
    }
}

export const clearData = (variable) => {
    return { type: CLEAR_DATA, variable }
}