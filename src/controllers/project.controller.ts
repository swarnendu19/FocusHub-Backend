import { projectService } from '../services';
import catchAsync from '../utils/catchAsync';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const createProject = catchAsync(async (req: Request, res: Response) => {
  const project = await projectService.createProject(req.body);
  res.status(httpStatus.CREATED).json(project);
});

const getProjectsById = catchAsync(async (req: Request, res: Response) => {
  const project = await projectService.getProjectsById(parseInt(req.params.projectId));
  res.status(httpStatus.OK).json(project);
});

export default {
  createProject,
  getProjectsById,
};
