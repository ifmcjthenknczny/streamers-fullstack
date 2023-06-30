declare global {
  interface Queries {
    GET: {
      "/streamers": {
        response: PublicListStreamer[];
      };
      "/streamer/:streamerId": {
        params: [number];
        response: PublicStreamer;
      };
    };
    POST: {
      "/streamers": {
        body: AddStreamerRequest;
        response: PublicStreamer;
      };
    };
    PUT: {
      "/streamers/:streamerId/vote": {
        params: [number];
        body: VoteRequest;
        response: VoteNumber;
      };
    };
  }
}

export type Streamer = AddStreamerRequest & {
  id: string;
  upvotedBy: VoteRequest["sessionId"][];
  downvotedBy: VoteRequest["sessionId"][];
};

export type AddStreamerRequest = {
  name: string;
  platform: Platform;
  description: string;
};

export type VoteRequest = {
  streamerId: Streamer["id"];
  type: Vote;
  sessionId: string;
};

export type Platform = (typeof PLATFORMS)[number];

export const PLATFORMS = [
  "Twitch",
  "YouTube",
  "TikTok",
  "Kick",
  "Rumble",
] as const;

export const VOTE_TYPES = ["upvote", "downvote"] as const;

export type Vote = (typeof VOTE_TYPES)[number];

export type VoteNumber = {
  upvotes: number;
  downvotes: number;
};

export type PublicStreamer = Omit<Streamer, "downvotedBy" | "upvotedBy">;

export type PublicListStreamer = Pick<Streamer, "id" | "name"> & VoteNumber;

export const SERVER_PREFIX = "/api";
