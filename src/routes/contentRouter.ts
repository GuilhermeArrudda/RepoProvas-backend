
import { Router } from 'express';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';
import * as contentController from '../controllers/contentController.js';

const contentRouter = Router();

contentRouter.get("/content/teachers", validateToken, contentController.listContentByInstructors);
contentRouter.get("/content/terms", validateToken, contentController.listContentByTerms)
contentRouter.get("/content/disciplines", contentController.listDisciplines)
contentRouter.get("/content/discipline/:name", validateToken, contentController.listDisciplinesByName)
contentRouter.get("/content/categories", validateToken, contentController.listCategories)
contentRouter.get("/content/disciplines/:id", validateToken, contentController.listDisciplinesById)
contentRouter.patch("/content/views/:id", validateToken, contentController.updateViews)

export default contentRouter;