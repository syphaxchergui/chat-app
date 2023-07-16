import React from 'react';

import { Box } from '@mui/system';
import PropTypes from 'prop-types';

import { PRIMARY, PRIMARY_LIGHT } from '../../utils/colors';

const Message = ({ sender, content, senderIsUser, prevSender, file }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: senderIsUser ? 'flex-end' : 'flex-start',
				justifyContent: 'flex-start',
			}}
		>
			{prevSender !== sender.id ? (
				<p
					style={{
						marginRight: 8,
						marginBottom: -5,
						marginTop: 8,
						marginLeft: 8,

						fontSize: '0.7rem',
					}}
				>
					{senderIsUser ? 'You' : sender.username}{' '}
				</p>
			) : null}

			{file ? (
				<Box
					sx={{
						px: 1,
						py: 1,
						borderRadius: 1,
						bgcolor: senderIsUser ? PRIMARY : PRIMARY_LIGHT,
						minWidth: 200,
						maxWidth: '70%',
						color: senderIsUser ? '#fff' : '#000',
						mt: 0.5,
					}}
				>
					<img
						src={file}
						alt='message'
						style={{ height: 200, width: 'auto', marginTop: 6 }}
					/>
				</Box>
			) : (
				<Box
					sx={{
						px: 2,
						py: 0.5,
						borderRadius: 1,
						bgcolor: senderIsUser ? PRIMARY : PRIMARY_LIGHT,
						minWidth: 120,
						maxWidth: '70%',
						color: senderIsUser ? '#fff' : '#000',
						mt: 0.5,
					}}
				>
					<p style={{ margin: 0 }}>{content}</p>
				</Box>
			)}
		</Box>
	);
};

Message.propTypes = {
	sender: PropTypes.object,
	content: PropTypes.string,
	senderIsUser: PropTypes.bool,
	prevSender: PropTypes.string,
	file: PropTypes.string,
};

export default Message;
