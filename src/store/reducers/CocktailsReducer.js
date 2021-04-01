import {
    GET_COCKTAILS,
    GET_LATEST_COCKTAILS,
    GET_POPULAR_COCKTAILS,
    GET_RANDOM_COCKTAILS,
    GET_REVIEWS,
    GET_CATEGORIES,
    GET_CATEGORY_COCKTAILS,
    GET_COCKTAIL_DETAILS,
    GET_SEARCH_RESULTS,
    GET_INGREDIENT_COCKTAILS,
    GET_INGREDIENT_LIST,
    GET_GLASS_LIST,
    GET_ALCOHOLIC_LIST,
    CLEAR_DATA,
} from '../actions/CocktailsActions';

const initialState = {
    cocktails: null,
    latestCocktails: null,
    popularCocktails: null,
    randomCocktails: null,
    reviews: null,
    cocktailRatingMap: null,
    categories: null,
    categoryCocktails: null,
    ingredientCocktails: null,
    selectedCocktail: null,
    searchResults: null,
    ingredientList: null,
    glassList: null,
    alcoholicList: null,
}

const CocktailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COCKTAILS:
            const extendedCocktails = []
            action.cocktails.forEach(cocktail => {
                const ingredientList = makeIngredientsArray(cocktail);
                const measureList = makeMeasureArray(cocktail);
                const extended = extendCocktailObject(cocktail, ingredientList, measureList);
                extendedCocktails.push(extended)
            })
            return {
                ...state,
                cocktails: extendedCocktails
            }
        case GET_LATEST_COCKTAILS:
            return {
                ...state,
                latestCocktails: action.latestList
            }
        case GET_POPULAR_COCKTAILS:
            return {
                ...state,
                popularCocktails: action.popularList
            }
        case GET_RANDOM_COCKTAILS:
            return {
                ...state,
                randomCocktails: action.randomList
            }
        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.reviews,
                cocktailRatingMap: action.cocktailRatingMap,
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
            }
        case GET_CATEGORY_COCKTAILS:
            return {
                ...state,
                categoryCocktails: action.categoryCocktails
            }
        case GET_INGREDIENT_COCKTAILS:
            return {
                ...state,
                ingredientCocktails: action.ingredientCocktails
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