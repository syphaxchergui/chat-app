import express from 'express';
import { errorHandler } from '../../middlewares/error.js';
import {
	getMessagesController,
	getPrivateMessagesController,
	uploadFileMessage,
} from '../../controllers/message.controller.js';
import { upload } from '../../middlewares/upload.js';

const router = express.Router();

router.get('/', getMessagesController, errorHandler);
router.post('/upload', upload.single('file'), uploadFileMessage, errorHandler);
router.get('/private', getPrivateMessagesController, errorHandler);

export default router;
