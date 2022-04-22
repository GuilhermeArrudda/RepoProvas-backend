import { Router } from "express";
import * as userController from "../controllers/userController.js";
import validationSchemaMiddleware from "../middlewares/validationSchemaMiddleware.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router()

userRouter.post("/sign-up", validationSchemaMiddleware(userSchema), userController.create)
userRouter.post("/login", validationSchemaMiddleware(userSchema), userController.login)

export default userRouter