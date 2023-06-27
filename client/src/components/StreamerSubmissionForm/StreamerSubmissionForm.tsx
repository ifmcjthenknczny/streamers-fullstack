import React, { useState } from 'react';
import axios from 'axios'
import styles from './StreamerSubmissionForm.module.scss'
import { AddStreamerRequest, PLATFORMS, Platform } from '../../contract';
import { SERVER_HOST } from '../../constants';
import classNames from 'classnames'

const defaultFormData: AddStreamerRequest = {
  name: '',
  platform: 'Twitch',
  description: '',
}

const StreamerSubmissionForm = () => {
  const [formData, setFormData] = useState(defaultFormData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`${SERVER_HOST}/api/streamers`, formData)
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        <div>Name:</div>
        <input className={styles.input} type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      </label>
      <label className={classNames(styles.label, styles.platformLabel)}>
        <div>Platform:</div>
        <select className={styles.select} value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}>
          {PLATFORMS.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.label}>
        <div>Description:</div>
        <textarea className={styles.textarea} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Write streamer's description here" />
      </label>
      <button className={styles.submit} type="submit">Submit</button>
    </form>
  );
};
export default StreamerSubmissionForm;