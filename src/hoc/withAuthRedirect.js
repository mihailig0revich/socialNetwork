import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

let mapStoreToPropsRerender = (state) => {
    return {
        auth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.auth) {
                return (
                    <Redirect to = {'/Login'}/>
                )
            }
            return (
                <Component {...this.props}/>
            )
        }
    }

    let ConnectAuthRedirectComponent = connect(mapStoreToPropsRerender)(RedirectComponent)

    return ConnectAuthRedirectComponent;
}