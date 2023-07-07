import React, {useState} from 'react'
import styles from './StreamerSubmissionForm.module.scss'
import {type AddStreamerRequest, PLATFORMS, type Platform} from '../../contract'
import classNames from 'classnames'
import {query} from '../../helpers'
import useQueryStatus from '../../hooks/useQueryStatus'
import Spinner from '../Spinner/Spinner'
import Heading from '../Heading/Heading'
import useListRefresh from '../../hooks/useListRefresh'

const defaultFormData: AddStreamerRequest = {
    name: '',
    platform: 'Twitch',
    description: '',
}

const StreamerSubmissionForm = () => {
    const [formData, setFormData] = useState(defaultFormData)
    const [isBusy, busyWrapper] = useQueryStatus(false)
    const { setListRefresh } = useListRefresh()

    const handleSubmit = busyWrapper(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await query('/streamers', {method: 'POST', body: formData})
        setListRefresh()
    })

    if (isBusy) {
        return <Spinner />
    }

    return (
        <div className={styles.formWrapper}>
            <Heading title='Add a new streamer:' />
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    <div>Name:</div>
                    <input className={styles.input} type='text' value={formData.name} placeholder="Enter streamer's name..." onChange={e => {
                        setFormData({...formData, name: e.target.value})
                    }} />
                </label>
                <label className={classNames(styles.label, styles.platformLabel)}>
                    <div>Platform:</div>
                    <select className={styles.select} value={formData.platform} onChange={e => {
                        setFormData({...formData, platform: e.target.value as Platform})
                    }}>
                        {PLATFORMS.map(platform => (
                            <option key={platform} value={platform}>
                                {platform}
                            </option>
                        ))}
                    </select>
                </label>
                <label className={styles.label}>
                    <div>Description:</div>
                    <textarea className={styles.textarea} value={formData.description} onChange={e => {
                        setFormData({...formData, description: e.target.value})
                    }} placeholder="Write streamer's description here..." />
                </label>
                <button className={styles.submit} type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default StreamerSubmissionForm
