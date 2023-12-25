import { logger } from "../Utils/logger.js";

export const logMiddleware = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
}