import { Request, Response, Errback, NextFunction } from 'express'

interface CustomError extends Errback {
  messages: string[]
  status: number
  message: string
}

export const ErrorHandlerMiddleWare = (err: CustomError, _: Request, res: Response, next: NextFunction) => {
  if (err.name === 'HTTPError') {
    if (err.status === 422) return res.status(err.status).json(err.messages)
    return res.status(err.status).json({
      errors: err.messages.map((message) => (message)),
      message: err.message
    })
  }
  return res.status(500).json('something went wrong!')
}
