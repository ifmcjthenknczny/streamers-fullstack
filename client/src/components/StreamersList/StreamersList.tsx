import React, {useState, useEffect} from 'react'
import styles from './StreamersList.module.scss'
import VoteBar from '../VoteBar/VoteBar'
import {Link} from 'react-router-dom'
import {query} from '../../helpers'
import useQueryStatus from '../../hooks/useQueryStatus'
import Spinner from '../Spinner/Spinner'
import {BASE_PATHS} from '../../constants'
import Heading from '../Heading/Heading'
import useListRefresh from '../../hooks/useListRefresh'
import {type PublicListStreamer} from '../../contract'

const StreamersList = () => {
    const [streamers, setStreamers] = useState<PublicListStreamer[]>([])
    const [isBusy, busyWrapper] = useQueryStatus(true)
    const { needsRefresh, clearListRefresh } = useListRefresh()

    useEffect(() => {
        fetchStreamers()
    }, [])

    useEffect(() => {
        if (needsRefresh) {
            fetchStreamers()
        }
    }, [needsRefresh])

    const fetchStreamers = busyWrapper(async () => {
        const streamers = await query('/streamers', {})
        setStreamers(streamers)
        clearListRefresh()
    })

    if (isBusy) {
        return <Spinner />
    }

    return (
        <div>
            <Heading title='List of streamers:' />
            {(streamers.length === 0) && <h5 className={styles.noResults}>No streamers found</h5>}
            {!(streamers.length === 0) && <ul className={styles.list}>
                {streamers.map(streamer => <Streamer key={streamer.id} streamer={streamer} />)}
            </ul>}
        </div>
    )
}

export default StreamersList

const Streamer = ({streamer}: {streamer: PublicListStreamer}) => <li className={styles.streamer}>
    <Link to={BASE_PATHS.streamer(streamer.id)} className={styles.link}>
        <div className={styles.name}>{streamer.name}</div>
    </Link>
    <VoteBar initialUpvotes={streamer.upvotes} initialDownvotes={streamer.downvotes} streamerId={streamer.id} />
</li>
