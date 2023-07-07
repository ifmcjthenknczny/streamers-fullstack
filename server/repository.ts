import {
    fromMongoId,
    mapVoteArrayNames,
    mapVoteArrayToVoteAmount,
    toMongoId,
} from './helpers'
import express from 'express'
import bodyParser from 'body-parser'
import { ObjectId } from 'mongodb'
import {
    AddStreamerRequest,
    Streamer,
    VoteRequest,
    VOTE_TYPES,
} from '../shared/contract'
import mongoose, { Connection, Collection } from 'mongoose'
import 'dotenv/config'
import { NotFoundError } from './failures'

const app = express()
app.use(bodyParser.json())
const MONGO_URL = process.env.MONGO_URL! // eslint-disable-line @typescript-eslint/no-non-null-assertion
const STREAMERS_COLLECTION_NAME = 'streamers'

let db: Connection
let streamersCollection: Collection<Streamer>

mongoose
    .connect(MONGO_URL)
    .then(() => {
        db = mongoose.connection
        streamersCollection = db.collection(STREAMERS_COLLECTION_NAME)
        console.log('MongoDB database connected!')
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err)
    })

export const addStreamerVote = async ({
    sessionId,
    streamerId,
    type,
}: VoteRequest) => {
    const [targetArray] = mapVoteArrayNames(type)
    return await streamersCollection.updateOne(toMongoId({ id: streamerId }), {
        $push: { [targetArray]: sessionId },
    })
}

export const eraseStreamerVote = async ({
    sessionId,
    streamerId,
    type,
}: VoteRequest) => {
    const [targetArray] = mapVoteArrayNames(type)
    return await streamersCollection.updateOne(toMongoId({ id: streamerId }), {
        $pull: { [targetArray]: sessionId },
    })
}

export const registerStreamerVote = async (payload: VoteRequest) => {
    const { sessionId, streamerId, type } = payload
    const [targetArray, otherArray] = mapVoteArrayNames(type)
    const streamer = await findStreamer(streamerId)
    if ((streamer[targetArray] as string[]).includes(sessionId)) {
        await eraseStreamerVote({ sessionId, streamerId, type })
    }
    if (!(streamer[targetArray] as string[]).includes(sessionId)) {
        await addStreamerVote({ sessionId, streamerId, type })
    }
    if ((streamer[otherArray] as string[]).includes(sessionId)) {
        await eraseStreamerVote({
            sessionId,
            streamerId,
            type: VOTE_TYPES.filter((t) => t !== type).at(0)!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
        })
    }
    return {
        ...mapVoteArrayToVoteAmount(await findStreamer(streamerId)),
    }
}

export const listStreamers = async () =>
    (await streamersCollection.find().toArray()).map(fromMongoId)

export const findStreamer = async (id: Streamer['id']): Promise<Streamer> => {
    const streamer = await streamersCollection.findOne(toMongoId({ id }))
    if (!streamer) {
        throw NotFoundError(id)
    }
    return fromMongoId(streamer)
}

export const insertStreamer = async (
    data: AddStreamerRequest
): Promise<Streamer> => {
    const { insertedId } = await streamersCollection.insertOne({
        id: new ObjectId().toHexString(),
        ...data,
        upvotedBy: [],
        downvotedBy: [],
    })
    return {
        id: insertedId.toHexString(),
        ...data,
        upvotedBy: [],
        downvotedBy: [],
    }
}
