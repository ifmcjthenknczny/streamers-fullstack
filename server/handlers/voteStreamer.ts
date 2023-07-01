import { Request, Response } from "express";
import { registerStreamerVote } from "../repository";
import { voteRequestSchema } from "../schemas";
import { validateSchema } from "../helpers";

export default async (req: Request, res: Response) => {
  const { sessionId, streamerId, type } = validateSchema(
    { ...req.params, ...req.body },
    voteRequestSchema
  );

  const result = await registerStreamerVote({
    sessionId,
    streamerId,
    type,
  });
  res.json(result);
};
