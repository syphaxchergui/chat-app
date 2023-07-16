import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const User = sequelize.define('User', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	online: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default User;
