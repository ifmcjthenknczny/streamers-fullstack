import React, { useState, useEffect } from 'react'
import styles from './StreamersList.module.scss'
import VoteBar from '../VoteBar/VoteBar'
import { Link } from 'react-router-dom'
import { query } from '../../helpers'
import useQueryStatus from '../../hooks/useQueryStatus'
import Spinner from '../Spinner/Spinner'
import { BASE_PATHS } from '../../constants'
import Heading from '../Heading/Heading'
import useListRefresh from '../../hooks/useListRefresh'
import { type PublicListStreamer } from '../../contract'
import Pagination from '../Pagination/Pagination'

const StreamersList = () => {
    const [streamersData, setStreamersData] = useState<Queries['GET']['/streamers']['response']>()
    const [isBusy, busyWrapper] = useQueryStatus(true)
    const { needsRefresh, clearListRefresh } = useListRefresh()
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchStreamers()
    }, [page])

    useEffect(() => {
        if (needsRefresh) {
            fetchStreamers()
        }
    }, [needsRefresh])

    const fetchStreamers = busyWrapper(async () => {
        const streamers = await query('/streamers', { queryParams: {page}})
        setStreamersData(streamers)
        clearListRefresh()
    })

    if (isBusy) {
        return <Spinner />
    }

    if (!streamersData?.count) {
        return <div>
            <Heading title='List of streamers:' />
            <h5 className={styles.noResults}>No streamers found</h5>
        </div>
    }

    return (
        <div>
            <Heading title='List of streamers:' />
            <ul className={styles.list}>
                {streamersData?.data.map(streamer => <Streamer key={streamer.id} streamer={streamer} />)}
            </ul>
            { streamersData.count > streamersData.perPage && <Pagination currentPage={page} totalPages={Math.ceil(streamersData.count / streamersData.perPage)} onPageChange={setPage} /> }
        </div>
    )
}

export default StreamersList

const Streamer = ({ streamer }: { streamer: PublicListStreamer }) => <li className={styles.streamer}>
    <Link to={BASE_PATHS.streamer(streamer.id)} className={styles.link}>
        <div className={styles.name}>{streamer.name}</div>
    </Link>
    <VoteBar initialUpvotes={streamer.upvotes} initialDownvotes={streamer.downvotes} streamerId={streamer.id} />
</li>
