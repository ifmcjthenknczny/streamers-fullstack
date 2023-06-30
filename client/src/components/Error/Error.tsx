import styles from './Error.module.scss'
import errorImage from '../../assets/error.png'

const Error = () => <div className={styles.error}>
    <h1 className={styles.title}>Well, that's an error! Congrats!</h1>
    <div><img className={styles.image} src={errorImage} alt="" /></div>
</div>

export default Error