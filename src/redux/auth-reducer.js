import { stopSubmit } from 'redux-form';
import {myAPI} from '../api/api';

let SET_AUTH_USER = "auth-reducer/SET_AUTH_USER";
let SET_CAPCHA = "auth-reducer/SET_CAPCHA";

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    capcha: null,
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                ...action.user,
            };
        case SET_CAPCHA:
            return {
                ...state,
                capcha: action.capcha,
            };
        default:
            return state;
    }
}

export let setAuthUser = (id, email, login, isAuth) => {
    return {type: "auth-reducer/SET_AUTH_USER", user: {id, email, login, isAuth}}
}
export let setCapcha = (capcha) => {
    return {type: "auth-reducer/SET_CAPCHA", capcha}
}

export const getMyThunkCreator = () => {
    return async (dispatch) => {
        let response = await myAPI.getMe()

        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;
            dispatch(setAuthUser(id, email, login, true));
        }
    }
}

export const login = (email, password, rememberMe, capcha = null) => {
    return async (dispatch) => {
        let response = await myAPI.login(email, password, rememberMe, capcha);

        if (response.data.resultCode === 0) {
            dispatch(getMyThunkCreator());
        } else {
            if (response.data.resultCode === 10) {
                dispatch(capchaThunk());
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error';
            dispatch(stopSubmit("login", {_error: message}))
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        let response = await myAPI.logout();
    
        if (response.data.resultCode === 0) {
            dispatch(setAuthUser(null, null, null, false));
        }
    }
}

export const capchaThunk = () => {
    return async (dispatch) => {
        let response = await myAPI.capcha();
        const capcha = response.data.url;

        dispatch(setCapcha(capcha));
    }
}



export default authReducer;