import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@assets/HTTPError"
import jwt from 'jsonwebtoken'

export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.cookies.Auth
  if (!req.cookies.Auth) {
    return next(new HTTPError(401, "Not Authorized", []))
  }

  try {
    const decoded: any = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET as string)
    return res.json(decoded)
  } catch (err) {
    res.clearCookie("Auth")
    return next(new HTTPError(401, 'Invalid Token Provided', []))
  }
}