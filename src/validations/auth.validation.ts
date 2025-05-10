import { z } from 'zod';
import { password } from './custom.validation';

const register = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .refine(password, 'Password must contain at least one letter and one number'),
  }).strict(),
});

const login = z.object({
  body: z.object({
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});

const logout = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
  }),
});

const refreshTokens = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
  }),
});

const forgotPassword = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
  }),
});

const resetPassword = z.object({
  query: z.object({
    token: z.string().min(1, 'Token is required'),
  }),
  body: z.object({
    password: z.string().min(1, 'Password is required').refine(password, 'Invalid password format'),
  }),
});

const verifyEmail = z.object({
  query: z.object({
    token: z.string().min(1, 'Token is required'),
  }),
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
