import Joi from 'joi'
import { PLATFORMS, VOTE_TYPES } from '../shared/contract'

export const idSchema = Joi.string().pattern(/^[0-9a-fA-F]{24}$/)

export const sessionIdSchema = Joi.string()

export const addStreamerRequestSchema = Joi.object({
    name: Joi.string().max(80).required(),
    platform: Joi.string()
        .valid(...PLATFORMS)
        .required(),
    description: Joi.string().max(2000),
})

export const voteRequestSchema = Joi.object({
    streamerId: idSchema.required(),
    type: Joi.string()
        .valid(...VOTE_TYPES)
        .required(),
    sessionId: sessionIdSchema.required()
})

export const idParamsSchema = Joi.object({
    streamerId: idSchema.required(),
})

export const getStreamersSchema = Joi.object({
    page: Joi.number().integer().default(1)
})