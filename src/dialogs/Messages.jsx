import s from './messages.module.css';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextArea } from '../formsControl';
import { maxLengthCreator } from '../redux/validators';
import CustomButton from '../common/CustomButton'
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const maxLength300 = maxLengthCreator(300);

const Message = (props) => {
    return(
        <div id='wrapperPost' className = {s.wrapperPost}>
            <div className = {s.icon}> </div>
            <div className={s.wrapperPostText}>
                <h4 className = {s.messageUser}>{props.username}</h4>
                <p>{props.message}</p>
            </div>
        </div>
    );
}

const MessageForm = (props) => {

    return (
        <form onSubmit = {props.handleSubmit}>
            <div
                className={s.textAreaWrapper}
            >
                <Field
                className={s.textAreaInput}
                    placeholder = {"Write message"} 
                    name = {"message"} 
                    component = {TextArea} 
                    validate = {maxLength300}
                />
            </div>
            <div className={s.buttonWrapper}>
                <CustomButton cb = {props.viewElement}>
                    Отправить
                </CustomButton>
            </div>
        </form>
    )
}

let MessageReduxForm = reduxForm({form: 'messageForm'})(MessageForm);

const Messages = (props) => {
    let createMessage = [];

    const {id} = useParams()

    const userDialogIndex = props.messagesPage.dialogs.findIndex((item) => item.username === id)

    const userDialog = props.messagesPage.dialogs[userDialogIndex];
    
    if (userDialog) {
        createMessage = userDialog.messages.map((item) => {
            return(
                <Message authLogin = {props.authLogin} key = {item.id} username = {item.username} message = {item.message}/>
            ); 
    });
    }

    const viewElement = () => {
        const objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    let addMessage = (value) => {
        props.addMessageDialogs(value.message);
    }
    
    return (
        <content className = {s.wrapper}>
            <div className = {s.dialogs}>
                <ul className={s.userButtonWrapper}>
                    {
                        props.messagesPage.dialogs.map((item) => {
                            return (
                                <li>
                                    <NavLink key={item.username} className={s.userLink} to = {'/Messages/' + item.username}>
                                        <p>
                                            {item.username}
                                        </p>
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div  id = 'messages' className = {s.messages}>
                {createMessage}
            </div>
            <div className = {s.writeMessage}>
                <MessageReduxForm viewElement = {viewElement} onSubmit = {addMessage}/>
            </div>
        </content>
    );
}

export default Messages;