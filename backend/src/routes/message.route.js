import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import {
	getMessages,
	getUserForSidebar,
	sendMessage,
} from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/user", auth, getUserForSidebar);
messageRouter.get("/:id", auth, getMessages);
messageRouter.post("/send/:id", auth, sendMessage);

export default messageRouter;
