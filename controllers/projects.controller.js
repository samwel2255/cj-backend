import prisma from '../lib/prisma.js';

export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, description, technologies, link, github, imageUrl, featured } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        technologies,
        link,
        github,
        imageUrl,
        featured,
      },
    });

    res.status(201).json({ message: 'Project created', project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, technologies, link, github, imageUrl, featured } = req.body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        name,
        description,
        technologies,
        link,
        github,
        imageUrl,
        featured,
      },
    });

    res.json({ message: 'Project updated', project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({ where: { id } });

    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
