import { hash } from 'bcryptjs';

import {
  ICreateUser,
  IUser,
  IUsersRepository
} from '../infra/repository/interfaces';

import { AppError } from '../../../shared/errors/AppError';
import { validateEmail } from '../../../security/emails/validators';
import { validatePassword } from '../../../security/passwords/validators';

export class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async run({ name, email, password }: ICreateUser): Promise<IUser> {
    const normalizedName = name.normalize('NFC').trim();
    validateEmail(email);
    validatePassword(password);

    const isAlreadyRegistered = await this.usersRepository.findByEmail(email);

    if(isAlreadyRegistered) {
      throw new AppError(
        'Registration Error',
        'This email address is already being used',
        409
      );
    }

    const passwordHash = await hash(password, 10);

    const user = await this.usersRepository.create({
      name: normalizedName,
      email,
      password: passwordHash
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  }
}