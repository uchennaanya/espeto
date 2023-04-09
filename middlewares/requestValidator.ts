import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

interface UserCredentials {
  email: string;
  password: string;
}

export const validateUserCredentials = (request: Request, response: Response, next: NextFunction) => {
  const userCredentials: UserCredentials = request.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const validationResult = schema.validate(userCredentials);

  if (validationResult.error) {
    return response.status(400).json({
      error: validationResult.error.message,
    });
  }

  next();
};
