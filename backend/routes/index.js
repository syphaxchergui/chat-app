import express from 'express';
import { auth } from '../middlewares/auth.js';
import AuthRoutes from './Auth/auth.routes.js';
import MessageRoutes from './Message/message.routes.js';
import UserRoutes from './User/user.routes.js';

const router = express.Router();

router.use('/auth', AuthRoutes);

router.use(auth);
//protected routes
router.use('/messages', MessageRoutes);
router.use('/users', UserRoutes);

export default router;
