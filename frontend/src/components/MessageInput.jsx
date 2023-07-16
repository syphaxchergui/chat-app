import React, { useState } from 'react';

import { AddOutlined, SendOutlined } from '@mui/icons-material';
import {
	ButtonGroup,
	IconButton,
	TextField,
	Toolbar,
	Tooltip,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';

import UploadModal from './UploadModal';

const MessageInput = ({ onSendMessage, onUploadFile }) => {
	const [open, setOpen] = React.useState(false);
	const [message, setMessage] = useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleUpload = async (selectedFile) => {
		onUploadFile(selectedFile);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		onSendMessage(message);
		setMessage('');
	};

	return (
		<Toolbar
			sx={{
				px: 0.5,
				py: 2,
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
				onSubmit={onSubmit}
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
				/>
				<ButtonGroup sx={{ ml: 2, gap: 1 }}>
					<Tooltip title='Upload file'>
						<IconButton aria-label='upload-file' onClick={handleClickOpen}>
							<AddOutlined color='primary' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Send'>
						<span>
							<IconButton
								aria-label='send-message'
								type='submit'
								disabled={message.trim() === ''}
							>
								<SendOutlined color='primary' />
							</IconButton>
						</span>
					</Tooltip>
				</ButtonGroup>
			</form>
			<Dialog
				fullWidth
				maxWidth={'sm'}
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<UploadModal
					onSubmit={(selectedFile) => handleUpload(selectedFile)}
					onCancel={handleClose}
				/>
			</Dialog>
		</Toolbar>
	);
};
MessageInput.propTypes = {
	onUploadFile: PropTypes.func,
	onSendMessage: PropTypes.func,
};
export default MessageInput;
