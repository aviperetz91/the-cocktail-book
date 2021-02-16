import {
    GET_ALL_COCKTAILS,
    GET_CATEGORIES,
    GET_CATEGORY_COCKTAILS,
    GET_COCKTAIL_DETAILS,
    GET_SEARCH_RESULTS,
    GET_COCKTAIL_REVIEWS,
    GET_INGREDIENT_LIST,
    GET_GLASS_LIST,
    GET_ALCOHOLIC_LIST,
    CLEAR_DATA,
} from '../actions/CocktailsActions';

const initialState = {
    cocktails: null,
    categories: null,
    categoriesLength: null,
    categoryCocktails: null,
    selectedCocktail: null,
    searchResults: null,
    cocktailReviews: null,
    cocktailRatingAvg: 0,
    ingredientList: null,
    glassList: null,
    alcoholicList: null,
}

const CocktailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COCKTAILS:
            if (action.cocktails) {
                const extendedCocktails = []
                action.cocktails.forEach(cocktail => {
                    const ingredientList = makeIngredientsArray(cocktail);
                    const measureList = makeMeasureArray(cocktail);
                    const extended = extendCocktailObject(cocktail, ingredientList, measureList);
                    extendedCocktails.push(extended)
                })
                return {
                    ...state,
                    cocktails: state.cocktails ? [...state.cocktails, ...extendedCocktails] : extendedCocktails
                }
            } else {
                return {
                    ...state,
                    cocktails: state.cocktails
                }
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
                categoriesLength: action.categoriesLength
            }
        case GET_CATEGORY_COCKTAILS:
            return {
                ...state,
                categoryCocktails: action.categoryCocktails
            }
        case GET_COCKTAIL_DETAILS:
            const ingredientList = makeIngredientsArray(action.selectedCocktail);
            const measureList = makeMeasureArray(action.selectedCocktail);
            const upgradeSelectedCocktail = extendCocktailObject(action.selectedCocktail, ingredientList, measureList);
            return {
                ...state,
                selectedCocktail: upgradeSelectedCocktail
            }
        case GET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.searchResults
            }
        case GET_INGREDIENT_LIST:
            return {
                ...state,
                ingredientList: action.ingredientList
            }
        case GET_GLASS_LIST:
            return {
                ...state,
                glassList: action.glassList
            }
        case GET_ALCOHOLIC_LIST:
            return {
                ...state,
                alcoholicList: action.alcoholicList
            }
        case GET_COCKTAIL_REVIEWS:
            return {
                ...state,
                cocktailReviews: action.reviews,
                cocktailRatingAvg: action.ratingAvg ? action.ratingAvg : 0
            }
        case CLEAR_DATA:
            return {
                ...state,
                [action.variable]: null,
            }
        default:
            return state
    }
}

const makeIngredientsArray = (cocktail) => {
    const ingredientList = [];
    const temp = Object.keys(cocktail).filter(el => {
        return el.includes("strIngredient")
    });
    temp.forEach(el => {
        if (cocktail[el]) {
            ingredientList.push(cocktail[el])
        }
    })
    return ingredientList
}

const makeMeasureArray = (cocktail) => {
    const measureList = [];
    const temp = Object.keys(cocktail).filter(el => {
        return el.includes("strMeasure")
    });
    temp.forEach(el => {
        if (cocktail[el]) {
            measureList.push(cocktail[el])
        }
    })
    return measureList;
}

const extendCocktailObject = (cocktail, ingredientList, measureList) => {
    const upgradeCocktail = { ...cocktail, ingredientList, measureList }
    return upgradeCocktail;
}

export default CocktailsReducer;