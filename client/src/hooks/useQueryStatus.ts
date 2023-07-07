/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_PATHS } from '../constants'

const useQueryStatus = (
    initialBusyState = false
): [boolean, <T extends (...args: any[]) => any>(f: T) => T] => { 
    const navigate = useNavigate()
    const [isBusy, setBusy] = useState(initialBusyState)

    const busyWrapper = <T extends (...args: any[]) => any>(
        f: T
    ): T =>
    (async (...args) => {
        setBusy(true)
        try {
            return await f(...args)
        } catch (e) {
            navigate(BASE_PATHS.error)
        } finally {
            setBusy(false)
        }
    }) as T

    return [isBusy, busyWrapper]
}

export default useQueryStatus
