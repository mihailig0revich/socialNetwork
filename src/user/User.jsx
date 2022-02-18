import React from "react";
import CustomButton from "../common/CustomButton";
import LoadingPage from "../common/LoadingPage";
import s from './user.module.css';
import UserUnit from './UserUnit';
import LoadIcone from './Walk.gif';

const User = (props) => {

    let page = [];

    for(let i = 0; i < 5; i++) {
        if ((props.userPage.currentPage - 2) + i > 0 && (props.userPage.currentPage - 2) + i <= props.userPage.amountPage) {
            page.push((props.userPage.currentPage - 2) + i);
        }
    }

    return(
        <div className = {s.content}>
            <div>
                {props.userPage.pageLoad ? <LoadingPage/> : props.userPage.users.map((item) => {
                    return(
                        <UserUnit userName = {item.name}
                                    status = {item.status} 
                                    followed = {item.followed}
                                    userID = {item.id}
                                    followFetching = {props.followFetching}
                                    unfollowFetching = {props.unfollowFetching}
                                    followingInProgress = {props.userPage.followingInProgress}
                                    userFollowIsFetching = {props.userPage.userFollowIsFetching}
                                    followOnUserThunkCreator = {props.followOnUserThunkCreator}
                                    unfollowOnUserThunkCreator = {props.unfollowOnUserThunkCreator}/>
                    )
                })}
            </div>
            <div className = {s.buttonWrapper}>
                <CustomButton cb = {() => {props.onPageChange(props.userPage.currentPage-1)}}>Предыдущая страница</CustomButton>
                    <ul className = {s.pageNumWrapper}>
                        {
                            page.map((item) => {
                                return (
                                    <li 
                                        onClick = {() => {props.onPageChange(item)}} 
                                        className = {props.userPage.currentPage == item ? s.activeLi : s.commonLi}
                                    >
                                        {item}
                                    </li>
                                )
                            })
                        }
                    </ul>
                <CustomButton cb = {() => {props.onPageChange(props.userPage.currentPage+1)}}>Следующая страница</CustomButton>
            </div>
        </div>
    )
}

export default User;