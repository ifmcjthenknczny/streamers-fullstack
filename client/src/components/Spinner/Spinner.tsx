import React from 'react'
import styles from './Spinner.module.scss'

const DOTS_COUNT = 3 // eslint-disable-line @typescript-eslint/naming-convention

const Spinner = () => <div className={styles.spinner}>
    {Array(DOTS_COUNT).fill(null).map((_, index) => (
        <div key={index} className={styles.dot} />
    ))}
</div>

export default Spinner
