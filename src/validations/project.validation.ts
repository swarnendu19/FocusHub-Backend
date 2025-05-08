import { z } from 'zod';

const createProject = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    visibility: z.enum(['public', 'private']),
    projectUrl: z.string().min(1, 'Project URL is required'),
    userId: z.number().min(1, 'User ID is required'),
  }),
});

const getProjectsById = z.object({
  params: z.object({
    projectId: z.number().min(1, 'Project ID is required'),
  }),
});

export default {
  createProject,
  getProjectsById,
};
