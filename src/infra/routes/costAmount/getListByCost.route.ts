import { Router } from "express";
import { getListByCostController } from '@controllers/costAmount/getListByCost.contoller'
import { middlewareFactory } from "@/middlewares";
import { ROLES } from "@/Enums";

export const getAmountByCostRouter = Router()

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.PURCHASING]
})

getAmountByCostRouter.get("/:costID", authMiddleware, getListByCostController);