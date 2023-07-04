import { RequestHandler } from 'express'
import { reqBodyValidator } from './BodyValidator'
import { reqLogger } from './ReqLogger'
import { authMiddleware } from './Authorize'
import { ROLES } from 'Enums'

interface IBodyValidatorMiddlewareArg {
  type: "BodyValidator",
  dto: IValidator
}

interface IRequestLogger {
  type: "ReqLogger"
}

interface IAuthMiddlewareArg {
  type: "AuthMiddleware",
  roles: ROLES[]
}

type middlewareArgs = IBodyValidatorMiddlewareArg | IRequestLogger | IAuthMiddlewareArg

export const middlewareFactory: (arg: middlewareArgs) => RequestHandler = (arg) => {
  if (arg.type == 'BodyValidator') return reqBodyValidator(arg.dto)
  if (arg.type == 'ReqLogger') return reqLogger()
  if (arg.type == 'AuthMiddleware') return authMiddleware(arg.roles)
  throw new Error("Middleware type is incorrect!")
}