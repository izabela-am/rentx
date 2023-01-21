import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../../../errors/AppError";
import authConfig from '../../../config/auth';

interface IToken {
  iad: number;
  exp: number;
  sub: string;
}

export async function auth(request: Request, response: Response, next: NextFunction): Promise<void> {
  const { authorization } = request.headers;

  if(!authorization) {
    throw new AppError(
      'Authentication Error',
      'JWT Token is missing.',
      401
    );
  }

  // split 'Bearer' keyword from token
  const [, token] = authorization.split(' ');

  const decodedToken = verify(token, authConfig.jwt.secret);

  const { sub } = decodedToken as IToken;

  request.user = { id: sub };
  
  return next();
}