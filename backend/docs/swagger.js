export default {
	openapi: '3.0.0',
	info: {
		title: 'Chat app',
		version: '1.0.0',
	},
	servers: [
		{
			url: 'http://localhost:5000',
		},
	],
	tags: [
		{
			name: 'auth',
		},
		{
			name: 'messages',
		},
	],
	paths: {
		'/api/auth/register': {
			post: {
				tags: ['auth'],
				summary: 'Registration',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'object',
								example: {
									username: 'syphax',
									password: 'password',
								},
							},
						},
					},
				},
				responses: {
					200: {
						description: 'Successful response',
						content: {
							'application/json': {},
						},
					},
				},
			},
		},
		'/api/auth/login': {
			post: {
				tags: ['auth'],
				summary: 'Login',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'object',
								example: {
									username: 'syphax',
									password: 'password',
								},
							},
						},
					},
				},
				responses: {
					200: {
						description: 'Successful response',
						content: {
							'application/json': {},
						},
					},
				},
			},
		},
		'/api/messages/': {
			get: {
				tags: ['messages'],
				summary: 'Get stored messages',
				parameters: [
					{
						name: 'x-access-token',
						in: 'header',
						schema: {
							type: 'string',
						},
						example:
							'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN5cGhheCIsImlhdCI6MTY3OTkxNjIyOH0.P77CzQQx2lPhMeZ2uHKHbVMRn_eRtAi4ERiO56sy7ag',
					},
				],
				responses: {
					200: {
						description: 'Successful response',
						content: {
							'application/json': {},
						},
					},
				},
			},
		},
		'/api/messages/private': {
			get: {
				tags: ['messages'],
				summary: 'Get stored private conversation messages',
				parameters: [
					{
						name: 'x-access-token',
						in: 'header',
						schema: {
							type: 'string',
						},
						example:
							'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN5cGhheCIsImlhdCI6MTY3OTkxNjIyOH0.P77CzQQx2lPhMeZ2uHKHbVMRn_eRtAi4ERiO56sy7ag',
					},
					{
						name: 'senderId',
						in: 'query',
						schema: {
							type: 'string',
						},
						example: '354f5d88-c9ed-4fe5-ad5e-fe88f76292f5',
					},
					{
						name: 'receiverId',
						in: 'query',
						schema: {
							type: 'string',
						},
						example: '328c5005-6585-44e7-b6b8-1f22d3a2fb81',
					},
				],
				responses: {
					200: {
						description: 'Successful response',
						content: {
							'application/json': {},
						},
					},
				},
			},
		},
		'/api/messages/upload': {
			post: {
				tags: ['messages'],
				summary: 'Upload file',
				requestBody: {
					content: {
						'multipart/form-data': {
							schema: {
								type: 'object',
								properties: {
									file: {
										type: 'string',
										format: 'binary',
									},
								},
							},
						},
					},
				},
				parameters: [
					{
						name: 'x-access-token',
						in: 'header',
						schema: {
							type: 'string',
						},
						example:
							'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN5cGhheCIsImlhdCI6MTY3OTkxNjIyOH0.P77CzQQx2lPhMeZ2uHKHbVMRn_eRtAi4ERiO56sy7ag',
					},
				],
				responses: {
					200: {
						description: 'Successful response',
						content: {
							'application/json': {},
						},
					},
				},
			},
		},
	},
};
