import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const auth = async (req, res, next) => {
	const token =
		req.body.token || req.query.token || req.headers['x-access-token'];

	if (!token) {
		return res.status(403).json({
			success: false,
			message: `Please provide an authentication token`,
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET, { maxAge: '7d' });

		req.user = decoded;
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: `Invalide token`,
		});
	}

	next();
};
