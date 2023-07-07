import { NextFunction, Request, Response } from "express"
import { HTTPError } from '../assets/HTTPError'
import { ROLES } from "Enums"
import jwt from 'jsonwebtoken'

export const authMiddleware = (roles: ROLES[]) => async (req: Request, _: Response, next: NextFunction) => {
  const authToken = req.cookies.Auth
  if (!req.cookies.Auth) {
    return next(new HTTPError(401, "Not Authorized", []))
  }

  try {
    const decoded: any = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET as string)
    if (!roles.includes(decoded.role)) {
      return next(new HTTPError(403, "Not Authorized to do this!", ["You can't add users"]))
    }
    return next()
  } catch (err) {
    console.log(err)
    return next(new HTTPError(401, 'Invalid Token Provided', []))
  }


}