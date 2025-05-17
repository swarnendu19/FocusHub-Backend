import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const validate = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
  try {
    let value;
    // If the schema expects body, validate req.body directly
    if (req.body && Object.keys(req.body).length > 0) {
      value = schema.parse(req.body);
      Object.assign(req, { body: value });
    } else {
      value = schema.parse({ ...req });
      Object.assign(req, value);
    }
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
