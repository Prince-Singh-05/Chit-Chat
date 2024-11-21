import express from "express";
import authRouter from "./routes/auth.route.js";
import {} from "dotenv/config";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/message.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
	connectDB();
});
