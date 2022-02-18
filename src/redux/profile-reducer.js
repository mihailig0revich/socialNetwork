import { stopSubmit } from 'redux-form';
import {myAPI, profileAPI} from '../api/api';

let ADD_POST = "profile-reducer/ADD_POST";
let SET_USER = "profile-reducer/SET_USER";
let SET_STATUS = "profile-reducer/SET_STATUS";
let SAVE_PHOTO_SUCCESS = 'profile-reducer/SAVE_PHOTO_SUCCESS';

let initialState = {
    newPostText: "",
    posts: [
        {message: 'Hello', id: 1},
        {message: 'How are u?', id: 2},
        {message: 'Hi', id: 5},
        {message: 'Privet', id: 3},
        {message: 'Kak dela', id: 2},
    ],
    profile: '',
    status: '',
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {message: action.newPostText, id: 5}
                ],
            };
        case SET_USER:
            return {
                ...state,
                profile: action.user,
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photo
                }
            }
        default:
            return state;
    }
}

export let addPost = (newPostText) => {
    return {type: "profile-reducer/ADD_POST", newPostText}
}
export let setUser = (user) => {
    return {type: "profile-reducer/SET_USER",
            user}
}
export let setStatus = (status) => {
    return {
        type: 'profile-reducer/SET_STATUS',
        status
    }
}

export const savePhotoSuccess = (photo) => {
    return {
        type: 'profile-reducer/SAVE_PHOTO_SUCCESS',
        photo
    }
}

export const getProfileThunkCreator = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getProfile(userId);

        dispatch(setUser(response.data));
    }
}
export const getStatusThunkCreator = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId);

        dispatch(setStatus(response.data));
    }
}
export const updateStatusThunkCreator = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status);
        
        if (response.data.resultCode == 0) {
            dispatch(setStatus(status));
        }
    }
}

export const savePhotoThunk = (photoFile) => {
    return async (dispatch) => {
        let response = await myAPI.savePhoto(photoFile);

        if (response.data.resultCode == 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }
    }

}

export const saveAboutMeThunk = (AboutMe) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.id;
        let response = await myAPI.saveAboutMe(AboutMe);

        if (response.data.resultCode == 0) {
            dispatch(getProfileThunkCreator(userId));
        } else {
            dispatch(stopSubmit('aboutUserForm', {_error: response.data.messages[0]}));
            return Promise.reject(response.data.messages[0]);
        }
    }

}

export default profileReducer;