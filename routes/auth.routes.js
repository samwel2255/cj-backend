import express from 'express';
import { loginAdmin, logoutAdmin } from '../controllers/auth.controller.js';
import { validateLogin, handleValidationErrors } from '../middleware/validate.middleware.js';

const router = express.Router();

router.post('/login', validateLogin, handleValidationErrors, loginAdmin);
router.post('/logout', logoutAdmin);

export default router;
