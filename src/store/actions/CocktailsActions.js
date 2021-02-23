import axios from 'axios';
import { API_URL } from '@env';
import database from '@react-native-firebase/database';

export const GET_COCKTAILS = 'GET_COCKTAILS';
export const MAP_RATING_TO_COCKTAIL = 'MAP_RATING_TO_COCKTAIL';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORY_COCKTAILS = 'GET_COCKTAILS';
export const GET_COCKTAIL_DETAILS = 'GET_COCKTAIL_DETAILS';
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
export const GET_COCKTAIL_REVIEWS = 'GET_COCKTAIL_REVIEWS';
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

export const mapRatingToCocktail = () => {
    return async dispatch => {
        database().ref(`/reviews`).on('value', snapshot => {
            const reviewsObj = snapshot.val();
            const reviews = [];
            let sum, ratingAvg, ratingCocktailMap = {};
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
                        ratingCocktailMap[idDrink] = ratingAvg
                    }
                }
                console.log(ratingCocktailMap)
                reviews.sort((a,b) => new Date(b.date) - new Date(a.date))
            }
            dispatch({ type: MAP_RATING_TO_COCKTAIL, reviews, ratingCocktailMap })
        });
    }
}

export const getCategories = () => {
    return async dispatch => {
        let categorylist = await axios.get(`${API_URL}/list.php?c=list`)
        categorylist = categorylist.data.drinks;
        const categories = categorylist && categorylist.length > 0 ? categorylist.map(category => category.strCategory) : null;
        let categoriesLength = {};
        categories.forEach(async category => {
            const categoryCocktails = await axios.get(`${API_URL}/filter.php?c=${category}`)
            categoriesLength[category] = categoryCocktails.data.drinks.length
            dispatch({ type: GET_CATEGORIES, categories, categoriesLength })
        })
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
        const results = await axios.get(`${API_URL}//search.php?s=${name}`)
        dispatch({ type: GET_SEARCH_RESULTS, searchResults: results.data.drinks })
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