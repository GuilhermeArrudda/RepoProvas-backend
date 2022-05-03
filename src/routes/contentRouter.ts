
import { Router } from 'express';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';
import * as contentController from '../controllers/contentController.js';

const contentRouter = Router();

contentRouter.get("/content/teachers", validateToken, contentController.listContentByInstructors);
contentRouter.get("/content/terms", validateToken, contentController.listContentByTerms)
contentRouter.get("/content/disciplines", validateToken, contentController.listDisciplines)
contentRouter.get("/content/discipline/:name", validateToken, contentController.listDisciplinesByName)
contentRouter.get("/content/disciplines/:id", validateToken, contentController.listDisciplinesById)
contentRouter.get("/content/categories", validateToken, contentController.listCategories)
contentRouter.post("/tests/create", validateToken, contentController.createTest)
contentRouter.patch("/content/views/:id", validateToken, contentController.updateViews)

export default contentRouter;