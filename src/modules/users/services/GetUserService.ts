import { AppError } from '../../../shared/errors/AppError';
import { IUser, IUsersRepository } from "../infra/repository/interfaces";

export class GetUserService {
  constructor(private usersRepository: IUsersRepository) {}
 
  async run(userId: string): Promise<IUser> {
    const user = await this.usersRepository.findById(userId);

    if(!user) {
      throw new AppError(
        'Not Found',
        'No users were found.',
        404
      );
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  }
}