export interface AppError extends Error {
  statusCode: number;
  errors?: Record<string, string>;
}

export function createError(
  message: string,
  statusCode: number,
  errors?: Record<string, string>
): AppError {
  const err = new Error(message) as AppError;
  err.statusCode = statusCode;
  if (errors) err.errors = errors;
  return err;
}

