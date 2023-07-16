import React from 'react';

import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';

const OnlineUser = ({ username, isUser, onPress }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-between',
				px: 2,
				py: 1,
				border: 1,
				borderColor: '#E7EBF0',
				cursor: isUser ? 'auto' : 'pointer',
				my: 1,
				mx: 1,
				borderRadius: 1,
			}}
			onClick={() => {
				isUser ? null : onPress();
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Avatar
					sx={{
						mr: 1.5,
						width: 26,
						height: 26,
						display: { xs: 'none', sm: 'flex' },
					}}
				/>
				<Box>
					<h4 style={{ margin: 0 }}>{username}</h4>
				</Box>
			</Box>
		</Box>
	);
};

OnlineUser.propTypes = {
	username: PropTypes.string,
	onPress: PropTypes.func,
	isUser: PropTypes.bool,
};

export default OnlineUser;
