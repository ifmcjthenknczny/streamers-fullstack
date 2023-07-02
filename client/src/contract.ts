declare global {
  interface Queries {
    GET: {
      '/streamers': {
        response: PublicListStreamer[]
      }
      '/streamer/:streamerId': {
        params: {
          streamerId: number
        }
        response: PublicStreamer
      }
    }
    POST: {
      '/streamers': {
        body: AddStreamerRequest
        response: PublicStreamer
      }
    }
    PUT: {
      '/streamers/:streamerId/vote': {
        params: {
          streamerId: number
        }
        body: VoteRequest
        response: VoteNumber
      }
    }
  }
}

export type Streamer = AddStreamerRequest & {
  id: string
  upvotedBy: Array<VoteRequest['sessionId']>
  downvotedBy: Array<VoteRequest['sessionId']>
}

export interface AddStreamerRequest {
  name: string
  platform: Platform
  description: string
}

export interface VoteRequest {
  streamerId: Streamer['id']
  type: Vote
  sessionId: string
}

export type Platform = (typeof PLATFORMS)[number]

export const PLATFORMS = [
    'Twitch',
    'YouTube',
    'TikTok',
    'Kick',
    'Rumble'
] as const

export const VOTE_TYPES = ['upvote', 'downvote'] as const

export type Vote = (typeof VOTE_TYPES)[number]

export interface VoteNumber {
  upvotes: number
  downvotes: number
}

export type PublicStreamer = Omit<Streamer, 'downvotedBy' | 'upvotedBy'>

export type PublicListStreamer = Pick<Streamer, 'id' | 'name'> & VoteNumber

export const SERVER_PREFIX = '/api'

export const SERVER_HOST = 'http://localhost:5000'
// export const CLIENT_HOST = "http://localhost:3000";
