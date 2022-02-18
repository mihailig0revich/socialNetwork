import { connect } from 'react-redux';
import {addPost,getProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator, savePhotoThunk, saveAboutMeThunk} from '../redux/profile-reducer';
import Profile from './Profile.jsx';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getId, getProfilePage } from '../redux/profile-selector';

class ProfileAPIContainer extends React.Component {
    componentDidMount () {
        this.refreshProfile();
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        if (prevProps.match.params.id != this.props.match.params.id) {
            this.refreshProfile();
        }
    }

    refreshProfile() {
        let userId = this.props.match.params.id ? this.props.match.params.id : this.props.authMe;
        this.props.getProfileThunkCreator(userId);
        this.props.getStatusThunkCreator(userId);
    }

    render () {
    
        return (
            <Profile profilePage = {this.props.profilePage}
                        addPost = {this.props.addPost}
                        updateStatusThunkCreator = {this.props.updateStatusThunkCreator}
                        isOwner = {this.props.match.params.id == this.props.authMe}
                        savePhotoThunk = {this.props.savePhotoThunk}
                        saveAboutMeThunk = {this.props.saveAboutMeThunk}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profilePage: getProfilePage(state),
        authMe: getId(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        addPost,
        getProfileThunkCreator,
        getStatusThunkCreator,
        updateStatusThunkCreator,
        savePhotoThunk,
        saveAboutMeThunk
    }),
    withRouter,
    withAuthRedirect
)(ProfileAPIContainer);