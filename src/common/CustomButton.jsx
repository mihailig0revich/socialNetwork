import s from './customButton.module.css';

const CustomButton = ({cb, children}) => {
    return <button onClick={cb} className={s.buttonStyle}>{children}</button>
}

export default CustomButton