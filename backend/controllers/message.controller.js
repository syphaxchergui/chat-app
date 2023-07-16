import ErrorResponse from '../utils/errorResponse.js';
import { createMessage, getAllMessages } from '../services/message.service.js';
import { getAllPrivateMessages } from '../services/private-message.service.js';
import cloudinary from '../core/cloudinary.js';
import { io } from '../socket/index.js';

export const getMessagesController = async (req, res, next) => {
	try {
		const messages = await getAllMessages();

		if (!messages) throw new ErrorResponse('No messages found', 404);

		return res.status(200).json({
			success: true,
			messages,
		});
	} catch (error) {
		next(error);
	}
};

export const getPrivateMessagesController = async (req, res, next) => {
	try {
		const privateMessages = await getAllPrivateMessages(
			req.user.user.id,
			req.query.receiverId
		);

		if (!privateMessages)
			throw new ErrorResponse('No private messages found', 404);

		return res.status(200).json({
			success: true,
			privateMessages,
		});
	} catch (error) {
		next(error);
	}
};

export const uploadFileMessage = async (req, res, next) => {
	try {
		const result = await cloudinary.uploader.upload(req.file.path);

		await createMessage({
			sender: req.user.user.id,
			text: 'Image',
			file: result.secure_url,
		});

		const messages = await getAllMessages();

		io.to('globalChatRoom').emit('message', messages);
		io.emit('message', messages);

		return res.status(200).json({
			success: true,
			message: 'File uploaded successfuly !',
		});
	} catch (err) {
		next(err);
	}
};
