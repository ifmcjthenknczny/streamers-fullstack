import React from 'react'
import styles from './GoBackButton.module.scss'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

type Props = {
    className?: string
}

const GoBackButton = ({className}: Props) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(-1)
    }

    return <button className={classNames(styles.goBack, className)} onClick={handleClick}><strong className={styles.text}>Go Back</strong></button>
}

export default GoBackButton