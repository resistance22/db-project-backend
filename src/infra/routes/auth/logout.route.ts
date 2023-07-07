import { Router } from "express";
import { logOutController } from '@controllers/user/logout.controller'

export const logOutRoute = Router()

logOutRoute.get("/logout", logOutController);