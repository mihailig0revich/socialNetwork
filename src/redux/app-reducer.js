import { getMyThunkCreator } from './auth-reducer';

let INITIALIZED_SUCCSESS = "app-reducer/INITIALIZED_SUCCSESS";

let initialState = {
    initialized: false,
}

const AppReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALIZED_SUCCSESS:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
}

export let initializedSuccsess = () => {
    return {type: "app-reducer/INITIALIZED_SUCCSESS",}
}

export const initializedApp = () => {
    return (dispatch) => {
        let promise = dispatch(getMyThunkCreator());
        Promise.all([promise]).then(() => {
            dispatch(initializedSuccsess())
        })
    }
}

export default AppReducer;