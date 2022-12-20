import { combineReducers, createStore, applyMiddleware } from 'redux';
import { countReducer } from "./reducers/reducer"
import { authReducer } from "./reducers/authReducer"
import { pageReducer } from "./reducers/pageReducer"
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    countReducer,
    authReducer,
    pageReducer
})

const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)))

export default store;