import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser) // POST /user/register to register a new user by hitting registerUser controller


export default router;