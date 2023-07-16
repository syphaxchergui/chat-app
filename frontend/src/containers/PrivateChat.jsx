import React from 'react';

import { Close } from '@mui/icons-material';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
} from '@mui/material';
import Badge from '@mui/material/Badge';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';

import { PRIMARY_LIGHT } from '../../utils/colors';
import PrivateMessageInput from '../components/PrivateMessageInput';
import PrivateMessagesView from '../components/PrivateMessagesView';
import { useAuth } from '../context/AuthContext';
import { useChats } from '../context/ChatsContext';

const PrivateChat = ({ name, id, index, newMessage, messages }) => {
	const { actions } = useChats();
	const { user } = useAuth();

	return (
		<Accordion
			disableGutters
			sx={{
				position: 'absolute',
				top: 0,
				right: index * 270 + 40,
				zIndex: 10,
				width: 260,
			}}
		>
			<AccordionSummary
				aria-controls={`panel-content`}
				id={`panel-header`}
				sx={
					newMessage
						? { bgcolor: PRIMARY_LIGHT, boxShadow: 2 }
						: { boxShadow: 1 }
				}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Avatar
							sx={{
								mr: 1.5,
								width: 26,
								height: 26,
								display: { xs: 'none', sm: 'flex' },
							}}
						/>

						<Badge color='primary' variant='dot' invisible={!newMessage}>
							<Box sx={{ pr: 0.5, mt: -0.3 }}>
								<h4 style={{ margin: 0 }}>{name}</h4>
							</Box>
						</Badge>
					</Box>
					<Close fontSize={'small'} onClick={() => actions.removeChat(name)} />
				</Box>
			</AccordionSummary>
			<AccordionDetails sx={{ p: 0 }}>
				<PrivateMessagesView messages={messages} userId={user.id} />

				<PrivateMessageInput
					onSubmit={(message) =>
						actions.sendPrivateChatMessage(id, name, message)
					}
				/>
			</AccordionDetails>
		</Accordion>
	);
};

PrivateChat.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	index: PropTypes.number,
	newMessage: PropTypes.bool,
	messages: PropTypes.array,
};

export default PrivateChat;
