import React from 'react'
import styles from './MainPage.module.scss'
import StreamersList from '../StreamersList/StreamersList'
import StreamerSubmissionForm from '../StreamerSubmissionForm/StreamerSubmissionForm'

const MainPage = () => <div className={styles.content}>
    <StreamersList />
    <StreamerSubmissionForm />
</div>

export default MainPage