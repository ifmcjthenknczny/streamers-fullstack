import React, { useState, useEffect } from 'react';
import styles from './StreamersList.module.scss'
import VoteBar from '../VoteBar/VoteBar';
import { Link } from 'react-router-dom';
import { query } from '../../helpers';
import useBusy from '../../hooks/useBusy';
import Spinner from '../Spinner/Spinner';
import { BASE_PATHS } from '../../constants';
import Heading from '../Heading/Heading';
import useListRefresh from '../../hooks/useListRefresh';
import { PublicListStreamer } from '../../../../shared/contract';

const StreamersList = () => {
  const [streamers, setStreamers] = useState<PublicListStreamer[]>([]);
  const [isBusy, busyWrapper] = useBusy(true)
  const [needsRefresh, , clearListRefresh] = useListRefresh()

  useEffect(() => {
    fetchStreamers()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (needsRefresh) {
      fetchStreamers()
    }
  }, [needsRefresh]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchStreamers = busyWrapper(async () => {
    const streamers = await query('/streamers', {})
    setStreamers(streamers);
    clearListRefresh()
  })

  if (isBusy) {
    return <Spinner />
  }

  return (
    <div>
      <Heading title="List of streamers:" />
      {!streamers.length && <h5 className={styles.noResults}>No streamers found</h5>}
      {!!streamers.length && <ul className={styles.list}>
        {streamers.map((streamer) => <Streamer key={streamer.id} streamer={streamer} />)}
      </ul>}
    </div>
  );
};

export default StreamersList;

const Streamer = ({ streamer }: { streamer: PublicListStreamer }) => <li className={styles.streamer}>
  <Link to={BASE_PATHS.streamer(streamer.id)} className={styles.link}>
    <div className={styles.name}>{streamer.name}</div>
  </Link>
  <VoteBar initialUpvotes={streamer.upvotes} initialDownvotes={streamer.downvotes} streamerId={streamer.id} />
</li>