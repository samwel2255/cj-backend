import prisma from '../lib/prisma.js';

export const getAllProjects = async () => {
  return await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getProjectById = async (id) => {
  return await prisma.project.findUnique({ where: { id } });
};

export const createNewProject = async (projectData) => {
  return await prisma.project.create({ data: projectData });
};

export const updateProjectData = async (id, projectData) => {
  return await prisma.project.update({ where: { id }, data: projectData });
};

export const deleteProjectData = async (id) => {
  return await prisma.project.delete({ where: { id } });
};
