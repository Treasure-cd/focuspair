import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { createUserController, getUserByIdentifierController } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", asyncHandler(createUserController));
router.post("/login", asyncHandler(getUserByIdentifierController))


export default router