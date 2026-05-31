import prisma from '../lib/prisma.js';

export const getAllEducation = async (req, res) => {
  try {
    const education = await prisma.education.findMany({
      orderBy: { endYear: 'desc' },
    });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEducation = async (req, res) => {
  try {
    const { degree, institution, startYear, endYear, status, details } = req.body;

    const education = await prisma.education.create({
      data: { degree, institution, startYear, endYear, status, details },
    });

    res.status(201).json({ message: 'Education created', education });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { degree, institution, startYear, endYear, status, details } = req.body;

    const education = await prisma.education.update({
      where: { id },
      data: { degree, institution, startYear, endYear, status, details },
    });

    res.json({ message: 'Education updated', education });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.education.delete({ where: { id } });

    res.json({ message: 'Education deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
