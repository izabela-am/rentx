import { Router } from 'express';

import { authValidator } from '../middlewares/routeValidators';

import { SessionsController } from '../../../controllers/SessionsController';

const sessionsController = new SessionsController();
const sessionsRouter = Router();

sessionsRouter.post('/', authValidator, sessionsController.create);

export { sessionsRouter };
