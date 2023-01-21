import { compare, hash } from 'bcryptjs';

import {
  IUser,
  IUsersRepository
} from '../infra/repository/interfaces';

import { AppError } from '../../../shared/errors/AppError';
import { validatePassword } from '../../../security/passwords/validators';

interface IChangePassword {
  userId: string,
  newPassword: string;
  currentPassword: string;
}

export class ChangePasswordService {
  constructor(private usersRepository: IUsersRepository) { }

  async run({ userId, currentPassword, newPassword }: IChangePassword): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError(
        'Could Not Change Password',
        'No users were found with the provided ID.',
        401
      );
    }

    const doPasswordsMatch = await compare(currentPassword, user.password);

    if (!doPasswordsMatch) {
      throw new AppError(
        'Could Not Change Password',
        'Provide the correct current password before setting a new one.',
        401
      );
    }
      
    validatePassword(newPassword);
    const hashedPassword = await hash(newPassword, 10);

    await this.usersRepository.changePassword(userId, hashedPassword);
  }
}