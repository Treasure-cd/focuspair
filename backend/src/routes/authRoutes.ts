import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { createUserController } from "../controllers/authController.js";


const router = express.Router();


router.post("/login", asyncHandler(createUserController));


export default router