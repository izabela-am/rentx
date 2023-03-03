import { AppError } from '../../shared/errors/AppError';

import { invalidPasswords } from './blocklist';

/**
 * @description Run a series of security validations on a password.
 * @param password The password that will be validated
 * @returns True if password is valid 
 */
export function validatePassword(password: string): boolean {
  checkPasswordLength(password);
  checkBlocklist(password);
  checkEntropy(password);

  return true;
}

/**
 * @asvs 2.1.1. Verify that user set passwords are at least 12 characters in length (after multiple spaces are combined)
 * @asvs 2.1.2. Verify that passwords of at least 64 characters are permitted, and that passwords of more than 128 characters are denied.
 */
function checkPasswordLength(password: string): boolean {
  const normalizedPassword = password.replace(/\s+/g, ' ');

  if(normalizedPassword.length < 12) {
    throw new AppError(
      'Validation Error',
      'The password must be at least 12 characters in length.',
      422
    );
  }

  if(password.length > 128) {
    throw new AppError(
      'Validation Error',
      `The password has a length of ${password.length}, which exceeds the max length of 128`,
      422
    );
  }

  return true;
}

/**
 * @asvs 2.1.7. Verify that passwords submitted during account registration, login, and password change are checked against a set of breached passwords.
 */
function checkBlocklist(password: string): boolean {
  if(invalidPasswords.includes(password)) {
    throw new AppError(
      'Validation Error',
      'The informed password is not allowed. Please try again.',
      422
    );
  }

  return true;
}


/**
 * @description Check the entropy of the password
 * @param password The password that will be validated
 * @returns True if entropy reaches the threshold
 */
function checkEntropy(password: string): boolean {
  // TODO: Implementar código aqui!!

  return true;
}
