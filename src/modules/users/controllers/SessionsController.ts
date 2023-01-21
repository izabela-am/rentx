import { Request, Response } from 'express';
import { UsersRepository } from '../infra/repository/UsersRepository';

import { AuthenticationService } from '../services/AuthenticationService';

export class SessionsController {
  private authenticationService: AuthenticationService;

  constructor() {
    this.authenticationService = new AuthenticationService(
      new UsersRepository()
    );
  }

  create = async (request: Request, response: Response): Promise<Response> => {
    const { email, password } = request.body;

    const { user, token } = await this.authenticationService.run(email, password);

    return response.json({ user, token });
  }
}