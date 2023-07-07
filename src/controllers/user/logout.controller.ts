import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@assets/HTTPError"
import jwt from 'jsonwebtoken'

export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("Auth")
  return res.send()
}