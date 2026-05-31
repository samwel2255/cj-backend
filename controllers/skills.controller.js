import prisma from '../lib/prisma.js';

export const getAllSkills = async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { category: 'asc' },
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { name, category, proficiency } = req.body;

    const skill = await prisma.skill.create({
      data: { name, category, proficiency },
    });

    res.status(201).json({ message: 'Skill created', skill });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, proficiency } = req.body;

    const skill = await prisma.skill.update({
      where: { id },
      data: { name, category, proficiency },
    });

    res.json({ message: 'Skill updated', skill });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.skill.delete({ where: { id } });

    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
