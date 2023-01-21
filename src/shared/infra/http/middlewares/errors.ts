import { CelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

import { AppError } from '../../../errors/AppError';

export function errors(err: Error, request: Request, response: Response, _: NextFunction): Response {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      name: err.name,
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof CelebrateError) {
    return response.status(422).json({
      name: 'Validation Error',
      message: 'An error occured during route validations.'
    });
  }

  return response.status(500).json({
    status: err.name,
    message: err.message,
    stack: err.stack // ! ONLY IN DEVELOPMENT
  });
}
