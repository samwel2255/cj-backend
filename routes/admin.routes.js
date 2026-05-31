import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import prisma from '../lib/prisma.js';

const router = express.Router();

// Admin dashboard summary
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const [projectCount, skillCount, educationCount, messageCount] = await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.education.count(),
      prisma.contact.count({ where: { read: false } }),
    ]);

    res.json({
      projectCount,
      skillCount,
      educationCount,
      messageCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Additional admin routes can be added here

export default router;
