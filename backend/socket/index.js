import { Server } from 'socket.io';
import { getOnlineUsers, toggleOnlineUser } from '../services/user.service.js';
import { handleMessages } from './message.handler.js';
import { handlePrivateMessages } from './private-message.handler.js';
import { handleUser } from './user.handler.js';

let io;

const initSocket = (server) => {
	io = new Server(server, {
		cors: {
			origin: '*',
		},
	});

	io.on('connection', (socket) => {
		console.log(`Socket ${socket.id} connected.`);

		handleUser(socket);

		handleMessages(socket);

		handlePrivateMessages(socket);

		socket.on('disconnect', async () => {
			const user = socket.handshake.auth;
			socket.broadcast
				.to('globalChatRoom')
				.emit('userDisconnectedResponse', user);

			//toggle user online
			if (user.id) await toggleOnlineUser(user.id, false);

			//send over online updated users list
			const onlineUsers = await getOnlineUsers();
			socket.in('globalChatRoom').emit('onlineUsers', onlineUsers);
		});
	});
};

export { initSocket, io };
