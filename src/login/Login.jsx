import { Field, reduxForm } from 'redux-form';
import { createCustomField, Input } from '../formsControl';
import { hasText } from '../redux/validators';
import s from './login.css';
import {login} from '../redux/auth-reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

let LoginForm = (props) => {
    return (
        <form onSubmit = {props.handleSubmit }>
            <div><Field name = {"email"} component = {Input} validate = {hasText}/></div>
            <div><Field placeholder = {"Password"} name = {"password"} type = {'password'} component = {Input} validate = {hasText}/></div>
            <div><Field component = {"input"} name = {"rememberMe"} type = {"checkbox"}/></div> 
            {props.auth.capcha && <img src = {props.auth.capcha}/>}
            {props.auth.capcha && createCustomField([], 'capcha', hasText, Input)}
            {props.error && <div>
                {props.error}
            </div>}
            <button>Login</button>
        </form>
    )
}

let LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {

    let onSubmit = (formData) => {
        console.log(formData);
        props.login(formData.email, formData.password, formData.rememberMe, formData.capcha)
    }

    if (props.auth.isAuth) {
        return <Redirect to = {`/Profile/${props.auth.id}`}/>
    }

    return (
        <div className = {s.loginWrapper}>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit = {onSubmit} auth = {props.auth}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        auth: state.auth
    })
}

export default connect(mapStateToProps, {login})(Login);