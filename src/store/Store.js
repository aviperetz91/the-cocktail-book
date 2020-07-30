import { createStore, combineReducers } from 'redux';
import CocktailsReducer from '../store/reducers/CocktailsReducer';

const rootReducer = combineReducers({
    cocktails: CocktailsReducer
})

const Store = createStore(rootReducer)

export default Store;