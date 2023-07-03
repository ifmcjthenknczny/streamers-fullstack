import { validateSchema } from './../helpers'
import { Request, Response } from 'express'
import { insertStreamer } from '../repository'
import { toPublicStreamer } from '../helpers'
import { addStreamerRequestSchema } from '../schemas'
import { AddStreamerRequest } from '../../shared/contract'

export default async (req: Request, res: Response) => {
    const streamer = validateSchema<AddStreamerRequest>(req.body, addStreamerRequestSchema)
    const result = await insertStreamer(streamer)
    res.status(201).json(toPublicStreamer(result))
}
