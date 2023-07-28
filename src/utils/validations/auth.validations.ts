import validator from 'validator';

import { ValidationRules } from '@/utils/interfaces';

export const AuthValidationRules: ValidationRules = {
  email: {
    validator: validator.isEmail,
    message: 'Please enter a valid email address',
  },
  firstname: {
    validator: (value: string) => validator.isLength(value, { min: 1, max: 20 }),
    message: 'Please enter your first name',
  },
  lastname: {
    validator: (value: string) => validator.isLength(value, { min: 1, max: 20 }),
    message: 'Please enter your last name',
  },
  password: {
    validator: (value: string) => validator.isLength(value, { min: 8, max: 20 }),
    message: 'Please enter a valid password',
  },
};

export const SignInValidationRules: ValidationRules = {
  email: {
    validator: validator.isEmail,
    message: 'Please enter a valid email address',
  },
  password: {
    validator: (value: string) => validator.isLength(value, { min: 1 }),
    message: 'Please enter a',
  },
};
