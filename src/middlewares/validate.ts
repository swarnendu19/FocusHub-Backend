import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import pick from '../utils/pick';
import { z } from 'zod';

const validate = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const obj = pick(req, Object.keys(validSchema));
    const value = schema.parse(obj);
    Object.assign(req, value);
    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    return next(error);
  }
};

export default validate;
