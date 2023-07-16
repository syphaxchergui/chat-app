import React, { useEffect } from 'react';

import { Grid } from '@mui/material';

import { useAuth } from '../context/AuthContext';
import { useChats } from '../context/ChatsContext';
import { useMessages } from '../context/MessageContext';
import ChatView from './ChatView';
import OnlineUsersView from './OnlineUsersView';
import PrivateChatList from './PrivateChatList';

const ChatApp = () => {
	const { user } = useAuth();
	const { chats } = useChats();
	const { socket, actions } = useMessages();

	useEffect(() => {
		socket.auth = user;
		socket.connect();
		actions.getHistory();
	}, []);

	return (
		<>
			<Grid container sx={{ height: '100vh' }}>
				<Grid item xs={3}>
					<OnlineUsersView />
				</Grid>
				<Grid item xs={9}>
					<ChatView />
				</Grid>
			</Grid>
			<PrivateChatList chats={chats} />
		</>
	);
};

export default ChatApp;
