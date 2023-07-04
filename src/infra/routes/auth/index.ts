import { Router } from "express";
import { registerRouter } from "@infra/routes/auth/register.route"
import { signInRouter } from "@infra/routes/auth/signIn.route"

export const authRouter = Router()

authRouter.use('/auth', registerRouter)
authRouter.use('/auth', signInRouter)