import { Router } from 'express'

import InternalServerError from './routes/helper/500.js'
import NotFound from './routes/helper/404.js'
import userRouter from './routes/userRouter.js'
import productRouter from "./routes/productRouter.js";

const api = Router()
  .use('/users', userRouter)
  .use('/products', productRouter)

const routes = Router()
  .use('/api', api)
  .use(InternalServerError)
  .use(NotFound)

export default routes
