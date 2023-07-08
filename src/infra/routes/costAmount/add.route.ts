import { Router } from "express";
import { NewCostAmountValidator } from "@validators/CostAmount.validator"
import { middlewareFactory } from '@middlewares/index'
import { addNewCostAmountController } from '@controllers/costAmount/add.controller'
import { ROLES } from "@/Enums"

export const addNewCostAmountRouter = Router()

const bodyValidator = middlewareFactory({
  "type": "BodyValidator",
  "dto": NewCostAmountValidator
})

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.PURCHASING]
})

addNewCostAmountRouter.post("/:costID", authMiddleware, bodyValidator, addNewCostAmountController);