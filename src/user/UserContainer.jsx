import { connect } from 'react-redux';
import User from './User';
import {getUsersThunkCreator, followOnUserThunkCreator, unfollowOnUserThunkCreator, onPageChangeThunkCreator} from '../redux/user-reducer';
import React from "react";
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';

class UserAPIComponent extends React.Component {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.userPage.amountUsers);
    }

    onPageChange = (pageNumber) => {
        this.props.onPageChangeThunkCreator(pageNumber);
    }

    render() {

        return (
            <User userPage = {this.props.userPage}
                    onPageChange = {this.onPageChange}
                    followOnUserThunkCreator = {this.props.followOnUserThunkCreator}
                    unfollowOnUserThunkCreator = {this.props.unfollowOnUserThunkCreator}/>
        )
    }
}

let mapStoreToProps = (state) => {
    return {
        userPage: state.userPage
    }
}

export default compose(
    connect(mapStoreToProps, {
        getUsersThunkCreator,
        followOnUserThunkCreator,
        unfollowOnUserThunkCreator,
        onPageChangeThunkCreator
    }),
    withAuthRedirect
)(UserAPIComponent);