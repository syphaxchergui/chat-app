import React from 'react';

import { Box } from '@mui/material';

import ChatToolbar from '../components/ChatToolbar';
import MessageInput from '../components/MessageInput';
import MessagesView from '../components/MessagesView';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../context/MessageContext';

const ChatView = () => {
	const { messages, loading, actions } = useMessages();

	const { user, actions: authActions } = useAuth();

	return (
		<>
			<Box sx={{ height: '100vh', overflowY: 'scroll', overflowX: 'hidden' }}>
				<ChatToolbar onLogout={authActions.logout} />

				<MessagesView user={user} messages={messages} loading={loading} />

				<MessageInput
					onSendMessage={(message) => actions.handleSendMessage(message)}
					onUploadFile={(file) => actions.handleUploadFile(file)}
				/>
			</Box>
		</>
	);
};

export default ChatView;
