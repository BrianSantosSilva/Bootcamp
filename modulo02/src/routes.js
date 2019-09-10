import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello Brian' });
});
export default routes;
