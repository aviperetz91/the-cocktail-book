import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import CocktailsReducer from '../store/reducers/CocktailsReducer';
import AuthReducer from '../store/reducers/AuthReducer';

const rootReducer = combineReducers({
    cocktails: CocktailsReducer,
    auth: AuthReducer
})

const Store = createStore(
    rootReducer,
    compose(
        applyMiddleware(ReduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
);

export default Store;