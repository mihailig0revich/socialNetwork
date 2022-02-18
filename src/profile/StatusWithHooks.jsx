import React, { useEffect, useState } from "react";
import s from './profile.module.css';

export const Status = (props) =>  {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.profilePage.status);

    useEffect(()=>{
        setStatus(props.profilePage.status)
    }, [props.profilePage.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatusThunkCreator(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }
    
    return (
        <>
        {editMode 
        ? <input onChange = {onStatusChange} onBlur = {deactivateEditMode} autoFocus = {true} type="text" value = {status} /> 
        : <><span>Статус:</span><b className={s.customStatus} onDoubleClick = {activateEditMode} >{status || "------"}</b></>}
    </>
    )
}