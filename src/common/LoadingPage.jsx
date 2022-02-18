import LoadIcone from './loader.svg'
import s from './loadingPage.module.css'

const LoadingPage = () => {
    return (
        <div className={s.loadingWrapper}>
            <img src = {LoadIcone}/>
        </div>
    )
    
}

export default LoadingPage