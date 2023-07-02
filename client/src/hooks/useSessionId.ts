import { useRef } from 'react'

const useSessionId = (): string => {
    const sessionIdRef = useRef<string | null>(null)

    if (!sessionIdRef.current) {
        const storedSessionId = localStorage.getItem('sessionId')
        if (storedSessionId) {
            sessionIdRef.current = storedSessionId
        } else {
            sessionIdRef.current = `session_${Date.now()}`
            localStorage.setItem('sessionId', sessionIdRef.current)
        }
    }
    return sessionIdRef.current
}

export default useSessionId
