import { Request, Router } from "express";
import { middlewareFactory } from '@middlewares/index'
import { updateCostAmountController } from '@controllers/costAmount/update.controller'
import { ROLES } from "@/Enums"
import { UpdateCostAmountValidator } from "@/validators/CostAmount.validator";

export const updateCostAmountRouter = Router()

const bodyValidator = middlewareFactory({
  "type": "BodyValidator",
  "dto": UpdateCostAmountValidator
})

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.PURCHASING]
})

updateCostAmountRouter.put("/:costID", authMiddleware, bodyValidator, updateCostAmountController)