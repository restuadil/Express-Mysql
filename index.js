import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { logger } from './src/Utils/logger.js';
import { routes } from './src/routes/index.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server berjalan di http://localhost:${PORT}`);
})
app.get('/', (req, res) => {
    res.send('Hello World!');
})

routes(app)




