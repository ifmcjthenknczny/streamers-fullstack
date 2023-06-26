import { validateSchema } from './../helpers';
import { Request, Response } from 'express'
import { findStreamer } from '../repository';
import { toPublicStreamer } from '../helpers';
import { idParamsSchema } from '../schemas';

export default async (req: Request, res: Response) => {
    const { streamerId } = validateSchema(req.params, idParamsSchema);
    try {
      const streamer = await findStreamer(streamerId)
      if (!streamer) {
        res.status(404).json({ error: "Stream not found" });
      } else {
        res.json(toPublicStreamer(streamer));
      }
    } catch (err) {
      console.error("Failed to get streamer:", err);
      res.status(500).json({ error: "Failed to get streamer" });
    }
  }