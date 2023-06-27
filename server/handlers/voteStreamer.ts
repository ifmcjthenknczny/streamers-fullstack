import { Request, Response } from "express";
import { registerStreamerVote } from "../repository";
import { voteRequestSchema } from "../schemas";
import { validateSchema } from "../helpers";

export default async (req: Request, res: Response) => {
  const { sessionId, streamerId, type } = validateSchema({...req.params, ...req.body}, voteRequestSchema);

  try {
    const result = await registerStreamerVote({
      sessionId,
      streamerId,
      type,
    });

    if (!result) {
      res.status(404).json({ error: "Streamer not found" });
    } else {
      res.json(result.after);
    }
  } catch (err) {
    console.error("Failed to update streamer:", err);
    res.status(500).json({ error: "Failed to update streamer" });
  }
};
