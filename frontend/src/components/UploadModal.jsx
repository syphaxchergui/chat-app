import React, { useState } from 'react';

import { UploadFileOutlined } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';

import { useMessages } from '../context/MessageContext';

const UploadModal = ({ onSubmit, onCancel }) => {
	const [selectedFile, setSelectedFile] = useState(null);
	const { uploadLoading } = useMessages();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				my: 2,
				mx: 2,
			}}
		>
			<Box
				variant='contained'
				component='label'
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					px: 2,
					py: 1,
					border: 1,
					borderColor: '#b8bcc0',
					cursor: 'pointer',
					mb: 2,
					borderRadius: 1,
					width: '100%',
					bgcolor: '#E7EBF0',
					gap: 1,
				}}
			>
				<UploadFileOutlined fontSize='large' />
				{selectedFile ? (
					<p>Selected file: {selectedFile.name}</p>
				) : (
					<p>Select a file</p>
				)}
				<input
					hidden
					accept='image/*'
					multiple
					type='file'
					onChange={(e) => setSelectedFile(e.target.files[0])}
				/>
			</Box>

			<Box
				sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}
			>
				<Button
					onClick={onCancel}
					fullWidth
					disableElevation
					variant='outlined'
				>
					Cancel
				</Button>
				<LoadingButton
					onClick={() => {
						onSubmit(selectedFile);
					}}
					loading={uploadLoading}
					fullWidth
					disableElevation
					variant='contained'
					disabled={!selectedFile}
				>
					Send
				</LoadingButton>
			</Box>
		</Box>
	);
};

UploadModal.propTypes = {
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
};

export default UploadModal;
