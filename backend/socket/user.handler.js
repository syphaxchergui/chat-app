import { getOnlineUsers, toggleOnlineUser } from '../services/user.service.js';

export const handleUser = (socket) => {
	socket.on('userConnected', async (user) => {
		try {
			socket.join(user.id);
			socket.join('globalChatRoom');
			socket.broadcast.to('globalChatRoom').emit('userConnectedResponse', user);

			//toggle user online
			await toggleOnlineUser(user.id, true);

			//send over online updated users list
			const onlineUsers = await getOnlineUsers();
			socket.in('globalChatRoom').emit('onlineUsers', onlineUsers);
			socket.emit('onlineUsers', onlineUsers);
		} catch (error) {
			console.error(error);
			socket.emit('error', 'Error sending message');
		}
	});

	socket.on('userDisconnected', async (user) => {
		try {
			socket.broadcast
				.to('globalChatRoom')
				.emit('userDisconnectedResponse', user);

			//toggle user online
			if (user?.id) await toggleOnlineUser(user.id, false);

			//send over online updated users list
			const onlineUsers = await getOnlineUsers();
			socket.in('globalChatRoom').emit('onlineUsers', onlineUsers);
		} catch (error) {
			console.error(error);
			socket.emit('error', 'Error sending message');
		}
	});
};
