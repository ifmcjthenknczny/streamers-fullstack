import { Router } from 'express'
import addStreamer from './handlers/addStreamer'
import getStreamer from './handlers/getStreamer'
import listStreamers from './handlers/getStreamers'
import voteStreamer from './handlers/voteStreamer'
import { asyncHandler } from './helpers'

export const streamerRouter = Router()
streamerRouter.get('/:streamerId', asyncHandler(getStreamer))

export const streamersRouter = Router()
streamersRouter.get('', asyncHandler(listStreamers))
streamersRouter.post('', asyncHandler(addStreamer))
streamersRouter.put('/:streamerId/vote', asyncHandler(voteStreamer))
