import React from 'react';

import PropTypes from 'prop-types';

import PrivateChat from './PrivateChat';

const PrivateChatList = ({ chats }) => {
	return chats.map((chat, i) => (
		<PrivateChat
			key={i}
			name={chat.name}
			id={chat.receiverId}
			index={i}
			newMessage={chat.newMessages}
			messages={chat.messages}
		/>
	));
};

PrivateChatList.propTypes = {
	chats: PropTypes.array,
};

export default PrivateChatList;
