
import { Router } from 'express';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';
import * as contentController from '../controllers/contentController.js';

const contentRouter = Router();

contentRouter.get("/content/teachers", validateToken, contentController.listContentByInstructors);

contentRouter.get("/content/terms", validateToken, contentController.listContentByTerms)

export default contentRouter;