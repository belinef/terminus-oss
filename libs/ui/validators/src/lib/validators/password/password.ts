import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import { passwordRegex } from '@terminus/fe-utilities';


/**
 * Return a validator function to verify a password is valid
 *
 * @returns The validator function
 */
export const passwordValidator = (): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  // Allow optional controls by not validating empty values
  if (!control || !control.value) {
    return null;
  }

  const invalidResponse: ValidationErrors = {
    password: {
      valid: false,
      actual: control.value,
    },
  };
  return passwordRegex.test(control.value) ? null : invalidResponse;
};
