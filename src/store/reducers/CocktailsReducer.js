import { SET_CATEGORIES, SET_CATEGORY_COCKTAILS, SET_COCKTAIL_DETAILS } from '../actions/CocktailsActions';

const initialState = {
    categories: [],
    cocktails: [],
    selectedCocktail: {}
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