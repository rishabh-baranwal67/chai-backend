import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser" //for accessing and setting cookies of user fetch via user's server browser

const app = express()

app.use(cors({
   origin: process.env.CORS_ORIGIN,
   credentials: true // Allow credentials to be sent with requests  
}))

app.use(express.json({limit: "16kb"})) // Set a limit for JSON payloads
app.use(express.urlencoded({extended: true, limit: "16kb"})) // Parse URL-encoded bodies
app.use(express.static("public")) // Serve static files(pdf, images, videos etc) from the "public" directory
app.use(cookieParser()) // Parse cookies from incoming requests


// routes would be added here
import userRouter from './routes/user.routes.js'


// routes declaration
app.use("/api/v1/user", userRouter) // All user-related routes will be prefixed with /user

//  /user will treat as a prefix for all user routes that is http://localhost:8000/api/v1/user/_____

export { app } // Export the app instance for use in other files