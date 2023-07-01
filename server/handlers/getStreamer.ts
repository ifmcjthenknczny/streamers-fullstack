import { validateSchema } from "./../helpers";
import { Request, Response } from "express";
import { findStreamer } from "../repository";
import { toPublicStreamer } from "../helpers";
import { idParamsSchema } from "../schemas";

export default async (req: Request, res: Response) => {
  const { streamerId } = validateSchema(req.params, idParamsSchema);
  const streamer = await findStreamer(streamerId);
  res.json(toPublicStreamer(streamer));
};
