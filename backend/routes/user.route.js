import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewears/isAuthenticated.js";
import { singleUpload } from "../middlewears/multer.js";
const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").put(isAuthenticated, updateProfile);

export default router;
