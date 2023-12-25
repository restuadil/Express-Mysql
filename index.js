import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import { logger } from './src/Utils/logger.js';
import { routes } from './src/routes/index.js';
import { logMiddleware } from './src/middleware/logMiddleware.js';
import deserializedToken from './src/middleware/deserializedToken.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

app.use(logMiddleware)
app.use(deserializedToken)

routes(app)



app.listen(PORT, () => {
    logger.info(`Server berjalan di http://localhost:${PORT}`);
})