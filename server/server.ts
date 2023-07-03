import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'
import cors from 'cors'
import { streamerRouter, streamersRouter } from './index'
import { SERVER_PORT, SERVER_PREFIX } from '../shared/contract'

const corsOptions = {
    origin: '*',
    methods: 'GET,PUT,POST',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],
}

const app = express()
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(express.json())
app.use(cors(corsOptions))
app.use(`${SERVER_PREFIX}/streamer`, streamerRouter)
app.use(`${SERVER_PREFIX}/streamers`, streamersRouter)
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`)
})
