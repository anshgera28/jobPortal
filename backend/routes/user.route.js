import express from "express";
import { register, login } from "../controllers/user.controller.js";



router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").post(updateProfile);
