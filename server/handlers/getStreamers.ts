import { Request, Response } from "express";
import { listStreamers } from "../repository";
import { toPublicListStreamer } from "../helpers";
import { PublicListStreamer } from "../../shared/contract";

export default async (req: Request, res: Response) => {
  const streamers = await listStreamers();
  res.json(streamers.map(toPublicListStreamer).sort(sortFunction));
};

const sortFunction = (a: PublicListStreamer, b: PublicListStreamer) =>
  b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
