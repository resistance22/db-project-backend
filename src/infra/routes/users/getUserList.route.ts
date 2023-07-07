import { Router } from "express";
import { getUsersListController } from '@controllers/user/getUsersList.controller'
import { middlewareFactory } from "@/middlewares";
import { ROLES } from "@/Enums";

export const getUserListRouter = Router()

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN]
})

getUserListRouter.get("/", authMiddleware, getUsersListController);