import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/createError.js";

export const cookieJwtAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
        console.log("Problem is unauthorized lol")
      return next(createError("Unauthorized", 401))
    }

    const secret = process.env.SECRET_KEY;
    if (!secret) {
      throw new Error("SECRET_KEY not configured");
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;

    next();
  } catch (err) {
    res.clearCookie("token");
    return next(createError("Invalid or missing token", 401))
  }
};
