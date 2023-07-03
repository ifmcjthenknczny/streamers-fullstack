import { Request, Response } from 'express'
import { registerStreamerVote } from '../repository'
import { voteRequestSchema } from '../schemas'
import { validateSchema } from '../helpers'
import { VoteRequest } from '../../shared/contract'

export default async (req: Request, res: Response) => {
    const { sessionId, streamerId, type } = validateSchema<VoteRequest>(
        { ...req.params, ...req.body },
        voteRequestSchema
    )

    const result = await registerStreamerVote({
        sessionId,
        streamerId,
        type,
    })
    res.json(result)
}
