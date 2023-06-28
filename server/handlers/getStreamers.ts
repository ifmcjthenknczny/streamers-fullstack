import {Request, Response} from 'express'
import { listStreamers } from '../repository';
import { toPublicListStreamer } from '../helpers';
import { PublicListStreamer } from '../contract';

export default async (req: Request, res: Response) => {
    try {
      const streamers = await listStreamers();
      res.json(streamers.map(toPublicListStreamer).sort(sortFunction))
    } catch (err) {
      console.error("Failed to get streamers:", err);
      res.status(500).json({ error: "Failed to get streamers" });
    }
  }

const sortFunction = (a: PublicListStreamer, b: PublicListStreamer) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)