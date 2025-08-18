// require("dotenv").config();
import dotenv from "dotenv" // Import dotenv to load environment variables
import connectDB from "./db/index.js";
dotenv.config({         // Load environment variables from .env file
    path: './env'
});
import { app } from "./app.js"; // Import the app instance

connectDB()
.then(() => {
    app.listen(process.env.port || 8000, () => {
        console.log(`server is listening at port ${process.env.PORT || 8000}`);
    })
})
.catch((err) => {
    console.log("mongodb connection failed:", err);
})










/*
import express from "express";
const app = express();

( async() => {
    try {
        await mongoose.connect(`{process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=> {
            console.log("Error connecting to the database: ",error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`app is listening on port ${process.env.PORT}`);
        });
        } catch (error) {
        console.error("Error :",error);

        throw error;
    }
})()
*/

