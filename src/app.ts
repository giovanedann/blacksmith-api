import express, { Router } from 'express';
import OrderController from './controllers/OrderController';
import ProductController from './controllers/ProductController';
import UserController from './controllers/UserController';

const app = express();
const routes = Router();

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.create);
routes.post('/users', UserController.create);
routes.post('/login', UserController.authenticate);
routes.get('/orders', OrderController.index);

app.use(express.json());
app.use(routes);

export default app;
