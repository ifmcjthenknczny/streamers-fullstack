import React from 'react'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'

const Logo = () => <Link to="/" className={styles.link}><div className={styles.logo}>Streamshack</div></Link>

export default Logo