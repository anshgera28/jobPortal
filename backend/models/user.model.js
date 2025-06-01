import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: true
    },
    profile: {
        bio: {
            type: String,
        },
        location: {
            type: String
        },
        skills: [{ type: String }],
        resume: {
            type: String
        },
        resumeOriginalName: {
            type: String
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"
        },
        profilePhoto: {
            type: String,
            default: ""
        }
    },
    timestamps: true
});

export const User = mongoose.model("User", UserSchema);