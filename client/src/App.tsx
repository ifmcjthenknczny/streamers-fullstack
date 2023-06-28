import React from 'react';
import styles from './App.module.scss'
import StreamerRecord from './components/StreamerRecord/StreamerRecord';
import Logo from './components/Logo/Logo';
import MainPage from './components/MainPage/MainPage';
import { Routes, Route } from 'react-router-dom'
import Error from './components/Error/Error';

const App = () =>
  <>
    <Logo />
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/streamer/:streamerId" element={<StreamerRecord />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  </>

export default App;
