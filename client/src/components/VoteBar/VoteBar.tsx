import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import styles from './VoteBar.module.scss'
import { Streamer, Vote } from '../../contract';
import useSessionId from '../../hooks/useSessionId';
import classNames from 'classnames';
import { query } from '../../helpers';

type Props = {
    initialUpvotes: number;
    initialDownvotes: number;
    streamerId: Streamer['id']
}

const VoteBar = ({ initialUpvotes, initialDownvotes, streamerId }: Props) => {
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [downvotes, setDownvotes] = useState(initialDownvotes);
    const sessionId = useSessionId()

    const handleVote = async (vote: Vote) => {
        const { upvotes, downvotes } = await query('/streamers/:streamerId/vote', { method: 'PUT', params: {streamerId}, body: { sessionId, type: vote } })
        setUpvotes(upvotes)
        setDownvotes(downvotes)
    }

    return <div className={styles.voteBar}>
        <button className={classNames(styles.button, styles.upvote)} onClick={() => handleVote('upvote')}>
            <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <span className={styles.label}>{upvotes} upvotes</span>
        <button className={classNames(styles.button, styles.downvote)} onClick={() => handleVote('downvote')}>
            <FontAwesomeIcon icon={faArrowDown} />
        </button>
        <span className={styles.label}>{downvotes} downvotes</span>
    </div>
};

export default VoteBar;