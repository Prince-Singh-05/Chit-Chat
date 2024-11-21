import express from "express";
import authRouter from "./routes/auth.route.js";
import {} from "dotenv/config";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
	connectDB();
});
