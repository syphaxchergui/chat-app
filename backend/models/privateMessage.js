import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import User from './user.js';

const PrivateMessage = sequelize.define('PrivateMessage', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	text: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

PrivateMessage.belongsTo(User, { as: 'senderUser', foreignKey: 'sender' });
PrivateMessage.belongsTo(User, { as: 'receiverUser', foreignKey: 'receiver' });

export default PrivateMessage;
