import express, { json } from 'express';
import "express-async-errors"
import cors from 'cors';
import dotenv from 'dotenv'
import router from './routes/index.js';
import { errorsHandlerMiddleware } from './middlewares/errorsHandlerMiddleware.js';
dotenv.config()

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorsHandlerMiddleware);

const PORT = process.env.PORT || 4000

app.listen( PORT, () => {
	console.log(`Running on port ${PORT}`)
})