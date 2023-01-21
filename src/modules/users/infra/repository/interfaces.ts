import { Users } from '@prisma/client';

export interface IUsersRepository {
  findByEmail(email: string): Promise<Users | null>;
  create({ name, email, password }: ICreateUser): Promise<Users>;
  findById(userId: string): Promise<Users | null>;
  changePassword(userId: string, newPassword: string): Promise<void>;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export type IUser = Omit<Users, 'password' | 'admin'>;
