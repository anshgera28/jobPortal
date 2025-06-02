
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullname, email, password, role, phoneNumber } = req.body;
        if(!fullname || !email || !password || !role || !phoneNumber) {
            return res.status(400).json({ message: "All fields are required", success: false });
        };
        const user  = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message: "User already exists", success: false });
        };
        const hashedPassword = await bcrypt.hash(password, 10);

       await User.create({
            fullname,
            email,
            password: hashedPassword,
            role,
            phoneNumber,

        });
        return res.status(200).json({ message: "User registered successfully", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
export const login = async (req, res) => {
    try{
        const {email, password, role} = req.body;
        if(!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        };
        let  user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Incorrect email or password", success: false });
        };
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched) {
            return res.status(400).json({ message: "Incorrect email or password", success: false });
        };

        //check role is correct or not
        if(user.role !== role) {
            return res.status(400).json({ message: "Account does not exist with this role", success: false });
        };
       const tokenData = {
        userId: user._id
       };
       const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
       user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        profile: user.profile
       }
       return res.status(200).cookie("token", token,{maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "strict"}).json({ message: `Welcome back ${user.fullname}`, success: true });
      
       
    } catch (error) {
        console.log(error);
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
    try{
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;
        if(!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({ message: "All fields are required", success: false });
        };
        // cloudinary ayega idhr

        // skills comes as a string, so we need to split it
        const skillsArray = skills.split(",");
        const userId = req.id; //   user.bio = bio;
        user.skills = skillsArray; middleware
        let  user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({ message: "User not found", success: false });
        };
        //update data
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray;

        // resume comes later here..

        await user.save();
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            profile: user.profile
        }
        return res.status(200).json({ message: "Profile updated successfully", user, success: true });

    }catch (error) {
        console.log(error);
    }
}