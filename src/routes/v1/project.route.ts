import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { projectValidation } from '../../validations';
import { projectController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(projectValidation.createProject), projectController.createProject)
  .get(auth(), validate(projectValidation.getProjectsById), projectController.getProjectsById);

export default router;
