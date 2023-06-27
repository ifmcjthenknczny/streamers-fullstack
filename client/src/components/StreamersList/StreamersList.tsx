import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './StreamersList.module.scss'
import VoteBar from '../VoteBar/VoteBar';
import { SERVER_HOST } from '../../constants';
import { PublicListStreamer } from '../../contract';
import { Link } from 'react-router-dom';
// import useBusy from '../../hooks/useBusy';

const StreamersList = () => {
  const [streamers, setStreamers] = useState<PublicListStreamer[]>([]);
  // const [busy, busyWrapper] = useBusy(true)

  useEffect(() => {
    fetchStreamers()
  }, []);

  const fetchStreamers = async () => {
    const { data } = await axios.get(`${SERVER_HOST}/api/streamers`);
    setStreamers(data);
  };

  return (
    <div>
      <h2 className={styles.heading}>List of streamers:</h2>
      {!streamers.length && <h5>No streamers found</h5>}
      {!!streamers.length && <ul className={styles.list}>
        {streamers.map((streamer) => <Streamer key={streamer.id} streamer={streamer} />)}
      </ul>}
    </div>
  );
};

export default StreamersList;

const Streamer = ({ streamer }: { streamer: PublicListStreamer }) => <li className={styles.streamer}>
  <Link to={`/streamer/${streamer.id}`} className={styles.link}>
    <div className={styles.name}>{streamer.name}</div></Link>
  <VoteBar initialUpvotes={streamer.upvotes} initialDownvotes={streamer.downvotes} streamerId={streamer.id} />

</li>