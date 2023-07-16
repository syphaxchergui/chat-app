import React from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@mui/material';

import { PRIMARY, PRIMARY_LIGHT } from '../../utils/colors';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

const Register = () => {
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
				<h1 style={{ marginBottom: '2rem' }}>Create your account</h1>

				<AuthForm
					onSubmit={(username, password) =>
						actions.registerWithUsernameAndPassword({ username, password })
					}
					buttonTitle='Create'
				/>
				<p>
					Already a member,{' '}
					<Link to='/login' style={{ color: PRIMARY }}>
						Login !
					</Link>
				</p>
			</Box>
		</Box>
	);
};

export default Register;
