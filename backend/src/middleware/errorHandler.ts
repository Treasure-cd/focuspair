import type { ErrorRequestHandler } from "express";


interface AppError extends Error {
  statusCode?: number;
}

function isAppError(error: unknown): error is AppError {
  return (
    error instanceof Error &&
    "statusCode" in error &&
    typeof (error as AppError).statusCode === "number"
  );
}


const errorHandler: ErrorRequestHandler = (err, req, res, next ) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let stack: string | undefined;

if (isAppError(err)) {
  statusCode = err.statusCode ?? 500;
  message = err.message;
  stack = err.stack;
} else if (err instanceof Error) {
  message = err.message;
  stack = err.stack;
}else {
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
