import { SET_CATEGORIES, SET_CATEGORY_COCKTAILS } from '../actions/CocktailsActions';

const initialState = {
    categories: [],
    cocktails: [],
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
            const cocktails = action.cocktails;
            return {
                ...state,
                cocktails: cocktails
            }
        default:
            return state
    }
}

export default CocktailsReducer;