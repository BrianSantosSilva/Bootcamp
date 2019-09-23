import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Cadastro Usuario
routes.post('/users', UserController.store);

// Validação Usuario
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// Atualiza Usuario
routes.put('/users', UserController.update);

export default routes;
