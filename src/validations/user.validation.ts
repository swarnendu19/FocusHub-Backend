import { Role } from '@prisma/client';
import { z } from 'zod';
import { password } from './custom.validation';

const createUser = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required').refine(password, 'Invalid password format'),
    name: z.string().min(1, 'Name is required'),
    role: z.enum([Role.USER, Role.ADMIN]),
  }),
});

const getUsers = z.object({
  query: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    sortBy: z.string().optional(),
    limit: z.number().int().optional(),
    page: z.number().int().optional(),
  }),
});

const getUser = z.object({
  params: z.object({
    userId: z.number().int(),
  }),
});

const updateUser = z.object({
  params: z.object({
    userId: z.number().int(),
  }),
  body: z
    .object({
      email: z.string().email('Invalid email').optional(),
      password: z.string().refine(password, 'Invalid password format').optional(),
      name: z.string().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, 'At least one field must be provided'),
});

const deleteUser = z.object({
  params: z.object({
    userId: z.number().int(),
  }),
});

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
