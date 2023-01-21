import express from 'express';
import helmet from 'helmet';

import { errors } from './shared/infra/http/middlewares/errors';
import { routes } from './shared/infra/http/routes/index.routes';

export const app = express();

app.use(express.json());
app.use(helmet());
app.use(routes);
app.use(errors);