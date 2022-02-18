import s from './App.module.css';
import Header from './header/Header.jsx';
import ProfileContainer from './profile/ProfileContainer.jsx';
import MessagesContainer from './dialogs/MessagesContainer.jsx';
import UserContainer from './user/UserContainer.jsx';
import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom";
import SidebarContainer from './sidebar/SidebarContainer';
import Login from './login/Login';
import React from 'react';
import { connect } from 'react-redux';
import {initializedApp} from './redux/app-reducer';
import { compose } from 'redux';
import LoadingPage from './common/LoadingPage';

class App extends React.Component {
  componentDidMount () {
    this.props.initializedApp();
  }

  render () {
    if (!this.props.initialized) {
      return <LoadingPage/>
    }
    

    return (
      <BrowserRouter>
        <div className={s.app}>
          <Header/>
          <SidebarContainer/>
          <Route path = "/Profile/:id" render = {() => <ProfileContainer/>}/>
          <Route path = "/Messages/:id?" render = {() => <MessagesContainer/>}/>
          <Route path = "/User" render = {() => <UserContainer/>}/>
          <Route path = "/Login" render = {() => <Login/>}/>
        </div>
      </BrowserRouter>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
    login: state.auth.id
  }
}

export default compose(
  withRouter,
  connect(MapStateToProps, {initializedApp})
) (App);
