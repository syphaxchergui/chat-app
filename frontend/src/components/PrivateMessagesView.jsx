import React, { useEffect, useRef } from 'react';

import { Box, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

import Message from './Message';

const PrivateMessagesView = ({ messages, loading, userId }) => {
	const messagesEndRef = useRef(null);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView();
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	if (loading)
		<Box sx={{ p: 2, height: '40vh', overflowY: 'scroll' }}>
			<CircularProgress />

			<div ref={messagesEndRef} />
		</Box>;

	return (
		<Box sx={{ p: 2, height: '40vh', overflowY: 'scroll' }}>
			{messages?.map((message, index) => (
				<Message
					key={index}
					content={message?.text}
					sender={message?.senderUser}
					senderIsUser={message?.senderUser?.id === userId}
					dateTime={message?.senderUser?.createdAt}
				/>
			))}

			<div ref={messagesEndRef} />
		</Box>
	);
};

PrivateMessagesView.propTypes = {
	messages: PropTypes.array,
	loading: PropTypes.bool,
	userId: PropTypes.string,
};

export default PrivateMessagesView;
