import jwt from "jsonwebtoken";
import {} from "dotenv/config";

const folder = process.env.FOLDER_NAME;

export const generateToken = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	res.cookie("jwt", token, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		smaeSite: "strict",
		secure: process.env.NODE_ENV !== "development",
	});

	return token;
};
