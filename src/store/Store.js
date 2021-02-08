import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import CocktailsReducer from '../store/reducers/CocktailsReducer';
import UserReducer from '../store/reducers/UserReducer';

const rootReducer = combineReducers({
    user: UserReducer,
    cocktails: CocktailsReducer,
})

const Store = createStore(
    rootReducer,
    compose(
        applyMiddleware(ReduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
);

export default Store;