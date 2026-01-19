import { getUserByIdentifier, createUser } from "../models/authModel.js";
import { createError } from "../utils/createError.js";
import type { Request, Response, NextFunction } from "express";
import { isValidUsername, isValidEmail, isString, isValidTimezone, minLength, validate } from "../utils/validateFields.js";
import type { FieldValidators } from "../utils/validateFields.js";
import { hashPassword } from "../utils/passwordHash.js";
import comparePasswords from "../utils/comparePasswords.js";

type PublicUser = {
  id: string;
  username: string;
};


export const createUserController = async(req: Request, res: Response, next: NextFunction) => {

    if (!req.body || Object.keys(req.body).length === 0) {
    return next(createError("Request body required", 400));
    }

    const email = req.body.email?.trim();
    const username = req.body.username?.trim();
    const timezone = req.body.timezone?.trim();
    const password = req.body.password?.trim();

    const data = {
        email,
        username,
        password,
        timezone,
    };


    
    const createUserValidators: FieldValidators = {
    email: [isString, isValidEmail],
    username: [isString, minLength(3), isValidUsername],
    password: [isString, minLength(8)],
    timezone: [isString, isValidTimezone],
    };
    
    const errors = validate(data, createUserValidators);

    if (errors) {
        console.log("Errors object:", errors);
        return next(createError("Validation error", 400, errors));
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser({email, username, timezone, passwordHash});

      res.status(201).json({
        success: true,
        user,
    });


}


export const getUserByIdentifierController = async(req: Request, res: Response, next: NextFunction) => {
    if (!req.body || Object.keys(req.body).length === 0) {
       return next(createError("Request body required", 400));
    }

    const identifier = req.body.email?.trim() || req.body.username.trim();
    const password = req.body.password?.trim();

    const data = {
        identifier,
        password,
    }

    const getUserValidator = {
        identifier: [isString],
        password: [isString, minLength(8)]
    }

    const errors = validate(data, getUserValidator);

    if (errors) return next(createError("Validation error", 400, errors));
    const user = await getUserByIdentifier(identifier);

    const isValid = comparePasswords(password, user?.password_hash);

    if (!isValid || user === null) 
        return next(createError("Invalid email, username, or password", 400));

    const publicUser: PublicUser = {
        id: user.id,
        username: user.username,
    };
    
    res.status(201).json({
        success: true,
        user: publicUser
    });


}