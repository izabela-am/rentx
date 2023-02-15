import { AppError } from "../../shared/errors/AppError";

/**
 * @description Run a series of security validations on an e-mail address.
 * @param email The email that will be validated
 * @returns True if email is valid, False if it isn't 
 */
export function validateEmail(email: string): boolean {
  validateEmailFormat(email);

  return true;
}

/**
 * @description RFC2822 Email Validation
 */
function validateEmailFormat(email: string): boolean {
  const regexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

  const isValid = regexp.test(email);

  if(!isValid) {
    throw new AppError(
      'Validation Error',
      'The provided email address is not valid.',
      422
    );
  }

  return true;
}
