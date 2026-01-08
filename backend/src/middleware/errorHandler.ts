import type { HandlerTypes } from "../types/handlerTypes.js";
import type { AppError } from "../types/handlerTypes.js";

const errorHandler = ({ err, req, res, next }: HandlerTypes) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let stack: string | undefined;

  if (err instanceof Error) {
    const appErr = err as AppError;

    statusCode = appErr.statusCode ?? 500;
    message = appErr.message;
    stack = appErr.stack;

    console.error(appErr.stack);
  } else {
    console.error("Unknown error:", err);
  }

  if (res.headersSent) {
    return next(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : stack,
  });
};

export default errorHandler;
