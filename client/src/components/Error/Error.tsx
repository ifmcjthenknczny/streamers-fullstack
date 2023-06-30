import styles from './Error.module.scss'
import errorImage from '../../assets/error.png'
import GoBackButton from '../GoBackButton/GoBackButton'

const Error = () => <div className={styles.error}>
    <div className={styles.wrapper}>
        <h1 className={styles.title}>Well, that's an error! Congrats!</h1>
        <GoBackButton className={styles.desktop} />
    </div>
    <div><img className={styles.image} src={errorImage} alt="" /></div>
    <GoBackButton className={styles.mobile} />
</div>

export default Error