import { NextFunction, Request, Response } from "express"
import { HTTPError } from '../assets/HTTPError'
import { ROLES } from "Enums"
import jwt from 'jsonwebtoken'

export const authMiddleware = (roles: ROLES[]) => async (req: Request, _: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return next(new HTTPError(401, "Not Authorized", []))
  }

  if (req.headers.authorization.split(' ')[0] !== 'Bearer') {
    return next(new HTTPError(401, "Invalid Auth Header", []))
  }
  const token = req.headers.authorization.split(' ')[1]
  try {
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
    if (!roles.includes(decoded.role)) {
      return next(new HTTPError(403, "Not Authorized to do this!", ["You can't add users"]))
    }
    return next()
  } catch (err) {
    console.log(err)
    return next(new HTTPError(401, 'Invalid Token Provided', []))
  }


}