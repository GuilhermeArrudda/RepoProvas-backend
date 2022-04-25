import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";
import validationSchemaMiddleware from "../middlewares/validationSchemaMiddleware.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router()

userRouter.post("/sign-up", validationSchemaMiddleware(userSchema), userController.create)
userRouter.post("/login", validationSchemaMiddleware(userSchema), userController.login)
userRouter.post("/token", validateToken, (req, res) => res.sendStatus(200))

export default userRouter