let ADD_MESSAGE = "messages-reducer/ADD_MESSAGE";
let GET_DIALOGS = "messages-reducer/GET_DIALOGS";

let initialState = {
    messages: [
        {message: 'Hello', id: 1},
        {message: 'How are u?', id: 2},
        {message: 'Hi', id: 5},
    ],
    dialogs: []
}

let messagesReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {message: action.message, id: 3}
                ],
            };
        case GET_DIALOGS:
            return {
                ...state,
                dialogs: [...action.dialogs]
            }
        default:
            return state;
    }
}

export const getDialogs = (dialogs) => {
    return {
        type: 'messages-reducer/GET_DIALOGS',
        dialogs,
    }
}

export let addMessageActionCreator = (message) => {
    return {type: "messages-reducer/ADD_MESSAGE", message}
}

export default messagesReducer;