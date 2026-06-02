import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import prisma from '../lib/prisma.js';
import {
  getProfile,
  updateProfile,
} from '../controllers/profile.controller.js';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projects.controller.js';
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skills.controller.js';
import {
  getAllEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/education.controller.js';
import {
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../controllers/contact.controller.js';

const router = express.Router();

// Admin dashboard summary
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const [projectCount, skillCount, educationCount, messageCount, unreadMessages] = await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.education.count(),
      prisma.contact.count(),
      prisma.contact.count({ where: { read: false } }),
    ]);

    res.json({
      projectCount,
      skillCount,
      educationCount,
      messageCount,
      unreadMessages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ PROFILE MANAGEMENT ============
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

// ============ PROJECTS CRUD ============
router.get('/projects', authMiddleware, getAllProjects);
router.post('/projects', authMiddleware, createProject);
router.put('/projects/:id', authMiddleware, updateProject);
router.delete('/projects/:id', authMiddleware, deleteProject);

// ============ SKILLS CRUD ============
router.get('/skills', authMiddleware, getAllSkills);
router.post('/skills', authMiddleware, createSkill);
router.put('/skills/:id', authMiddleware, updateSkill);
router.delete('/skills/:id', authMiddleware, deleteSkill);

// ============ EDUCATION CRUD ============
router.get('/education', authMiddleware, getAllEducation);
router.post('/education', authMiddleware, createEducation);
router.put('/education/:id', authMiddleware, updateEducation);
router.delete('/education/:id', authMiddleware, deleteEducation);

// ============ CONTACTS/MESSAGES CRUD ============
router.get('/contacts', authMiddleware, getAllContacts);
router.get('/contacts/:id', authMiddleware, getContactById);
router.put('/contacts/:id', authMiddleware, updateContact);
router.delete('/contacts/:id', authMiddleware, deleteContact);

export default router;
