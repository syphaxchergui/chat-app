import React from 'react';

import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';

import OnlineUser from '../components/OnlineUser';
import OnlineUsersList from '../components/OnlineUserList';
import { useAuth } from '../context/AuthContext';
import { useChats } from '../context/ChatsContext';
import { useMessages } from '../context/MessageContext';

const OnlineUsersView = () => {
	const { user } = useAuth();
	const { onlineUsers } = useMessages();
	const { actions } = useChats();

	return (
		<Box
			sx={{
				overflowY: 'scroll',
				height: '100vh',
			}}
		>
			<Toolbar
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					py: 0.5,
					backgroundColor: 'hsla(0,0%,100%,.5)',
					backdropFilter: 'blur(10px)',
					position: 'sticky',
					top: 0,
					zIndex: 2,
					borderBottom: 1,
					borderColor: '#E7EBF0',
				}}
			>
				<h3>ChatApp</h3>
			</Toolbar>

			<h4 style={{ marginTop: 8, marginBottom: 0, marginLeft: 16 }}>You</h4>
			<OnlineUser username={user?.username} isUser={true} />

			<h4 style={{ marginTop: 16, marginBottom: 8, marginLeft: 16 }}>
				Online Users ({Math.max(0, onlineUsers.length - 1)})
			</h4>

			<OnlineUsersList
				onlineUsers={onlineUsers}
				user={user}
				onUserPress={(username, id) => {
					actions.updateChat(username, id);
				}}
			/>
		</Box>
	);
};

export default OnlineUsersView;
