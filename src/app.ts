import express, { Router } from 'express';
import ProductController from './controllers/ProductController';

const app = express();
const routes = Router();

routes.post('/products', ProductController.create);

app.use(express.json());
app.use(routes);

export default app;
