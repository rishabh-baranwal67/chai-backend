import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "///middlewares/multer.middleware.js" // to handle file upload


const router = Router();

router.route("/register").post(
    upload.fields([ // to support multiple file upload using multer middleware
        {
            name : "avatar",
            maxCount: 1
        },
        {
            name: "coverimage",
            maxCount: 1
        }
    ]),
    registerUser
    ) // POST /user/register to register a new user by hitting registerUser controller


export default router;