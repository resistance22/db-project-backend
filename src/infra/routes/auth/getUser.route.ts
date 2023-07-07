import { Router } from "express";
import { getUserController } from '@controllers/user/getUser.controller'

export const getUserRouter = Router()

getUserRouter.get("/get-user", getUserController);