import { Router } from 'express'

import order from "./middlewares/order.js";
import hateoas from "./middlewares/hateoas.js";
import handlers from "./middlewares/handlers.js";

import InternalServerError from './routes/helper/500.js'
import NotFound from './routes/helper/404.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
import productRouter from "./routes/productRouter.js";
import taskRouter from "./routes/taskRouter.js";
import {verify} from "./controllers/authController.js";

const routes = Router();
routes.use(order);
routes.use(hateoas);
routes.use(handlers);
routes.use(order);

routes.use("/login", authRouter);
routes.use("/api/users", /*verify,*/ userRouter);
routes.use("/api/products", /*verify,*/ productRouter);
routes.use("/api/tasks", /*verify,*/ taskRouter);

routes.use(InternalServerError)
routes.use(NotFound)

export default routes
