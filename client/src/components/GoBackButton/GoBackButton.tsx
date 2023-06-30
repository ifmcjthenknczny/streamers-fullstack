import React from 'react'
import styles from './GoBackButton.module.scss'
import { useNavigate } from 'react-router-dom'

const GoBackButton = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(-1)
    }

    return <button className={styles.goBack} onClick={handleClick}>Go Back</button>
}

export default GoBackButton