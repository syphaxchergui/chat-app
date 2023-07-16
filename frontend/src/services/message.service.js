import { apiServiceWithToken } from './api.service';

export const getAllMessages = () => {
	return apiServiceWithToken.get('/messages/');
};

export const getPrivateMessages = (receiverId) => {
	return apiServiceWithToken.get('/messages/private', {
		params: { receiverId },
	});
};

export const uploadFile = (selectedFile) => {
	let data = new FormData();
	data.append('file', selectedFile);
	const config = {
		headers: { 'content-type': 'multipart/form-data' },
	};
	return apiServiceWithToken.post('/messages/upload', data, config);
};
