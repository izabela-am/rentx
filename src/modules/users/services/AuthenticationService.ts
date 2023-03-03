import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { AppError } from '../../../shared/errors/AppError';

import authConfig from '../../../shared/config/auth';
import { IUser, IUsersRepository } from '../infra/repository/interfaces';

interface IResponse {
  user: IUser;
  token: string;
}

export class AuthenticationService {
  constructor(private usersRepository: IUsersRepository) { }

  async run(email: string, password: string): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError(
        'Authentication Error',
        'Incorrect email/password combination.',
        401
      );
    }

    const doPasswordsMatch = await compare(password, user.password);

    if(!doPasswordsMatch) {
      throw new AppError(
        'Authentication Error',
        'Incorrect email/password combination.',
        401
      );
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    });

    return { 
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
      }, 
    }
  }
}
