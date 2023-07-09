import { Router } from "express";
import { middlewareFactory } from '@middlewares/index'
import { getProductByIDController } from '@controllers/product/getByID.conroller'
import { ROLES } from "@/Enums"

export const getProductCostsRouter = Router()

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.SALES]
})

getProductCostsRouter.get("/costs/:productID", authMiddleware, getProductByIDController);