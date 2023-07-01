import { Router } from "express";
import addStreamer from "./handlers/addStreamer";
import getStreamer from "./handlers/getStreamer";
import listStreamers from "./handlers/getStreamers";
import voteStreamer from "./handlers/voteStreamer";

export const streamerRouter = Router();
streamerRouter.get("/:streamerId", getStreamer);

export const streamersRouter = Router();
streamersRouter.get("", listStreamers);
streamersRouter.post("", addStreamer);
streamersRouter.put("/:streamerId/vote", voteStreamer);
