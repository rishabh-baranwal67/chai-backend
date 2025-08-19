import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"; // Importing jsonwebtoken for token generation
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true, // Index for faster search
    },
     email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
     fullName: {
        type: String,
        required: true,
        trim: true,
        index: true, // Index for faster search
    },
     avatar: {
        type: String, // coludinary image url 
        required: true,
    },
    coverImage: {
        type: String, // coludinary image url 
    },
    watchHistory : [{
        type: Schema.Types.ObjectId,
        ref : "Video" // Reference to the Video model
    }],
    password: {
        type: String,
        required: [true, 'Password is required'], // Custom error message if false
    },
    refreshToken: {
        type: String
    }
},
    {timestamps: true} // Automatically manage createdAt and updatedAt fields
)

userSchema.pre("save", async function (next) { // Middleware to hash password before saving
    if(!this.isModeified("password")){ // Check if the password field is modified
        return next(); // If not modified, proceed to the next middleware
    }
    this.password = bcrypt.hash(this.password, 10); // Hashing the password before saving
    next(); // Proceed to the next middleware or save operation
})

userSchema.methods.isPasswordCorrect = async function
 (password){
    return await bcrypt.compare(password, this.password)
} // Method to check if the provided password matches the hashed password

userSchema.methods.generareAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.userName,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY  // Expiry time for the access token
    }
    )
}
userSchema.methods.generareRefreshToken = function () {
      return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET, // Secret key for signing the token
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Expiry time for the refresh token
    }
    )
}


export const user = mongoose.model("User", userSchema) 