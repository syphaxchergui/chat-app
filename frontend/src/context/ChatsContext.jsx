import React, { useEffect, useLayoutEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { socket } from '../../utils/sockets';
import useToken from '../hooks/useToken';
import { getPrivateMessages } from '../services/message.service';
import { useNotifications } from './NotificationContext';

const initialState = {
	chats: [],
};

const ChatsContext = React.createContext(initialState);

export const ChatsProvider = ({ children }) => {
	const [state, setState] = useState(initialState);
	const [storedChats, storeChats] = useToken('_chats');

	const { actions: notify } = useNotifications();

	useEffect(() => {
		storeChats({ chats: [...state.chats] });
	}, [state.chats]);

	useLayoutEffect(() => {
		if (storedChats?.chats) setState({ chats: [...storedChats.chats] });
	}, []);

	useEffect(() => {
		socket.on('privateMessageResponse', (data) => {
			updateChatNewMessage(data.receiverUsername, data.receiver, data.messages);
		});

		socket.on('privateMessageAlert', (data) => {
			notify.info(data.notificationMessage);
			updateChatNewMessage(data.name, data.receiverId, data.messages);
		});
	}, [socket]);

	const updateChat = async (name, receiverId) => {
		const privateMessages = await getPrivateMessages(receiverId);
		if (privateMessages.data.success)
			setState({
				chats: [
					...state.chats.filter((c) => c.name != name),
					{
						name,
						receiverId,
						newMessages: false,
						messages: privateMessages.data.privateMessages,
					},
				],
			});
	};

	const updateChatNewMessage = async (name, receiverId, messages) => {
		console.log('after ', state.chats);
		setState({
			chats: [
				...state.chats.filter((c) => c.name != name),
				{
					name,
					receiverId,
					newMessages: false,
					messages: messages,
				},
			],
		});
	};

	const updateMessages = async (id, newMessages) => {
		const chat = state.chats.filter((c) => c.receiverId == id);
		if (chat.length > 0)
			setState({
				chats: [
					...state.chats.filter((c) => c.receiverId != id),
					{
						...chat[0],
						messages: newMessages,
					},
				],
			});
	};

	const removeChat = async (name) => {
		setState({
			chats: [...state.chats.filter((c) => c.name != name)],
		});
	};

	const getHistory = async (id) => {
		try {
			const privateMessages = await getPrivateMessages(id);
			if (privateMessages.data.success)
				updateMessages(id, privateMessages.data.privateMessages);
		} catch (err) {
			console.log(err);
		}
	};

	const sendPrivateChatMessage = (id, username, message) => {
		socket.emit('privateMessage', {
			receiverId: id,
			receiverUsername: username,
			content: message,
		});
	};

	return (
		<ChatsContext.Provider
			value={{
				...state,
				actions: {
					updateChat,
					updateChatNewMessage,
					removeChat,
					getHistory,
					sendPrivateChatMessage,
				},
			}}
		>
			{children}
		</ChatsContext.Provider>
	);
};

ChatsProvider.propTypes = {
	children: PropTypes.node,
};

// Hook to be able to access this context
export const useChats = () => React.useContext(ChatsContext);
