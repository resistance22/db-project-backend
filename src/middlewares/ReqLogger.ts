import expressWinston from 'express-winston'
import winston from 'winston'

export const reqLogger = () => expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize({
      all: true
    }),
    winston.format.timestamp(),
    winston.format.simple(),
  ),
  meta: false,
})