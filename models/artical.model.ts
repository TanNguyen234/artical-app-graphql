import mongoose from "mongoose";

const articalSchema = new mongoose.Schema(
    {
        title: String,
        avatar: String,
        description: String,
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date
    },{
        timestamps: true
    }
)

const Artical = mongoose.model("Artical", articalSchema, 'articals')

export default Artical;