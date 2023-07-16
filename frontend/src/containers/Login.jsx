import React from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@mui/material';

import { PRIMARY, PRIMARY_LIGHT } from '../../utils/colors';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

const Login = () => {
	const { actions } = useAuth();
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-around',
				height: '100vh',
				bgcolor: PRIMARY_LIGHT,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					justifyContent: 'space-around',
					width: 500,
					px: 5,
					py: 3,
					bgcolor: '#fff',
					borderRadius: 2,
				}}
			>
				<h1 style={{ marginBottom: '2rem' }}>Login to Chat App</h1>

				<AuthForm
					onSubmit={(username, password) =>
						actions.loginWithUsernameAndPassword({ username, password })
					}
					buttonTitle='Login'
				/>
				<p>
					Not a member,{' '}
					<Link to='/register' style={{ color: PRIMARY }}>
						Register !
					</Link>
				</p>
			</Box>
		</Box>
	);
};

export default Login;
