import React from 'react';
import styles from './App.module.scss'
import StreamerRecord from './components/StreamerRecord/StreamerRecord';
import Logo from './components/Logo/Logo';
import Content from './components/Content/Content';
import { Routes, Route } from 'react-router-dom'
import Error from './components/Error/Error';

const App = () =>
  <>
    <Logo />
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/streamer/:streamerId" element={<StreamerRecord />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  </>

export default App;
