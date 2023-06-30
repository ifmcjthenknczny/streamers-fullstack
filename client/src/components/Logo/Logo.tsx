import React from 'react'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import { BASE_PATHS } from '../../constants'

const Logo = () => <Link to={BASE_PATHS.main} className={styles.link}><div className={styles.logo}>Streamshack</div></Link>

export default Logo