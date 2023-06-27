import React, { useEffect, useState } from 'react'
import styles from './StreamerRecord.module.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { IMAGE_URL, SERVER_HOST } from '../../constants'
import Error from '../Error/Error'
import { PublicStreamer } from '../../contract'

const StreamerRecord = () => {
  const { streamerId } = useParams()
  const [streamer, setStreamer] = useState<PublicStreamer>()
  // const [error, setError] = useState(false)

  const fetchStreamer = async (streamerId: string) => {
    const { data } = await axios.get(`${SERVER_HOST}/api/streamer/${streamerId}`);
    setStreamer(data);
  };

  useEffect(() => {
    if (streamerId) {
      fetchStreamer(streamerId)
    }
    // else {
    //   setError(true)
    // }
  }, [streamerId])

  if (!streamer) {
    return <Error />
  }

  return <div>
    <h2 className={styles.name}>{streamer.name}</h2>
    <div className={styles.info}>
      <img className={styles.image} src={IMAGE_URL} alt={streamer.name} />
      <div className={styles.details}>
        <p className={styles.description}>{streamer.description}</p>
        <p className={styles.platform}>Platform: <strong>{streamer.platform}</strong></p>
      </div>
    </div>
  </div>
}

export default StreamerRecord;
