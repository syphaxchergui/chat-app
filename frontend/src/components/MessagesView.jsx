import React, { useEffect, useRef } from 'react';

import { Box, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

import Message from './Message';

const MessagesView = ({ messages, loading, user }) => {
	const messagesEndRef = useRef(null);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView();
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	if (loading)
		return (
			<Box
				sx={{
					p: 2.5,
					minHeight: '80vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<CircularProgress />
			</Box>
		);

	if (!messages.length)
		return (
			<Box
				sx={{
					p: 2.5,
					minHeight: '80vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<h3>No messages yet !</h3>
			</Box>
		);

	return (
		<Box sx={{ p: 2.5, minHeight: '80vh' }}>
			{messages?.map((message, index) => (
				<Message
					key={index}
					content={message?.text}
					sender={message?.senderUser}
					senderIsUser={message?.senderUser?.id === user?.id}
					prevSender={
						index === 0 ? 'random_id' : messages[index - 1]?.senderUser?.id
					}
					file={message?.file}
				/>
			))}

			<div ref={messagesEndRef} />
		</Box>
	);
};

MessagesView.propTypes = {
	messages: PropTypes.array,
	loading: PropTypes.bool,
	user: PropTypes.object,
};

export default MessagesView;
