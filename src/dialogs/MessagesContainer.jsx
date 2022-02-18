import { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect.js';
import {addMessageActionCreator, getDialogs} from '../redux/messages-reducer';
import Messages from './Messages.jsx';
import { messages } from '../data/messagesData.js';
import { useParams } from 'react-router-dom';

const MessageContainer = (props) => {

    useEffect(() => {
        props.getDialogs(messages)
    }, [])

    return <Messages
        messagesPage = {props.messagesPage}
        auth = {props.auth}
        addMessageDialogs = {props.addMessageDialogs}
        authLogin = {props.login}
    />
}

let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
        auth: state.auth.isAuth,
        login: state.auth.login,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessageDialogs: (message) => {
            dispatch(addMessageActionCreator(message));
        },
        getDialogs: (message) => {
            dispatch(getDialogs(message));
        },
    }
}

export default compose(
    connect( mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(MessageContainer)