import { 
    SET_CATEGORIES, 
    SET_CATEGORY_COCKTAILS, 
    SET_COCKTAIL_DETAILS,
    SET_INGREDIENT_LIST,
    SET_GLASS_LIST,
    SET_ALCOHOLIC_LIST 
} from '../actions/CocktailsActions';

const initialState = {
    categories: [],
    cocktails: [],
    selectedCocktail: {},

    ingredientList: [],
    glassList: [],
    alcoholicList: []
}

const CocktailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            const categories = action.categories.map(category => category.strCategory)
            return {
                ...state,
                categories: categories
            }
        case SET_CATEGORY_COCKTAILS:
            return {
                ...state,
                cocktails: action.cocktails
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
            return {
                ...state,
                ingredientList: action.ingredientList
            }
        case SET_GLASS_LIST:
            return {
                ...state,
                glassList: action.glassList
            }
        case SET_ALCOHOLIC_LIST:
            return {
                ...state,
                alcoholicList: action.alcoholicList
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