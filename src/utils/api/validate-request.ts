/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest } from 'next';

import { ValidationRule } from '@/utils/interfaces';


//This function takes in a request object (req) and a set of validation rules (validationRules). It iterates over the validation rules and checks if the corresponding value in the request body passes the validation rule. If the value is either undefined or fails the validation, an error message is added to the errors object with the key being the field name and the value being the error message.
export const validateRequestBody = (req: NextApiRequest, validationRules: Record<string, ValidationRule>): Record<string, string> => {
  const errors: Record<string, string> = {};
  Object.keys(validationRules).forEach((key) => {
    const value = (req as Record<string, any>)[key];
    const rule = validationRules[key];

    if (value === undefined || !rule.validator(value as string)) {
      errors[key] = rule?.message || `Invalid ${key}`;
    }
  });

  return errors;
};


//This function is similar to validateRequestBody but it validates the query parameters of the request instead of the body. It first checks if all required query parameters are present. If a required parameter is missing, it adds an error message to the errors object. Then, it iterates over the query parameters in the request and checks if they pass their corresponding validation rules. If a parameter fails the validation, an error message is added to the errors object.
export const validateRequestQuery = (req: NextApiRequest, validationRules: Record<string, ValidationRule>): Record<string, string> => {
  const errors: Record<string, string> = {};

  // check if all the required query params are present
  const requiredQueryParams = Object.keys(validationRules).filter((key) => validationRules[key].required);

  if (requiredQueryParams.length > 0) {
    requiredQueryParams.forEach((param) => {
      if (!req.query[param]) {
        errors[param] = `Missing ${param}`;
      }
    });

    if (Object.keys(errors).length > 0) {
      return errors;
    }
  }

  Object.entries(req.query).forEach(([key, value]) => {
    const rule = validationRules[key];
    if (!rule || !rule.validator(value as string)) {
      errors[key] = rule?.message || `Invalid ${key}`;
    }
  });
  return errors;
};
