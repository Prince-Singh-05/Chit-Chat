import express from "express";
import {
	checkAuth,
	login,
	logout,
	signup,
	updateProfile,
} from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.put("/update-profile", auth, updateProfile);
authRouter.get("/check", auth, checkAuth);

export default authRouter;
