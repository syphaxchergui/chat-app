import {
	createPrivateMessage,
	getAllPrivateMessages,
} from '../services/private-message.service.js';

export const handlePrivateMessages = (socket) => {
	const user = socket.handshake.auth;

	socket.on('privateMessage', async (message) => {
		try {
			await createPrivateMessage({
				sender: user.id,
				receiver: message.receiverId,
				text: message.content,
			});

			const messages = await getAllPrivateMessages(user.id, message.receiverId);

			//send an alert to the receiver
			socket.to(message.receiverId).emit('privateMessageAlert', {
				notificationMessage: `${user.username} sent: ${message.content}`,
				receiverId: user.id,
				name: user.username,
				messages,
			});

			socket.emit('privateMessageResponse', {
				messages,
				sender: user.id,
				senderName: user.username,
				receiver: message.receiverId,
				receiverUsername: message.receiverUsername,
			});
		} catch (error) {
			console.error(error);
			socket.emit('error', 'Error sending message');
		}
	});
};
