import { Router } from 'express';

import {
  createUserValidator,
  getUserValidator
} from '../middlewares/routeValidators';

import { auth } from '../../../../../shared/infra/http/middlewares/auth';
import { UsersController } from '../../../controllers/UsersController';

const usersController = new UsersController();
const usersRouter = Router();

usersRouter.post('/', createUserValidator, usersController.create);
usersRouter.get('/:id', getUserValidator, usersController.read);
usersRouter.put('/', createUserValidator, usersController.update);
usersRouter.delete('/', createUserValidator, usersController.delete);

usersRouter.patch('/:id/password', auth, usersController.changePassword);

export { usersRouter };
