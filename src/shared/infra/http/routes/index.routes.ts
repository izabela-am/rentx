import { Router } from 'express';

import { usersRouter } from '../../../../modules/users/infra/http/routes/users.routes';
import { specsRouter } from '../../../../modules/specs/infra/http/routes/specs.routes';
import { rentalsRouter } from '../../../../modules/rentals/infra/http/routes/rentals.routes';
import { vehiclesRouter } from '../../../../modules/vehicles/infra/http/routes/vehicles.routes';
import { sessionsRouter } from '../../../../modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/specs', specsRouter);
routes.use('/vehicles', vehiclesRouter);
routes.use('/rentalsRouter', rentalsRouter);

export { routes };
