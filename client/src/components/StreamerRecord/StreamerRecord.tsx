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
  const [error, setError] = useState(false)


  useEffect(() => {
    if (streamerId) {
      setError(false)
      fetchStreamer(streamerId)
      return
    }
    setError(true)
  }, [streamerId])

  if (error || !streamer) {
    return <Error />
  }

  const fetchStreamer = async (streamerId: string) => {
    const response = await axios.get(`${SERVER_HOST}/api/streamer/${streamerId}`);
    setStreamer(response.data);
  };

  return <div>
    <h2 className={styles.name}>{streamer.name}</h2>
    <img className={styles.image} src={IMAGE_URL} alt={streamer.name} />
    <p className={styles.description}>{streamer.description}</p>
    <p className={styles.platform}>Platform: <strong>{streamer.platform}</strong></p>
  </div>
}

export default StreamerRecord;
