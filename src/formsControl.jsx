import { Field } from 'redux-form';
import s from './formsControl.module.css';

const FormsControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched&&meta.error;
    return (
        <div className = {hasError ? s.error : ''}> 
            {props.children}
            {hasError ? <div>{meta.error}</div> : ''}
        </div>
    )
}

export const TextArea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormsControl {...props}><textarea {...input} {...restProps}/></FormsControl>
}
export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormsControl {...props}><input {...input} {...restProps}/></FormsControl>
}

export const createCustomField = (plaseholder, name, validators, component, props = {}, text = "") => {
    return (
        <div>
            <Field
            plaseholder = {plaseholder}
            name = {name}
            validate = {validators}
            component = {component}
            {...props}/> {text}
        </div>
    )
}