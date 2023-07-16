import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import ChatApp from './containers/ChatApp';
import Login from './containers/Login';
import Register from './containers/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChatsProvider } from './context/ChatsContext';
import MessageProvider from './context/MessageContext';
import NotificationProvider from './context/NotificationContext';

import './App.css';

function App() {
	const { loggedin, loading } = useAuth();

	if (loading) return <h1>loading...</h1>;

	if (!loggedin)
		return (
			<Routes>
				<Route path='/login' index element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='*' element={<Navigate to='/login' replace />} />
			</Routes>
		);

	return (
		<Routes>
			<Route path='/' index element={<ChatApp />} />
		</Routes>
	);
}

// eslint-disable-next-line react/display-name
export default () => {
	return (
		<BrowserRouter>
			<NotificationProvider>
				<AuthProvider>
					<MessageProvider>
						<ChatsProvider>
							<App />
						</ChatsProvider>
					</MessageProvider>
				</AuthProvider>
			</NotificationProvider>
		</BrowserRouter>
	);
};
