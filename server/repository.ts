import {
  fromMongoId,
  mapVoteArrayNames,
  mapVoteArrayToVoteAmount,
  toMongoId,
} from "./helpers";
import express from "express";
import bodyParser from "body-parser";
import { ObjectId } from "mongodb";
import { AddStreamerRequest, Streamer, User, VoteRequest } from "./contract";
import mongoose, { Connection, Collection } from "mongoose";

const app = express();
app.use(bodyParser.json());
const MONGO_URL = process.env.MONGO_URL!
const STREAMERS_COLLECTION_NAME = "streamers";
const USERS_COLLECTION_NAME = "users"

let db: Connection;
let streamersCollection: Collection<Streamer>;
let usersCollection: Collection<User>;

// type DbStreamer = Omit<Streamer, "id"> & { _id: ObjectId };

mongoose
  .connect(MONGO_URL, {})
  .then(() => {
    db = mongoose.connection;
    streamersCollection = db.collection(STREAMERS_COLLECTION_NAME);
    usersCollection = db.collection(USERS_COLLECTION_NAME);
    console.log("MongoDB database connected!");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

export const addStreamerVote = async ({
  sessionId,
  streamerId,
  type,
}: VoteRequest) => {
  const [targetArray] = mapVoteArrayNames(type);
  return await streamersCollection.updateOne(
    { _id: new ObjectId(streamerId) },
    { $push: { [targetArray]: sessionId } }
  );
};

export const eraseStreamerVote = async ({
  sessionId,
  streamerId,
  type,
}: VoteRequest) => {
  const [targetArray] = mapVoteArrayNames(type);
  return await streamersCollection.updateOne(
    { _id: new ObjectId(streamerId) },
    { $pull: { [targetArray]: sessionId } }
  );
};

export const registerStreamerVote = async (data: VoteRequest) => {
  const { sessionId, streamerId, type } = data;
  const [targetArray, otherArray] = mapVoteArrayNames(type);
  const streamer = await findStreamer(streamerId);
  if ((streamer[targetArray] as string[]).includes(sessionId)) {
    await eraseStreamerVote({ sessionId, streamerId, type });
  } else {
    await addStreamerVote({ sessionId, streamerId, type });
  }
  if ((streamer[otherArray] as string[]).includes(sessionId)) {
    await eraseStreamerVote({ sessionId, streamerId, type });
  }
  const after = await findStreamer(streamerId);
  return {
    before: mapVoteArrayToVoteAmount(streamer),
    after: mapVoteArrayToVoteAmount(after),
  };
};

export const listStreamers = async () => (await streamersCollection.find().toArray()).map(fromMongoId);

export const findStreamer = async (id: Streamer["id"]): Promise<Streamer> => {
  const streamer = await streamersCollection.findOne(toMongoId({ id }));
  if (!streamer) {
    throw new Error("Streamer not found");
  }
  return fromMongoId(streamer);
};

export const insertStreamer = async (data: AddStreamerRequest): Promise<Streamer> => {
  const { insertedId } = await streamersCollection.insertOne({
    id: new ObjectId().toHexString(),
    ...data,
    upvotedBy: [],
    downvotedBy: [],
  });
  return {
    id: insertedId.toHexString(),
    ...data,
    upvotedBy: [],
    downvotedBy: [],
  }
}

// export const loginUser = async (username: string, password: string) => {
//   const user = await usersCollection.findOne({ username, password });
//   if (!user) {
//     throw new Error("User not found");
//   }
//   return fromMongoId(user).id;
// }