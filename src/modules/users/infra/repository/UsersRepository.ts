import { Users } from '@prisma/client';

import { prisma } from '../../../../shared/infra/database/prisma/PrismaClient';

import {
  ICreateUser,
  IUsersRepository
} from './interfaces';

export class UsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<Users | null> {
    const user = await prisma.users.findFirst({
      where: { email }
    });

    return user;
  }

  async create({ name, email, password }: ICreateUser): Promise<Users> {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password,
        admin: false
      }
    });

    return user;
  }

  async findById(userId: string): Promise<Users | null> {
    const user = await prisma.users.findFirst({
      where: { id: userId }
    });

    return user;
  }

  async changePassword(userId: string, newPassword: string): Promise<void> {
    await prisma.users.update({
      where: { id: userId },
      data: { password: newPassword }
    });
  }
}
