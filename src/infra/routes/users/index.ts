import { Router } from "express";
import { getUserListRouter } from "@infra/routes/users/getUserList.route"

export const usersRouter = Router()

usersRouter.use('/users', getUserListRouter)
