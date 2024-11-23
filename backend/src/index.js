import express from "express";
import authRouter from "./routes/auth.route.js";
import {} from "dotenv/config";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/message.route.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
	connectDB();
});
