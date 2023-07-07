import { Request, Router } from "express";
import { NewCostValidator } from "@validators/Cost.validator"
import { middlewareFactory } from '@middlewares/index'
import { updateCostController } from '@controllers/cost/updateCost.controller'
import { ROLES } from "@/Enums"

export const updateCostRouter = Router()

const bodyValidator = middlewareFactory({
  "type": "BodyValidator",
  "dto": NewCostValidator
})

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.PURCHASING]
})

updateCostRouter.put("/:costID", authMiddleware, bodyValidator, updateCostController)