import React, { useState } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import styles from './VoteBar.module.scss'
import { SERVER_HOST } from '../../constants';
import { Streamer, Vote } from '../../contract';

type Props = {
    initialUpvotes: number;
    initialDownvotes: number;
    streamerId: Streamer['id']
}

const VoteBar = ({ initialUpvotes, initialDownvotes, streamerId }: Props) => {
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [downvotes, setDownvotes] = useState(initialDownvotes);

    const handleVote = (vote: Vote) => {
        axios.put(`${SERVER_HOST}/api/streamers/${streamerId}/vote`, {
            body: { vote }
        })
        const stateFunction = vote === 'upvote' ? setUpvotes : setDownvotes
        stateFunction((prev) => prev + 1)
    }

    return <div className={styles.voteBar}>
        <button className={styles.button} onClick={() => handleVote('upvote')}>
            <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <span className={styles.label}>{upvotes} Upvotes</span>
        <button className={styles.button} onClick={() => handleVote('downvote')}>
            <FontAwesomeIcon icon={faArrowDown} />
        </button>
        <span className={styles.label}>{downvotes} Downvotes</span>
    </div>
};

export default VoteBar;