import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import styles from './VoteBar.module.scss'
import useSessionId from '../../hooks/useSessionId'
import classNames from 'classnames'
import { query } from '../../helpers'
import useQueryStatus from '../../hooks/useQueryStatus'
import { type Streamer, type Vote } from '../../contract'

type Props = {
    initialUpvotes: number;
    initialDownvotes: number;
    streamerId: Streamer['id'];
};

const VoteBar = ({ initialUpvotes, initialDownvotes, streamerId }: Props) => {
    const [upvotes, setUpvotes] = useState(initialUpvotes)
    const [downvotes, setDownvotes] = useState(initialDownvotes)
    const [isBusy, busyWrapper] = useQueryStatus(false)
    const sessionId = useSessionId()

    const handleVote = busyWrapper(async (vote: Vote) => {
        const { upvotes, downvotes } = await query('/streamers/:streamerId/vote', { method: 'PUT', params: { streamerId }, body: { sessionId, type: vote } })
        setUpvotes(upvotes)
        setDownvotes(downvotes)
    })

    const handleUpvote = async () => {
        await handleVote('upvote')
    }

    const handleDownvote = async () => {
        await handleVote('downvote')
    }

    return <div className={styles.voteBar}>
        <div>
            <button className={classNames(styles.button, styles.upvote)} onClick={handleUpvote} disabled={isBusy}>
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <span className={styles.label}>{upvotes} <span className={styles.onlyDesktop}>upvotes</span></span>
        </div>
        <div>
            <button className={classNames(styles.button, styles.downvote)} onClick={handleDownvote} disabled={isBusy}>
                <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <span className={styles.label}>{downvotes} <span className={styles.onlyDesktop}>downvotes</span></span>
        </div>
    </div>
}

export default VoteBar
