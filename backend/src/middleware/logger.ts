import type { HandlerTypes } from "../types/handlerTypes.js";

const logger = ({req, res, next}: HandlerTypes) => {
    console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`);
    next();
}

export default logger;