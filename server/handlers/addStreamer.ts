import { validateSchema } from './../helpers';
import { Request, Response } from 'express'
import { insertStreamer } from '../repository';
import { toPublicStreamer } from '../helpers';
import { addStreamerRequestSchema } from '../schemas';

export default async (req: Request, res: Response) => {
    const streamer = validateSchema(req.body, addStreamerRequestSchema)
    try {
      const result = await insertStreamer(streamer)
      res.status(201).json(toPublicStreamer(result));
    } catch (err) {
      console.error("Failed to insert streamer:", err);
      res.status(500).json({ error: "Failed to insert streamer" });
    }
  }