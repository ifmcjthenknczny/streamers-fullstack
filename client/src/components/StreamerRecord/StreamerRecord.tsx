import React, { useEffect, useState } from 'react'
import styles from './StreamerRecord.module.scss'
import { useParams } from 'react-router-dom'
import { query } from '../../helpers'
import useQueryStatus from '../../hooks/useQueryStatus'
import Spinner from '../Spinner/Spinner'
import MenuButton from '../MenuButton/MenuButton'
import Heading from '../Heading/Heading'
import { type PublicStreamer } from '../../contract'

const IMAGE_URL =
    'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png'

const StreamerRecord = () => {
    const { streamerId } = useParams()
    const [streamer, setStreamer] = useState<PublicStreamer>()
    const [isBusy, busyWrapper] = useQueryStatus(true)

    const fetchStreamer = busyWrapper(async (streamerId: string) => {
        const streamer = await query('/streamer/:streamerId', { params: { streamerId } })
        setStreamer(streamer)
    })

    useEffect(() => {
        if (streamerId) {
            fetchStreamer(streamerId) // eslint-disable-line @typescript-eslint/no-floating-promises
        }
    }, [streamerId])

    if (isBusy) {
        return <Spinner />
    }

    if (!streamer) {
        return null
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
        <MenuButton />
    </div>
}

export default StreamerRecord
