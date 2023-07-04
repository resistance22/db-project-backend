import { Request, Router } from "express";
import { NewUserValidator } from "@validators/User.validator"
import { middlewareFactory } from '@middlewares/index'
import { userRegisterController } from '@controllers/user/register.controller'
import { ROLES } from "@/Enums"

export const registerRouter = Router()

const bodyValidator = middlewareFactory({
  "type": "BodyValidator",
  "dto": NewUserValidator
})

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN]
})

registerRouter.post("/register", authMiddleware, bodyValidator, userRegisterController);