import React from "react";
import { NavLink } from "react-router-dom";
import s from './user.module.css';
import CustomButton from '../common/CustomButton'

const UserUnit = (props) => {
    
    let userFollowed = () => {

        
        !props.followed
        ? props.followOnUserThunkCreator(props.userID)
        : props.unfollowOnUserThunkCreator(props.userID);
    }
    return (
        <div className = {s.userWrapper}>
            <div className = {s.userIcone}></div>
            <div className = {s.textWrapper}>
                <NavLink 
                    to = {'/Profile/' + props.userID} 
                    className = {s.username}
                >
                    {props.userName}
                </NavLink>
                <p className = {s.about}>{props.status}</p>
            </div>
            <CustomButton 
                disabled = {props.userFollowIsFetching.some(item => item == props.userID)}
                cb = {userFollowed}>
                    {props.followed ? 'unfollow' : 'follow'}
            </CustomButton>
        </div>
    )
}

export default UserUnit;