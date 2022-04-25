import { Router } from "express";
import contentRouter from "./contentRouter.js";
import userRouter from "./userRouter.js";

const router = Router()

router.use(userRouter)
router.use(contentRouter)

export default router