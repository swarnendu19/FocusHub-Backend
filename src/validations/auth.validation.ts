import { z } from 'zod';
import { password } from './custom.validation';

const register = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
  password: z.string({ required_error: 'Password is required' }).refine(password, {
    message: 'Password must contain at least one letter and one number',
  }),
});

const login = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

const logout = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

const refreshTokens = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

const forgotPassword = z.object({
  email: z.string().email('Invalid email'),
});

const resetPassword = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(1, 'Password is required').refine(password, 'Invalid password format'),
});

const verifyEmail = z.object({
  token: z.string().min(1, 'Token is required'),
});

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
