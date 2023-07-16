import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ErrorResponse from '../utils/errorResponse.js';
import { createUser, getUserByUsername } from '../services/user.service.js';

export const register = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		// Check if user already exists
		const existingUser = await getUserByUsername(username);
		if (existingUser) {
			throw new ErrorResponse('User already exists!', 400);
		}

		// Hash password and create new user
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = { username, password: hashedPassword };
		const user = await createUser(newUser);

		// Generate JWT and send it to client
		const token = jwt.sign(
			{ user: { id: user.id, username: username } },
			process.env.JWT_SECRET,
			{
				expiresIn: '7d',
			}
		);
		return res
			.status(201)
			.json({ success: true, user: { username, id: user.id }, token });
	} catch (err) {
		next(err);
	}
};

export const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		// Check if user exists
		const user = await getUserByUsername(username);
		if (!user) {
			throw new ErrorResponse('Please register fisrt !', 401);
		}

		// Check password
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			throw new ErrorResponse('Invalid credentials', 401);
		}

		// Generate JWT and send it to client
		const token = jwt.sign(
			{ user: { id: user.id, username: username } },
			process.env.JWT_SECRET
		);
		return res
			.status(200)
			.json({ success: true, user: { username, id: user.id }, token });
	} catch (err) {
		next(err);
	}
};
