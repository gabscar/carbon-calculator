import { z } from 'zod';

export const requiredNumber = (fieldName: string, min: number = 0, customMinMsg?: string) =>
  z.preprocess(
    (val) => {
      if (val === '' || val === undefined || val === null) {
        return undefined; 
      }
      const num = Number(val);
      return isNaN(num) ? val : num; 
    },
    z.number({
      required_error: `${fieldName} is required`,
      invalid_type_error: `${fieldName} must be a number`,
    }).min(min, customMinMsg ?? `${fieldName} must be at least ${min}`)
  );

export const requiredString = (fieldName: string) =>
    z.preprocess(
      (val) => {
        if (typeof val !== 'string' || val.trim() === '') {
          return undefined; 
        }
        return val;
      },
      z.string({
        required_error: `${fieldName} is required`,
        invalid_type_error: `${fieldName} must be a string`,
      })
    );