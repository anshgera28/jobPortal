import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, password, role, phoneNumber } = req.body;
        console.log("=== Registration Request ===");
        console.log("Full request body:", req.body);
        console.log("Email:", email);
        console.log("Role:", role);

        if(!fullname || !email || !password || !role || !phoneNumber) {
            console.log("Missing required fields");
            return res.status(400).json({ message: "All fields are required", success: false });
        };

        // Validate role
        const validRoles = ["user", "admin", "recruiter"];
        console.log("Valid roles:", validRoles);
        console.log("Role validation result:", validRoles.includes(role));

        if (!validRoles.includes(role)) {
            console.log("Invalid role provided:", role);
            return res.status(400).json({
                message: `Invalid role: '${role}'. Role must be either 'user', 'admin', or 'recruiter'`,
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        console.log("Existing user check:", existingUser ? "User exists" : "No user found");

        if(existingUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed successfully");

        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            role,
            phoneNumber,
        });
        console.log("New user created successfully:", newUser.email);
        return res.status(200).json({ message: "User registered successfully", success: true });
    } catch (error) {
        console.error("=== Registration Error ===");
        console.error("Error details:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation error: " + Object.values(error.errors).map(err => err.message).join(', '),
                success: false
            });
        }
        return res.status(500).json({
            message: "Internal server error: " + error.message,
            success: false
        });
    }
};

export const login = async (req, res) => {
    try{
        const {email, password, role} = req.body;
        console.log("=== Login Request ===");
        console.log("Full request body:", req.body);
        console.log("Email:", email);
        console.log("Role:", role);

        if(!email || !password || !role) {
            console.log("Missing required fields");
            return res.status(400).json({ message: "All fields are required", success: false });
        };

        let user = await User.findOne({ email });
        console.log("User found in database:", user ? {
            email: user.email,
            role: user.role,
            hasPassword: !!user.password
        } : "No user found");

        if(!user) {
            console.log("No user found with email:", email);
            return res.status(400).json({ message: "Incorrect email or password", success: false });
        };

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        console.log("Password comparison result:", isPasswordMatched);
        console.log("User role in DB:", user.role);
        console.log("Requested role:", role);
        console.log("Role match:", user.role === role);

        if(!isPasswordMatched) {
            console.log("Password did not match");
            return res.status(400).json({ message: "Incorrect email or password", success: false });
        };

        if(user.role !== role) {
            console.log("Role mismatch - DB role:", user.role, "Requested role:", role);
            return res.status(400).json({ message: "Account does not exist with this role", success: false });
        };

        const tokenData = {
            userId: user._id
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Create user response object with all user information
        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            profile: {
                bio: user.profile.bio || "",
                location: user.profile.location || "",
                skills: user.profile.skills || [],
                resume: user.profile.resume || "",
                resumeOriginalName: user.profile.resumeOriginalName || "",
                company: user.profile.company || null,
                profilePhoto: user.profile.profilePhoto || ""
            },
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return res.status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                success: true,
                user: userResponse,
                token: token // Including token in response for frontend storage if needed
            });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

export const logout = async (req, res) => {
    try{
        return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true, secure: true, sameSite: "strict" }).json({ message: "Logout successful", success: true });

    }catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id;  // This comes from the isAuthenticated middleware

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Update only the fields that are provided
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) {
            const skillsArray = skills.split(",").map(skill => skill.trim());
            user.profile.skills = skillsArray;
        }

        await user.save();

        // Create response object with updated user data
        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            profile: {
                bio: user.profile.bio || "",
                location: user.profile.location || "",
                skills: user.profile.skills || [],
                resume: user.profile.resume || "",
                resumeOriginalName: user.profile.resumeOriginalName || "",
                company: user.profile.company || null,
                profilePhoto: user.profile.profilePhoto || ""
            },
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: updatedUser
        });

    } catch (error) {
        console.error("Profile update error:", error);
        return res.status(500).json({
            message: "Error updating profile",
            success: false,
            error: error.message
        });
    }
};
