import { Request, Response } from 'express'
import { listStreamers } from '../repository'
import { toPublicListStreamer, validateSchema } from '../helpers'
import { getStreamersSchema } from '../schemas'

export default async (req: Request, res: Response) => {
    const { page } = validateSchema(req.query, getStreamersSchema)
    const {data, ...rest} = await listStreamers(page)
    res.json({ data: data.map(toPublicListStreamer), ...rest })
}

