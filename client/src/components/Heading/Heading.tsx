import React from 'react'
import styles from './Heading.module.scss'
import classNames from 'classnames'

type Props = {
	title: string;
	className?: string;
};

const Heading = ({title, className}: Props) => <h2 className={classNames(styles.heading, className)}>{title}</h2>

export default Heading
