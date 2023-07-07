import { Router } from "express";
import { getUserController } from '@controllers/user/getUser.controller'

export const logOutRoute = Router()

logOutRoute.get("/logout", getUserController);