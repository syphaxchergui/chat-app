import express from 'express';
import { errorHandler } from '../../middlewares/error.js';
import { login, register } from '../../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login, errorHandler);
router.post('/register', register, errorHandler);

export default router;
