import React from 'react'
import styles from './ErrorPage.module.scss'
import errorImage from '../../assets/error.png'
import MenuButton from '../MenuButton/MenuButton'

const ErrorPage = () => <div className={styles.error}>
    <div className={styles.wrapper}>
        <h1 className={styles.title}>Well, that&apos;s an error! Congrats!</h1>
        <MenuButton className={styles.desktop} />
    </div>
    <div>
        <img className={styles.image} src={errorImage} alt='' />
    </div>
    <MenuButton className={styles.mobile} />
</div>

export default ErrorPage
