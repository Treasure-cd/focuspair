import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { createUserController } from "../controllers/authController.js";

console.log("🔥 AUTH ROUTES LOADED");


const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World")
})

router.post("/register", asyncHandler(createUserController));


export default router