import React from "react"
import styles from './Heading.module.scss'

type Props = {
    title: string
}

const Heading = ({ title }: Props) => <h2 className={styles.heading}>{title}:</h2>

export default Heading