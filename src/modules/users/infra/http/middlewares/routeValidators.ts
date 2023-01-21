import { celebrate, Joi } from 'celebrate';

import { invalidPasswords } from '../../../../../security/passwords/blocklist';

const password = Joi.string()
  .min(12)
  .max(128)
  .disallow(...invalidPasswords)
  .required();

const email = Joi.string().email().required();

const createUserValidator = celebrate({
  body: {
    name: Joi.string().required(),
    password,
    email,
  }
});

const getUserValidator = celebrate({
  params: {
    id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
  }
});

const authValidator = celebrate({
  body: {
    email,
    password
  }
});

const changePasswordValidator = celebrate({
  body: {
    email,
    password
  }
});

export {
  changePasswordValidator,
  createUserValidator,
  getUserValidator,
  authValidator,
}