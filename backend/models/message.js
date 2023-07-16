import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import User from './user.js';

const Message = sequelize.define('Message', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	text: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	file: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});

Message.belongsTo(User, { as: 'senderUser', foreignKey: 'sender' });

export default Message;
