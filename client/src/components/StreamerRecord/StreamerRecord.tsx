import React, { useEffect, useState } from 'react'
import styles from './StreamerRecord.module.scss'
import { useParams } from 'react-router-dom'
import { IMAGE_URL } from '../../constants'
import Error from '../Error/Error'
import { PublicStreamer } from '../../contract'
import { query } from '../../helpers'
import useBusy from '../../hooks/useBusy'
import Spinner from '../Spinner/Spinner'
import GoBackButton from '../GoBackButton/GoBackButton'

const StreamerRecord = () => {
  const { streamerId } = useParams()
  const [streamer, setStreamer] = useState<PublicStreamer>()
  const [error, setError] = useState(false)
  const [isBusy, busyWrapper] = useBusy(true)

  const fetchStreamer = busyWrapper(async (streamerId: string) => {
    const streamer = await query('/streamer/:streamerId', { params: { streamerId } })
    setStreamer(streamer);
  })

  useEffect(() => {
    if (streamerId) {
      fetchStreamer(streamerId)
    } else {
      setError(true)
    }
  }, [streamerId]) // eslint-disable-line react-hooks/exhaustive-deps

  if (isBusy) {
    return <Spinner />
  }

  if (!streamer || error) {
    return <Error />
  }

  return <><div className={styles.container}>
    <h2 className={styles.name}>{streamer.name}</h2>
    <div className={styles.info}>
      <img className={styles.image} src={IMAGE_URL} alt={streamer.name} />
      <div className={styles.details}>
        <p className={styles.description}>{streamer.description}</p>
        <p className={styles.platform}>Platform: <strong>{streamer.platform}</strong></p>
      </div>
    </div>
  </div>
  <GoBackButton />
  </>
}

export default StreamerRecord;