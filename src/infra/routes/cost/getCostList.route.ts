import { Router } from "express";
import { getCostListController } from '@controllers/cost/getCostList.controller'
import { middlewareFactory } from "@/middlewares";
import { ROLES } from "@/Enums";

export const getCostsListRouter = Router()

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.PURCHASING]
})

getCostsListRouter.get("/", authMiddleware, getCostListController);