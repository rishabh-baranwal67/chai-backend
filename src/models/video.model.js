import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from
"mongoose-aggregate-paginate-v2"; // Importing mongoose-aggregate-paginate-v2 for pagination support

const videoSchema = new Schema({
    videoFile: {
        type: String, // URL of the video file
        required: true,   
    },
    thumbNail: {
        type: String, // URL of the thumbnail image
        required: true
    },
    title: {
        type: String, 
        required: true,   
    },
    description: {
        type: String,
        required: true,   
    },
    duration: {
        type: Number, // Duration of the video in seconds
        required: true,   
    },
    views: {
        type: Number,
        default: 0, // Default value for views   
    },
    isPublished: {
        type: Boolean,
        default: true, // Default value for isPublished
    },
    owner: {
        type: Schema.Types.ObjectId, // Reference to the User model
        ref: {User}
    }
},
    {tiemStamps : true} // Automatically manage createdAt and updatedAt fields
)

videoSchema.plugin(mongooseAggregatePaginate); // Adding pagination plugin to the video schema
export const video =  mongoose.model("Video", videoSchema) // Export the Video model for use in other files