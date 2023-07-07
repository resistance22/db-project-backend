import { Router } from "express";
import { usersRouter } from "@infra/routes/users/index"
import { authRouter } from "@infra/routes/auth/index"

export const globalRouter = Router()

globalRouter.use('/', authRouter)
globalRouter.use('/', usersRouter)
