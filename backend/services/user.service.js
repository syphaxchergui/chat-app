import User from '../models/user.js';
import ErrorResponse from '../utils/errorResponse.js';

export const createUser = async (user) => {
	try {
		const createdUser = await User.create(user);
		return createdUser;
	} catch (error) {
		throw new ErrorResponse(error);
	}
};

export const getOnlineUsers = async () => {
	try {
		const users = await User.findAll({
			where: {
				online: true,
			},
			attributes: {
				exclude: ['password'],
			},
		});
		return users;
	} catch (error) {
		throw new ErrorResponse(error);
	}
};

export const toggleOnlineUser = async (id, isOnline) => {
	try {
		const user = await User.update(
			{ online: isOnline },
			{
				where: {
					id: id,
				},
				attributes: {
					exclude: ['password'],
				},
			}
		);
		return user;
	} catch (error) {
		throw new ErrorResponse(error);
	}
};

export const getUserById = async (id) => {
	try {
		const user = await User.findByPk(id);
		return user;
	} catch (error) {
		throw new ErrorResponse(error);
	}
};

export const getUserByUsername = async (username) => {
	try {
		const user = await User.findOne({
			where: {
				username,
			},
		});
		return user;
	} catch (error) {
		throw new ErrorResponse(error);
	}
};
