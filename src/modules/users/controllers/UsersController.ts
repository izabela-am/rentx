import { Request, Response } from 'express';
import { UsersRepository } from '../infra/repository/UsersRepository';

import { ChangePasswordService } from '../services/ChangePasswordService';
import { CreateUserService } from '../services/CreateUserService';
import { GetUserService } from '../services/GetUserService';

export class UsersController {
  private changePasswordService: ChangePasswordService;
  private createUserService: CreateUserService;
  private getUserService: GetUserService;
  
  constructor() {
    const usersRepository = new UsersRepository();

    this.getUserService = new GetUserService(usersRepository);
    this.createUserService = new CreateUserService(usersRepository);
    this.changePasswordService = new ChangePasswordService(usersRepository);
  }

  create = async (request: Request, response: Response): Promise<Response> => {
    const { name, email, password } = request.body;
    
    const user = await this.createUserService.run({
      name,
      email,
      password
    });

    return response.json(user);
  }

  read = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;

    const user = await this.getUserService.run(id);

    return response.json(user);
  }

  update = async (request: Request, response: Response): Promise<Response> => {
    return response.json();
  }

  delete = async (request: Request, response: Response): Promise<Response> => {
    return response.json();
  }
  
  changePassword = async (request: Request, response: Response): Promise<Response> => {
    const { currentPassword, newPassword } = request.body;
    const { id } = request.params;

    await this.changePasswordService.run({
      userId: id,
      newPassword,
      currentPassword,
    });

    return response.json({ message: 'Password changed!' });
  }
}