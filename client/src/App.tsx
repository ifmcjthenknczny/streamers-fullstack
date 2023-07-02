import React from 'react'
import styles from './App.module.scss'
import StreamerRecord from './components/StreamerRecord/StreamerRecord'
import Logo from './components/Logo/Logo'
import MainPage from './components/MainPage/MainPage'
import {Routes, Route} from 'react-router-dom'
import Error from './components/ErrorPage/ErrorPage'
import {BASE_PATHS} from './constants'

const App = () =>
    <div className={styles.appContainer}>
        <Logo />
        <div className={styles.app}>
            <Routes>
                <Route path={BASE_PATHS.main} element={<MainPage />} />
                <Route path={BASE_PATHS.streamer()} element={<StreamerRecord />} />
                <Route path={BASE_PATHS.error} element={<Error />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </div>
    </div>

export default App
