import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import CocktailsReducer from '../store/reducers/CocktailsReducer';
import AuthReducer from '../store/reducers/AuthReducer';

const initialState = {}

const rootReducer = combineReducers({
    cocktails: CocktailsReducer,
    auth: AuthReducer
})

const Store = createStore(rootReducer,applyMiddleware(ReduxThunk))

export default Store;