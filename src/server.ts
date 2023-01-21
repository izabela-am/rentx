import 'express-async-errors';
import 'reflect-metadata';

import { Server } from 'http';

import { app } from './app';
import { prisma } from './shared/infra/database/prisma/PrismaClient';

const PORT = 3333;

const server = new Server(app);

async function bootstrap() {
  await prisma.$connect();

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();
