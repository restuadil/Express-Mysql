import mysql from 'mysql';
import dotenv from "dotenv";
import { logger } from './logger.js';
dotenv.config();

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
    if (err) {
        console.log(err);
        logger.error(err);
        return;
    }
    logger.info("MYSQL Connected");
})



export default db