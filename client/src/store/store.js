import { combineReducers, createStore, applyMiddleware } from 'redux';
import { authReducer } from "./reducers/authReducer"
import { pageReducer } from "./reducers/pageReducer"
import { selectedProjectReducer } from "./reducers/selectedProjectReducer"
import { userReducer } from "./reducers/userReducer";
import { projectReducer } from "./reducers/projectReducer"
import { bugReducer } from "./reducers/bugReducer";
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    bugReducer,
    authReducer,
    pageReducer,
    selectedProjectReducer,
    userReducer,
    projectReducer
})

const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)))

export default store;