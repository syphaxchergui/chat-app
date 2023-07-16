import React, { useState } from 'react';

import { Button, FormControl, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const AuthForm = ({ onSubmit, buttonTitle }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(username, password);
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormControl fullWidth>
				<TextField
					required
					label='Username'
					variant='standard'
					value={username}
					margin='dense'
					//   error={usernameError}
					//   helperText={usernameError ? "Username is required" : ""}
					onChange={(event) => setUsername(event.target.value)}
				/>
			</FormControl>
			<FormControl fullWidth>
				<TextField
					required
					label='Password'
					variant='standard'
					type='password'
					value={password}
					margin='dense'
					//   error={passwordError}
					//   helperText={passwordError ? "Password is required" : ""}
					onChange={(event) => setPassword(event.target.value)}
				/>
			</FormControl>
			<Button
				disableElevation
				type='submit'
				fullWidth
				variant='contained'
				sx={{ mt: 5, mb: 3 }}
			>
				{buttonTitle}
			</Button>
		</form>
	);
};

AuthForm.propTypes = {
	onSubmit: PropTypes.func,
	buttonTitle: PropTypes.string,
};

export default AuthForm;
