let ADD_NEWS = "news-reducer/ADD_NEWS";

let initialState = {
    newNewsText: '',
    news: [
        {message: 'Hello', id: 1},
        {message: 'How are u?', id: 2},
        {message: 'Hi', id: 5},
        {message: 'Privet', id: 3},
    ],
}

let newsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_NEWS:
            return {
                ...state,
                news: [
                    ...state.news, 
                    {message: action.news, id: 5},
                ],
            };
        default:
            return state;
    }
}

export let addNewsActionCreator = (news) => {
    return {type: "news-reducer/ADD_NEWS", news}
}

export default newsReducer;