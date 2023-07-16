import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import PropTypes from 'prop-types';

const NotificationContext = React.createContext();

export default function NotificationProvider({ children }) {
	const [state, setState] = useState({
		open: false,
		body: '',
	});

	const success = (body) => {
		setState({ open: true, body });
	};
	const error = (body) => {
		setState({ open: true, body });
	};
	const info = (body) => {
		setState({ open: true, body });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	return (
		<NotificationContext.Provider
			value={{
				...state,
				actions: {
					error,
					success,
					info,
				},
			}}
		>
			{children}
			<Snackbar
				open={state.open}
				autoHideDuration={4000}
				onClose={handleClose}
				message={state.body}
				action={
					<React.Fragment>
						<IconButton
							size='small'
							aria-label='close'
							color='inherit'
							onClick={handleClose}
						>
							<CloseIcon fontSize='small' />
						</IconButton>
					</React.Fragment>
				}
			/>
		</NotificationContext.Provider>
	);
}

NotificationProvider.propTypes = {
	children: PropTypes.node,
};

export const useNotifications = () => React.useContext(NotificationContext);
