import express from 'express';
import {
  submitContact,
  getMessages,
  markAsRead,
  deleteMessage,
} from '../controllers/contact.controller.js';
import { validateContact, handleValidationErrors } from '../middleware/validate.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', validateContact, handleValidationErrors, submitContact);
router.get('/', authMiddleware, getMessages);
router.patch('/:id/read', authMiddleware, markAsRead);
router.delete('/:id', authMiddleware, deleteMessage);

export default router;
