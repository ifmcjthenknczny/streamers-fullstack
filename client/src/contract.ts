declare global {
  interface Queries {
    '/api/streamers': {
      method: 'GET'
      response: PublicStreamer[]
    } | {
      method: 'POST'
      body: AddStreamerRequest
      response: PublicStreamer
    }
    '/api/streamers/:streamerId/vote': {
      method: 'PUT'
      params: [number]
      body: VoteRequest
      response: VoteNumber
    }
    '/api/streamer/:streamerId': {
      method: 'GET'
      params: [number]
      response: PublicStreamer
    }
  }
}

export type Streamer = AddStreamerRequest & {
  id: string;
  upvotedBy: User["id"][];
  downvotedBy: User["id"][];
};

export type AddStreamerRequest = {
  name: string;
  platform: Platform;
  description: string;
};

export type VoteRequest = {
  streamerId: Streamer["id"];
  type: Vote;
  sessionId: User["id"];
};

export type Platform = (typeof PLATFORMS)[number];

export const PLATFORMS = ["Twitch", "YouTube", "TikTok", "Kick", "Rumble"] as const;

export const VOTE_TYPES = ["upvote", "downvote"] as const;

export type Vote = (typeof VOTE_TYPES)[number];

export type User = {
  id: string;
  username: string;
  password: string;
};

export type VoteNumber = {
  upvotes: number
  downvotes: number
}

export type PublicStreamer = Omit<Streamer, 'downvotedBy' | 'upvotedBy'> & VoteNumber