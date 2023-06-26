import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './StreamersList.module.scss'
import VoteBar from '../VoteBar/VoteBar';
import { SERVER_HOST } from '../../constants';
import { PublicStreamer } from '../../contract';

const StreamersList = () => {
  const [streamers, setStreamers] = useState<PublicStreamer[]>([]);

  useEffect(() => {
    fetchStreamers();
  }, []);

  const fetchStreamers = async () => {
    const response = await axios.get(`${SERVER_HOST}/api/streamers`);
    setStreamers(response.data);
  };

  return (
    <div>
      <h2 className={styles.heading}>List of streamers</h2>
      { streamers.length && <ul className={styles.list}>
        {streamers.map((streamer) => <Streamer streamer={streamer} />)}
      </ul> }
      { !streamers.length && <h5>No streamers found</h5> }
    </div>
  );
};

export default StreamersList;

const Streamer = ({ streamer }: { streamer: PublicStreamer }) => <li className={styles.streamer} key={streamer.id}>
  <div className={styles.name}>{streamer.name}</div>
  <VoteBar initialUpvotes={streamer.upvotes} initialDownvotes={streamer.downvotes} streamerId={streamer.id} />
</li>