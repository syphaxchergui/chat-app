import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { socket } from '../../utils/sockets';
import { getAllMessages, uploadFile } from '../services/message.service';

const initialState = {
	socket: socket,
	loading: false,
	uploadLoading: false,
	onlineUsers: [],
	messages: [],
	error: '',
};

const MessageContext = React.createContext(initialState);

export default function MessageProvider({ children }) {
	const [state, setState] = useState(initialState);
	const [onlineUsers, setOnlineUsers] = useState([]);

	useEffect(() => {
		handleMessages();
		handleOnlineUsers();
	}, [state.socket]);

	const handleMessages = () => {
		state.socket.on('message', (messages) => {
			setState({ ...state, loading: false, messages });
		});
	};

	const handleOnlineUsers = () => {
		state.socket.on('onlineUsers', (onlineUsers) => {
			setOnlineUsers(onlineUsers);
		});
	};

	const handleSendMessage = (message) => {
		socket.emit('message', {
			content: message,
		});
	};

	const handleUploadFile = async (file) => {
		try {
			setState({ ...state, uploadLoading: true });
			await uploadFile(file);
			setState({ ...state, uploadLoading: false });
		} catch (err) {
			console.log(err);
			setState({ ...state, uploadLoading: false, error: err.message });
		}
	};

	const getHistory = async () => {
		try {
			setState({ ...state, loading: true });
			const res = await getAllMessages();
			if (res.data.success)
				setState({ ...state, messages: res.data.messages, loading: false });
			else setState({ ...state, loading: false, error: res.data.message });
		} catch (error) {
			console.log(error);
			setState({ ...state, loading: false, error: error.message });
		}
	};

	return (
		<MessageContext.Provider
			value={{
				...state,
				onlineUsers,
				actions: {
					handleSendMessage,
					handleUploadFile,
					getHistory,
				},
			}}
		>
			{children}
		</MessageContext.Provider>
	);
}

MessageProvider.propTypes = {
	children: PropTypes.node,
};

export const useMessages = () => React.useContext(MessageContext);
