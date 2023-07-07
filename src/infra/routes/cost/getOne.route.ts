import { Router } from "express";
import { getOneCostController } from '@controllers/cost/getOne.controller'
import { middlewareFactory } from "@/middlewares";
import { ROLES } from "@/Enums";

export const getOneCostRouter = Router()

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.PURCHASING]
})

getOneCostRouter.get("/", authMiddleware, getOneCostController);