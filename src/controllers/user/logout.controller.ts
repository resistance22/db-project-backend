import { Request, Response, NextFunction } from "express"

export const logOutController = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("Auth")
  return res.send({
    success: true
  })
}