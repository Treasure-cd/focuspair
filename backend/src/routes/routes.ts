import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { createUserController, getUserByIdentifierController } from "../controllers/authController.js";
import { getMe } from "../controllers/usersController.js";
import { cookieJwtAuth } from "../middleware/cookieJwtAuth.js";


const router = express.Router();

router.post("/auth/register", asyncHandler(createUserController));
router.post("/auth/login", asyncHandler(getUserByIdentifierController));
router.get("/users/me", cookieJwtAuth, asyncHandler(getMe))


export default router