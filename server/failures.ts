import { Streamer } from '../shared/contract'

class Failure extends Error {
    statusCode: number
    message: string
    name: string
    code: string
  
    constructor(statusCode: number, message: string, name: string, code: string) {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.name = name
        this.code = code
    }
}

export const NotFoundError = (id: Streamer['id']) => new Failure(404, `Streamer with id '${id}' not found.`, 'NotFoundError', 'NOT-FOUND')

export const ValidationError = (message: string) => new Failure(400, `Validation error: ${message}`, 'ValidationError', 'VALIDATION-ERROR')
