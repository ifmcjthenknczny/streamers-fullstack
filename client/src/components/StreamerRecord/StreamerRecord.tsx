import React, { useEffect, useState } from 'react'
import styles from './StreamerRecord.module.scss'
import { useParams } from 'react-router-dom'
import Error from '../ErrorPage/ErrorPage'
import { query } from '../../helpers'
import useBusy from '../../hooks/useBusy'
import Spinner from '../Spinner/Spinner'
import GoBackButton from '../GoBackButton/GoBackButton'
import Heading from '../Heading/Heading'
import { type PublicStreamer } from '../../contract'

const IMAGE_URL =
  'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png'

const StreamerRecord = () => {
    const { streamerId } = useParams()
    const [streamer, setStreamer] = useState<PublicStreamer>()
    const [error, setError] = useState(false)
    const [isBusy, busyWrapper] = useBusy(true)

    const fetchStreamer = busyWrapper(async (streamerId: string) => {
        const streamer = await query('/streamer/:streamerId', { params: { streamerId } })
        setStreamer(streamer)
    })

    useEffect(() => {
        if (streamerId) {
            fetchStreamer(streamerId) // eslint-disable-line @typescript-eslint/no-floating-promises
        } else {
            setError(true)
        }
    }, [streamerId])

    if (isBusy) {
        return <Spinner />
    }

    if ((streamer == null) || error) {
        return <Error />
    }

    return <div className={styles.wrapper}>
        <div className={styles.container}>
            <Heading className={styles.name} title={streamer.name} />
            <div className={styles.info}>
                <img className={styles.image} src={IMAGE_URL} alt={streamer.name} />
                <div className={styles.details}>
                    <p className={styles.description}>{streamer.description}</p>
                    <p className={styles.platform}>Platform: <strong>{streamer.platform}</strong></p>
                </div>
            </div>
        </div>
        <GoBackButton />
    </div>
}

export default StreamerRecord
