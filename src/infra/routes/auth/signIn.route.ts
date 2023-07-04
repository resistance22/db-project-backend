import { Request, Router } from "express";
import { SignInValidator } from "@validators/signIn.validator"
import { middlewareFactory } from '@middlewares/index'
import { userSignInController } from '@controllers/user/signIn.controller'

export const signInRouter = Router()

const bodyValidator = middlewareFactory({
  "type": "BodyValidator",
  "dto": SignInValidator
})

signInRouter.post("/sign-in", bodyValidator, userSignInController);