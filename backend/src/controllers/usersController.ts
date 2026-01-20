import { Request, Response, NextFunction } from "express"
import { createError } from "../utils/createError.js"
import { findUserById } from "../models/usersModel.js";

interface AuthUser {
  sub: string;
}

export const getMe = async(req: Request, res: Response, next: NextFunction) => {
    try {
    if (!req.user) {
        console.log("Problem is no user, req.user failed")
        return next(createError("Unauthorized", 401));
    }

    const { sub: userId } = req.user as AuthUser;


    if (!userId) {
        console.log("Problem is no user Id")
        return next(createError("Id not found", 401))
    }
    const user = await findUserById(userId) 

    if (!user) {
    
      return next(createError("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.created_at,
        timezone: user.timezone,
      },
    });
} catch (err) {
    next(err);
}
}