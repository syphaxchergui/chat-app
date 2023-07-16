import React from 'react';

import PersonOffIcon from '@mui/icons-material/PersonOff';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';

import OnlineUser from '../components/OnlineUser';

const OnlineUsersList = ({ onlineUsers, user, onUserPress }) => {
	return (
		<Box>
			{onlineUsers.length === 1 ? (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						px: 2,
						py: 1,
						border: 1,
						borderColor: '#E7EBF0',
						my: 1,
						mx: 1,
						borderRadius: 1,
					}}
				>
					<PersonOffIcon fontSize='large' />
				</Box>
			) : (
				onlineUsers
					.filter((u) => u.id != user.id)
					?.map((u, index) => (
						<OnlineUser
							key={index}
							username={u?.username}
							isUser={false}
							userId={user.id}
							onPress={() => onUserPress(u?.username, u?.id)}
						/>
					))
			)}
		</Box>
	);
};
OnlineUsersList.propTypes = {
	onlineUsers: PropTypes.array,
	user: PropTypes.object,
	onUserPress: PropTypes.func,
};
export default OnlineUsersList;
