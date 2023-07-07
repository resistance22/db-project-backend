import { Request, Router } from "express";
import { NewCostValidator } from "@validators/Cost.validator"
import { middlewareFactory } from '@middlewares/index'
import { addNewCostController } from '@controllers/cost/addNew.controller'
import { ROLES } from "@/Enums"

export const addNewCostRouter = Router()

const bodyValidator = middlewareFactory({
  "type": "BodyValidator",
  "dto": NewCostValidator
})

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.PURCHASING]
})

addNewCostRouter.post("/", authMiddleware, bodyValidator, addNewCostController);