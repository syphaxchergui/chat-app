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

import Replicate from 'replicate';

dotenv.config();

const REPLICATE_API_TOKEN = 'r8_I37KqYhiAEzdYrlwrPDGo9AGWPai25O4YZY3q';

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

app.get('/chroma', async (req, res) => {
	try {
		const userQuery = req.query?.q;

		

		console.log('started');

		const output = await replicate.run(
			'mcai/deliberate-v2:8e6663822bbbc982648e3c34214cf42d29fe421b2620cc33d8bda767fc57fe5a',
			{
				input: {
					prompt: `Colorless ${userQuery} for coloring book, less details, high quality, clear image, coloring page, colorless, black and white, line art, vector file, white background, adult coloring book, coloring book page, fit in page, large areas`,
					negative_prompt:
						'((watermark)), (text), color, shading, gradient, shadows, transparency, noisy, blurred',
				},
			}
		);

		return res.status(200).json({ success: true, url: output[0] });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error });
	}
});

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

let replicate;
//connect to db
sequelize
	.sync()
	.then(() => {
		console.log('Connection to database has been established successfully.');
		server.listen(port, () => {
			console.log(`Server listening on port ${port}.`);
			replicate = new Replicate({
				auth: REPLICATE_API_TOKEN,
				fetch: fetch,
			});
		});
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error);
	});
