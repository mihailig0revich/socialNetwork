import heatter from './heatter.jpg';
import avatar from '../common/loader.svg';
import React, { useState } from 'react';
import s from './profile.module.css';
import { Status } from './StatusWithHooks';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator } from '../redux/validators';
import { Input, TextArea } from '../formsControl';
import { createCustomField } from '../formsControl';
import CustomButton from '../common/CustomButton';


const Post = (props) => {
    return (
        <div className = {s.post}><div className = {s.icone}></div>{props.post}</div>
    );
}

let maxLengthTen = maxLengthCreator(10);

const PostForm = (props) => {

    return (
        <form onSubmit = {props.handleSubmit}>
            <div className = {s.writePost}><Field className={s.textAreaInput} validate = {[maxLengthTen]} placeholder = {"Login"} name = {"newPostText"} component = {TextArea}/></div>
            <div className = {s.buttonBox}><CustomButton cb = {props.handleSubmit}>Отправить</CustomButton></div>
        </form>
    )
}

let PostReduxForm = reduxForm({form: 'post'})(PostForm);

const Profile = (props) => {
    let [editMode, setEditMode] = useState(false);

    let onMainPhotoSelected = (e) => {
        if (e.target.files.length){
            props.savePhotoThunk(e.target.files[0]);
        }
    }

    let createPost = props.profilePage.posts.map((item) => {
        return (
            <>
                <Post post = {item.message}/>
            </>
        );
    });

    let addPost = (values) => {
        props.addPost(values.newPostText);
        values.newPostText = ''
    }

    const onSubmit = (formData) => {
        props.saveAboutMeThunk(formData).then(() => {
            setEditMode(false);
        })

    }

    return (
    <div className = {s.content}>
        <img 
            src = {heatter} 
            className = {s.profileHitter}
        ></img>
        <div
            className={s.avatarWrapper}
        >
            <img 
                src = {
                    props.profilePage.profile 
                    ? props.profilePage.profile.photos.large 
                    : avatar
                } 
                    className = {s.userAvatar}
                ></img>
            {props.isOwner && <input name = {"file"} id = {"file"} type = {"file"} onChange = {onMainPhotoSelected}/>}
            {props.isOwner && <label for="file" className={s.customInput}>Изменить фото</label>}
            
        </div>
        
        <div className = {s.aboutUser}>
            <div className={s.firstAbout}>
                <div>
                    <h3>{props.profilePage.profile.fullName}</h3><Status profilePage = {props.profilePage}
                                                                            updateStatusThunkCreator = {props.updateStatusThunkCreator}/>
                </div>
                <p>День рождения: 03.04.</p>
                <p>Город: Москва</p>
                <p>Образование: МАТИ</p>
            </div>
            <div className={s.secondAbout}>
                {editMode
                ? <AboutUserReduxForm onSubmit = {onSubmit} initialValues = {props.profilePage.profile}/>
                : (props.profilePage.profile && <AboutUser editMode = {() => {setEditMode(true)}} isOwner = {props.isOwner} profile = {props.profilePage.profile}/>)}
            </div>
        </div>
        <div className = {s.posts}>
            <div><h3>Мои посты</h3></div>
            <PostReduxForm  onSubmit = {addPost}/>
            {createPost}           
        </div>
    </div>
    );
}

const AboutUser = (props) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <ul className={s.aboutWrapper}>
                <li><b>Full name:</b> {props.profile.fullName}</li>
                <li><b>Looking for a job:</b> {props.profile.lookingForAJob ? "Yes" : "No"}</li>
                { props.profile.lookingForAJob &&
                    <li><b>My proffessionals skils:</b> {props.profile.lookingForAJobDescription}</li>
                }
                <li><b>About me:</b> {props.profile.aboutMe}</li>
                {
                    open && <li className={s.contactsWrapper}>
                                <b>Contacts:</b>
                                <ul>
                                    {Object.keys(props.profile.contacts).map((key) => {
                                        return <Contacs key = {key} contactTitle = {key} contactValue = {props.profile.contacts[key]}/>
                                    })}
                                </ul>
                            </li>
                    
                }
            </ul>
            <div className={s.buttonWrapper}>
                {
                    !open
                        ? <CustomButton cb={handleOpen}>Развернуть</CustomButton>
                        : <CustomButton cb={handleClose}>Свернуть</CustomButton>
                }
                {props.isOwner && <CustomButton cb = {props.editMode}>Редактировать</CustomButton>}
            </div>
        </>
    )
}

const AboutUserForm = ({handleSubmit, initialValues, error}) => {

    return (
        <form onSubmit = {handleSubmit}>
            {error && <div>{error}</div>}
            <ul>
                
                <li><b>Full name:</b> {createCustomField("Full name", "fullName", [], Input)}</li>
                <li><b>Looking for a job:</b> <Field component = {"input"} name = {"lookingForAJob"} type = {"checkbox"}/></li>
                <li><b>My proffessionals skils:</b> {createCustomField("skils", "lookingForAJobDescription", [], Input)}</li>
                <li><b>About me:</b> {createCustomField("About me", "aboutMe", [], Input)}</li>
                <li><b>Contacts:</b>
                    <ul>
                        {Object.keys(initialValues.contacts).map((key) => {
                            return <li><b>{key}:</b> {createCustomField(key, "contacts." + key, null, Input)}</li>
                        })}
                    </ul>
                </li>
                <li><CustomButton cb = {handleSubmit}>Save</CustomButton></li>
            </ul>
        </form>
    )
}

const AboutUserReduxForm = reduxForm({form: 'aboutUserForm'})(AboutUserForm)

const Contacs = ({contactTitle, contactValue}) => {
    return (
        <li><b>{contactTitle}</b>: {contactValue}</li>
    )
}

export default Profile;