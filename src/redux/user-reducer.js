import {userAPI} from '../api/api';

const FOLLOW = 'user-reducer/FOLLOW';
const SET_USERS = 'user-reducer/SET_USERS';
const SET_AMOUNT_PAGE = 'user-reducer/SET_AMOUNT_PAGE';
const CHANGE_CURRENT_PAGE = 'user-reducer/CHANGE_CURRENT_PAGE';
const CHANGE_PAGE_LOAD = 'user-reducer/CHANGE_PAGE_LOAD';
const FOLLOW_FETCHING = 'user-reducer/FOLLOW_FETCHING';

let initialState = {
    users: [ ],
    currentPage: 1,
    amountPage: 0,
    amountUsers: 10,
    pageLoad: false,
    userFollowIsFetching: [],
    followingInProgress: false,
};

export let userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((item) => {
                    if (action.id === item.id) {
                        item.followed = !item.followed;
                    }
                    return item;
                }),
            };
        case SET_USERS:
            return {
                ...state,
                users: [
                    ...action.user,
                ]
            };
        case SET_AMOUNT_PAGE:
            return {
                ...state,
                amountPage: action.num,
            }   
        case CHANGE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.newCurrentPage,
            }
        case CHANGE_PAGE_LOAD:
            return {
                ...state,
                pageLoad: action.change,
            }
        case FOLLOW_FETCHING: 
            return {
                ...state,
                followingInProgress: action.fetching,

                userFollowIsFetching: action.fetching
                ? [...state.userFollowIsFetching, action.id]
                : state.userFollowIsFetching.filter(item => item != action.id),
            }
        default:
            return state;
    }
}

export const follow = (id) => {
    return {
        type: 'user-reducer/FOLLOW',
        id,
    }
}

export const setUsers = (user) => {
    return {
        type: 'user-reducer/SET_USERS',
        user,
    }
}

export const setAmountPage = (num) => {
    return {
        type: 'user-reducer/SET_AMOUNT_PAGE',
        num,
    }
}

export const changeCurrentPage = (newCurrentPage) => {
    return {
        type: 'user-reducer/CHANGE_CURRENT_PAGE',
        newCurrentPage,
    }
}

export const changePageLoad = (change) => {
    return {
        type: 'user-reducer/CHANGE_PAGE_LOAD',
        change,
    }
}
export const followFetching = (id, fetching) => {
    return {
        type: 'user-reducer/FOLLOW_FETCHING',
        id,
        fetching,
    }
}

export const getUsersThunkCreator = (amountUsers) => {
    return async (dispatch) => {
        dispatch(changePageLoad(true));
        let response = await userAPI.getUsers(amountUsers);

        dispatch(changePageLoad(false));
        dispatch(setUsers(response.items));
        dispatch(setAmountPage(Math.ceil(response.totalCount/amountUsers)));
    }
}

export const unfollowOnUserThunkCreator = (userID) => {
    return async (dispatch) => {
        dispatch(followFetching(userID, true));
        let response = await userAPI.unfollowOnUser(userID);

        if (response.resultCode == 0) {
            dispatch(follow(userID));
        }
        dispatch(followFetching(userID, false));
    }
}

export const followOnUserThunkCreator = (userID) => {
    return async (dispatch) => {
        dispatch(followFetching(userID, true));
        let response = await userAPI.followOnUser(userID);

        if (response.resultCode == 0) {
            dispatch(follow(userID));
        }
        dispatch(followFetching(userID, false));
    }
}

export const onPageChangeThunkCreator = (pageNumber) => {
    return async (dispatch) => {
        dispatch(changePageLoad(true));
        let response = await userAPI.getNewPageUsers(pageNumber);

        dispatch(changePageLoad(false));
        dispatch(changeCurrentPage(pageNumber));
        dispatch(setUsers(response.items));
    }
}