import { Streamer } from "./contract"

export const SERVER_HOST = 'http://localhost:5000'

export const IMAGE_URL = 'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png'

export const BASE_PATHS = {
    main: '/',
    streamer: (streamerId?: Streamer['id']) => streamerId ? `/streamer/${streamerId}` : '/streamer/:streamerId',
    error: '/error',
}