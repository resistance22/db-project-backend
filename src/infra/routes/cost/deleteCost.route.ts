import { Router } from "express";
import { deleteCostController } from '@controllers/cost/delete.controller'
import { middlewareFactory } from "@/middlewares";
import { ROLES } from "@/Enums";

export const deleteCostRouter = Router()

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.PURCHASING]
})

deleteCostRouter.delete("/:costID", authMiddleware, deleteCostController);