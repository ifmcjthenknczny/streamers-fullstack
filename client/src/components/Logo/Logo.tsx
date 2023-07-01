import React from 'react'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import { BASE_PATHS, SITE_NAME } from '../../constants'

const Logo = () => <Link to={BASE_PATHS.main} className={styles.link}>
    <div className={styles.logo}>{SITE_NAME}</div>
</Link>

export default Logo