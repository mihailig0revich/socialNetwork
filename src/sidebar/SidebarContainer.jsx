import React from 'react';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import { getMyThunkCreator, logout } from '../redux/auth-reducer';

class SidebarAPIContainer extends React.Component {

    loginCheck () {
        this.props.getMyThunkCreator();
    }

    logout () {
        this.props.logout();
    }

    render () {
        return (
            <Sidebar auth = {this.props.auth}
                        loginCheck = {this.loginCheck.bind(this)}
                        logout = {this.logout.bind(this)}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

let SidebarContainer = connect(mapStateToProps, {
    getMyThunkCreator,
    logout
})(SidebarAPIContainer);

export default SidebarContainer;