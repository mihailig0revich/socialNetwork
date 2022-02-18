import profileReucer from './profile-reducer.js';
import messagesReucer from './messages-reducer.js';
import newsReucer from './news-reducer.js';

export let store = {
    _stateData: {
        messagesPage: {
            newMessageText: "",
            messages: [
                {message: 'Hello', id: 1},
                {message: 'How are u?', id: 2},
                {message: 'Hi', id: 5},
            ],
        },
        profilePage: {
            newPostText: "",
            posts: [
                {message: 'Hello', id: 1},
                {message: 'How are u?', id: 2},
                {message: 'Hi', id: 5},
                {message: 'Privet', id: 3},
                {message: 'Kak dela', id: 2},
            ],
        },
        newsPage: {
            newNewsText: '',
            news: [
                {message: 'Hello', id: 1},
                {message: 'How are u?', id: 2},
                {message: 'Hi', id: 5},
                {message: 'Privet', id: 3},
            ],
        },
    },
    getState: function () {
        return this._stateData;
    },

    dispatch: function (action) {
        this._stateData.profilePage = profileReucer(this._stateData.profilePage, action);
        this._stateData.messagesPage = messagesReucer(this._stateData.messagesPage, action);
        this._stateData.newsPage = newsReucer(this._stateData.newsPage, action);

        this._callSubscriber(this._stateData);
    },

    _callSubscriber: undefined,

    subscribe: function (rerender) {
        this._callSubscriber = rerender;
    }
}

// Message

