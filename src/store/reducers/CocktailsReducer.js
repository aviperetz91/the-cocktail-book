import { 
    SET_ALL_COCKTAILS,
    SET_CATEGORIES, 
    SET_CATEGORY_COCKTAILS, 
    SET_COCKTAIL_DETAILS,
    SET_INGREDIENT_LIST,
    SET_GLASS_LIST,
    SET_ALCOHOLIC_LIST,
    CLEAR_DATA 
} from '../actions/CocktailsActions';

const initialState = {
    allCocktails: [],
    categories: [],
    categoryCocktails: [],
    selectedCocktail: {},
    ingredientList: [],
    glassList: [],
    alcoholicList: []
}

const CocktailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_COCKTAILS:             
            return {
                ...state,
                allCocktails: action.cocktails ? [...state.allCocktails, ...action.cocktails] : state.allCocktails
            }
        case SET_CATEGORIES:
            const categories = action.categories.map(category => category.strCategory)
            return {
                ...state,
                categories: categories
            }
        case SET_CATEGORY_COCKTAILS:
            return {
                ...state,
                categoryCocktails: action.categoryCocktails
            }
        case SET_COCKTAIL_DETAILS:
            const ingredientList = makeIngredientsArray(action.selectedCocktail);
            const measureList = makeMeasureArray(action.selectedCocktail);
            const upgradeSelectedCocktail = extendCocktailObject(action.selectedCocktail, ingredientList, measureList);
            return {
                ...state,
                selectedCocktail: upgradeSelectedCocktail
            }
        case SET_INGREDIENT_LIST:
            const ingredients = action.ingredientList.map(ingredient => ingredient.strIngredient1)
            return {
                ...state,
                ingredientList: ingredients
            }
        case SET_GLASS_LIST:
            const glasses = action.glassList.map(glass => glass.strGlass)
            return {
                ...state,
                glassList: glasses
            }
        case SET_ALCOHOLIC_LIST:
            const alcoholic = action.alcoholicList.map(alcoholic => alcoholic.strAlcoholic)
            return {
                ...state,
                alcoholicList: alcoholic
            }
        case CLEAR_DATA: 
            return {
                ...state,
                [action.variable]: action.variable === 'selectedCocktail' ? {} : [],
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