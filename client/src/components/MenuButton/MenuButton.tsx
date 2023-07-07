import React from 'react'
import styles from './MenuButton.module.scss'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { BASE_PATHS } from '../../constants'

type Props = {
    className?: string;
};

const MenuButton = ({ className }: Props) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(BASE_PATHS.main)
    }

    return <button className={classNames(styles.goBack, className)} onClick={handleClick}>
        <strong className={styles.text}>Go to menu</strong>
    </button>
}

export default MenuButton
