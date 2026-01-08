import type { Request, Response, NextFunction } from "express";

export interface HandlerTypes {
    err?: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
}

export interface AppError extends Error {
  statusCode?: number;
}