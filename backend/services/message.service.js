import Message from '../models/message.js';
import User from '../models/user.js';
import ErrorResponse from '../utils/errorResponse.js';

export const createMessage = async (message) => {
	try {
		const createdMessage = await Message.create(message);
		return createdMessage;
	} catch (error) {
		throw new ErrorResponse(error);
	}
};

export const getAllMessages = async () => {
	try {
		const messages = await Message.findAll({
			order: [['createdAt', 'ASC']],
			include: [
				{
					model: User,
					as: 'senderUser',
					attributes: ['id', 'username', 'createdAt'],
				},
			],
		});
		return messages;
	} catch (error) {
		throw new ErrorResponse(error);
	}
};
