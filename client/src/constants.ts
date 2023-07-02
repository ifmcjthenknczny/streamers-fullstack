import { type Streamer } from './contract'

export const BASE_PATHS = {
    main: '/',
    streamer: (streamerId?: Streamer['id']) =>
        streamerId ? `/streamer/${streamerId}` : '/streamer/:streamerId',
    error: '/error'
}

export const SITE_NAME = 'STREAMSHACK'
