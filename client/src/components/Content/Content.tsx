import React from 'react'
import styles from './Content.module.scss'
import StreamersList from '../StreamersList/StreamersList'
import StreamerSubmissionForm from '../StreamerSubmissionForm/StreamerSubmissionForm'

const Content = () => <div className={styles.content}>
    <StreamersList />
    <StreamerSubmissionForm />
</div>

export default Content