import React from 'react';

import { LogoutOutlined } from '@mui/icons-material';
import { IconButton, Toolbar, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

const ChatToolbar = ({ onLogout }) => {
	return (
		<Toolbar
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				px: 1,
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
			<h3>Global Chat Room</h3>
			<Tooltip title='Logout'>
				<IconButton onClick={onLogout}>
					<LogoutOutlined color={'primary'} />
				</IconButton>
			</Tooltip>
		</Toolbar>
	);
};

ChatToolbar.propTypes = {
	onLogout: PropTypes.func,
};
export default ChatToolbar;
