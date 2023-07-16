import { createMessage, getAllMessages } from '../services/message.service.js';

export const handleMessages = (socket) => {
	const user = socket.handshake.auth;

	socket.on('message', async (message) => {
		try {
			await createMessage({
				sender: user.id,
				text: message.content,
			});

			const messages = await getAllMessages();

			socket.to('globalChatRoom').emit('message', messages);
			socket.emit('message', messages);
		} catch (error) {
			console.error(error);
			socket.emit('error', 'Error sending message');
		}
	});

	socket.on('fileMessage', async (message) => {
		console.log('creation');
		try {
			await createMessage({
				sender: user.id,
				text: message.content,
				file: message.file,
			});

			const messages = await getAllMessages();

			socket.to('globalChatRoom').emit('message', messages);
			socket.emit('message', messages);
		} catch (error) {
			console.error(error);
			socket.emit('error', 'Error sending message');
		}
	});
};
