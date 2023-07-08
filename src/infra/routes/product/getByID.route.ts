import { Router } from "express";
import { middlewareFactory } from '@middlewares/index'
import { getProductByIDController } from '@controllers/product/getByID.conroller'
import { ROLES } from "@/Enums"

export const getProductByIDRouter = Router()

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.SALES]
})

getProductByIDRouter.get("/:productID", authMiddleware, getProductByIDController);