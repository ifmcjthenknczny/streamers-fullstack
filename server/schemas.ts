import Joi from "joi";
import { PLATFORMS, VOTE_TYPES } from "../shared/contract";

export const idSchema = Joi.string();

export const addStreamerRequestSchema = Joi.object({
  name: Joi.string().max(80).required(),
  platform: Joi.string()
    .valid(...PLATFORMS)
    .required(),
  description: Joi.string().max(2000),
});

export const voteRequestSchema = Joi.object({
  streamerId: idSchema.required(),
  type: Joi.string()
    .valid(...VOTE_TYPES)
    .required(),
  sessionId: idSchema.required(),
});

export const idParamsSchema = Joi.object({
  streamerId: idSchema.required(),
});
