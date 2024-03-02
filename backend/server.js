import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './docs/swagger.js';
import sequelize from './utils/db.js';
import { initSocket } from './socket/index.js';
import fetch from 'cross-fetch';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

//init socket io
initSocket(server);

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.all('*', () => {
	throw new Error('Bad request');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	if (err.message === 'Bad request') {
		res.status(400).json({ success: false, message: 'Bad request.' });
	}
});


//connect to db
sequelize
	.sync()
	.then(() => {
		console.log('Connection to database has been established successfully.');
		server.listen(port, () => {
			console.log(`Server listening on port ${port}.`);
		});
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error);
	});
