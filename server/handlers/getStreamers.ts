import {Request, Response} from 'express'
import { listStreamers } from '../repository';
import { toPublicStreamer } from '../helpers';

export default async (req: Request, res: Response) => {
    try {
      const streamers = await listStreamers();
      res.json(streamers.map(toPublicStreamer));
    } catch (err) {
      console.error("Failed to get streamers:", err);
      res.status(500).json({ error: "Failed to get streamers" });
    }
  }