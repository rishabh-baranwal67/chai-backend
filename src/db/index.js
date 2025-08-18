import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async() => { // use async for handle the situation when the db is another continent
    try {
        const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // we store the object returned by mongoose in a variable
        console.log(`\n MongoDB coneceted !! DB Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("mongodb connection Error:", error);
        throw error;
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB; // export the function to use it in other files