import { SET_CATEGORIES } from '../actions/CocktailsActions';

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
        default:
            return state
    }
}

export default CocktailsReducer;