import { Router } from "express";
import { middlewareFactory } from "@/middlewares";
import { ROLES } from "@/Enums";
import { getOneAmountController } from "@/controllers/costAmount/getByID.controller";

export const getOneAmountRouter = Router()

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.PURCHASING]
})

getOneAmountRouter.get("/:costID", authMiddleware, getOneAmountController);