import { Op } from 'sequelize';
import PrivateMessage from '../models/privateMessage.js';
import User from '../models/user.js';
import ErrorResponse from '../utils/errorResponse.js';

export const createPrivateMessage = async (message) => {
	try {
		const createPrivateMessage = await PrivateMessage.create(message);
		return createPrivateMessage;
	} catch (error) {
		throw new ErrorResponse(error);
	}
};

export const getAllPrivateMessages = async (senderId, receiverId) => {
	try {
		const privateMessages = await PrivateMessage.findAll({
			where: {
				[Op.or]: [
					{
						sender: senderId,
						receiver: receiverId,
					},
					{
						sender: receiverId,
						receiver: senderId,
					},
				],
			},
			order: [['createdAt', 'ASC']],
			include: [
				{
					model: User,
					as: 'senderUser',
					attributes: ['id', 'username', 'createdAt'],
				},
				{
					model: User,
					as: 'receiverUser',
					attributes: ['id', 'username', 'createdAt'],
				},
			],
		});
		return privateMessages;
	} catch (error) {
		throw new ErrorResponse(error);
	}
};
