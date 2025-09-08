import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/ApiError.js " // to handle custom error 
import {user, User} from "../models/user.model.js"
import {uploadOncloudinary} from "../utils/cloudinary.js" // to upload files on cloudinary
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validate user detail

    const {fullname, username, email, password} =  req.body;
    console.log("email: ", email);
    if(!fullname || !username || !email || !password){
        throw new apiError("All fields are required", 400) // 400 bad request 
    }
    const existedUser =  User.findOne({
        $or: [{usrname}, {email}]
    })

    if (existedUser) {
        throw new apiError(409,  "Username or email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path; // Accessing the avatar file path
    const coverImageLocalPath = req.files?.coverimage[0]?.path; // Accessing the cover image file path 

    if(!avatarLocalPath){
        throw new apiError(400, "Avatar is required")
    }

    const avatar = await uploadOncloudinary(avatarLocalPath)
    const coverImage = await uploadOncloudinary(coverImageLocalPath)

    if(!avatar){
        throw new apiError(400, "file is requierd")
    }

    const user =  await User.create({
        fullname,
        avatar: avatar.url ,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password
    })

    const createdUSer =  await User.findBYId(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUSer){
        throw new apiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUSer, "User registered successfully")
    )


    })

export {registerUser}