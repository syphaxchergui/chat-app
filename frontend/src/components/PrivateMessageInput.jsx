import React, { useState } from 'react';

import { SendOutlined } from '@mui/icons-material';
import { IconButton, TextField, Toolbar } from '@mui/material';
import PropTypes from 'prop-types';

const PrivateMessageInput = ({ onSubmit }) => {
	const [message, setMessage] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(message);
		setMessage('');
	};
	return (
		<Toolbar
			sx={{
				backgroundColor: 'hsla(0,0%,100%,.5)',
				backdropFilter: 'blur(10px)',
				position: 'sticky',
				bottom: 0,
				zIndex: 2,
				borderTop: 1,
				borderColor: '#E7EBF0',
			}}
		>
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: '100%',
				}}
			>
				<TextField
					fullWidth
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder='Aa'
					name='message'
					size='small'
				/>

				<IconButton
					sx={{ ml: 1 }}
					aria-label='send-private-message'
					type='submit'
					disabled={message.trim() === ''}
				>
					<SendOutlined color='primary' />
				</IconButton>
			</form>
		</Toolbar>
	);
};

PrivateMessageInput.propTypes = {
	onSubmit: PropTypes.func,
};

export default PrivateMessageInput;
