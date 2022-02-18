import logo from './logo.png';
import React from 'react';
import s from './header.module.css';
import { connect } from 'react-redux';
import { propTypes } from 'redux-form';

const Header = (props) => {
    return (
        <header 
            className = {s.header}
        >
            <h3
                className={s.headerTitle}
            >Социальная сеть</h3>
            <h3
                className={s.login}
            >{props.auth.login}</h3>
        </header>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Header);