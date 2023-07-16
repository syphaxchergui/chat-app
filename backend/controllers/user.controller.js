import { getOnlineUsers } from '../services/user.service.js';
import ErrorResponse from '../utils/errorResponse.js';

export const getOnlineUsersController = async (req, res, next) => {
	try {
		const onlineUsers = await getOnlineUsers();

		if (!onlineUsers) throw new ErrorResponse('No users found online', 404);

		return res.status(200).json({
			success: true,
			onlineUsers,
		});
	} catch (error) {
		next(error);
	}
};
