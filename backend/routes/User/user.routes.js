import express from 'express';
import { errorHandler } from '../../middlewares/error.js';
import { getOnlineUsers } from '../../services/user.service.js';

const router = express.Router();

router.get('/online', getOnlineUsers, errorHandler);

export default router;
