import { Project } from '@prisma/client';
import prisma from '../client';

/**
 * Create a project
 * @param {Object} projectBody
 * @returns {Promise<Project>}
 */

interface ProjectType {
  name: string;
  description: string;
  visibility: string;
  projectUrl: string;
  userId: number;
}

const createProject = async(projectData: ProjectType): Promise<Project> => {
    const project = await prisma.project.create({
        data: {
            name: projectData.name,
            description: projectData.description,
            visibility: projectData.visibility,
            projectUrl: projectData.projectUrl,
            userId: projectData.userId,
        }
    });
    return project;
}


const getProjectsById = async(projectId: number): Promise<Project> => {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    });
    return project;
}


export default {
    createProject,
    getProjectsById,
}
