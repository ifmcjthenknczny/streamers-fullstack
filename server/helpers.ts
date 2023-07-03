import {
    PublicStreamer,
    PublicListStreamer,
    Streamer,
    Vote,
    VoteNumber,
} from '../shared/contract'
import { ObjectId } from 'mongodb'
import { Schema } from 'joi'
import { Request, Response, NextFunction, RequestHandler } from 'express'

export const mapVoteArrayNames = (type: Vote) => {
    const targetArray = type === 'upvote' ? 'upvotedBy' : 'downvotedBy'
    const otherArray = type === 'upvote' ? 'downvotedBy' : 'upvotedBy'
    return [targetArray, otherArray] as [keyof Streamer, keyof Streamer]
}

export const mapVoteArrayToVoteAmount = ({
    upvotedBy,
    downvotedBy,
}: Streamer): VoteNumber => ({
    upvotes: upvotedBy ? upvotedBy.length : 0,
    downvotes: downvotedBy ? downvotedBy.length : 0,
})

export const toPublicStreamer = (streamer: Streamer): PublicStreamer =>
    omit(streamer, ['upvotedBy', 'downvotedBy'])

export const toPublicListStreamer = (
    streamer: Streamer
): PublicListStreamer => ({
    ...pick(streamer, ['id', 'name']),
    ...mapVoteArrayToVoteAmount(streamer),
})

export const fromMongoId = <T extends { _id: ObjectId }>(
    obj: T
): Omit<T, '_id'> & { id: string } => {
    const { _id, ...rest } = obj
    return { ...rest, id: _id.toHexString() }
}

export const toMongoId = <T extends { id: string }>(
    obj: T
): Omit<T, 'id'> & { _id: ObjectId } => {
    const { id, ...rest } = obj
    return { ...rest, _id: new ObjectId(id) }
}

export const validateSchema = <T>(data: T, schema: Schema<T>): T => {
    const { error, value } = schema.validate(data)
    if (error) {
        throw new Error(`Validation error: ${error.message}`)
    }
    return value
}

export const asyncHandler = (handler: RequestHandler): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await handler(req, res, next)
        } catch (e) {
            const { message, statusCode = 400 } = e as {message: string; statusCode: number}
            res.status(statusCode).json({error: message})
        }
    }
}


export const omit = <T extends { [key: string]: any }, K extends keyof T>( // eslint-disable-line @typescript-eslint/no-explicit-any
    obj: T,
    keysToOmit: K[]
): Omit<T, K> => {
    return Object.keys(obj).reduce((newObj, key) => {
        if (keysToOmit.includes(key as K)) {
            return newObj
        }
        return { ...newObj, [key]: obj[key] }
    }, {} as Omit<T, K>)
}

export const pick = <T extends { [key: string]: any }, K extends keyof T>( // eslint-disable-line @typescript-eslint/no-explicit-any
    obj: T,
    keysToPick: K[]
): Pick<T, K> => {
    return keysToPick.reduce((newObj, key) => {
        if (key in obj) {
            return { ...newObj, [key]: obj[key] }
        }
        return newObj
    }, {} as Pick<T, K>)
}