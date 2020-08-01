import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import CocktailsReducer from '../store/reducers/CocktailsReducer';

const initialState = {}

const rootReducer = combineReducers({
    cocktails: CocktailsReducer
})

const Store = createStore(rootReducer,applyMiddleware(ReduxThunk))

export default Store;