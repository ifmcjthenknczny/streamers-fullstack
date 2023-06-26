import React from 'react';
import StreamersList from './components/StreamersList/StreamersList';
import styles from './App.module.scss'
import StreamerSubmissionForm from './components/StreamerSubmissionForm/StreamerSubmissionForm';
import StreamerRecord from './components/StreamerRecord/StreamerRecord';

function App() {
  return (
    <div className={styles.app}>
      <StreamersList />
      <div>
        <StreamerSubmissionForm />
        <StreamerRecord />
      </div>
    </div>
  );
}

export default App;
