import { applyMiddleware, combineReducers, createStore } from "redux";
import messagesReducer from "./messages-reducer";
import newsReducer from "./news-reducer";
import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";
import {userReducer} from "./user-reducer";
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import AppReducer from "./app-reducer";

let reducers = combineReducers({
    messagesPage: messagesReducer,
    profilePage: profileReducer,
    newsPage: newsReducer,
    userPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: AppReducer,

});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;