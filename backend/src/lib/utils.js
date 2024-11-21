import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "./cloudinary.js";
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

export const uploadFileOnCloudinary = async (file, height, quality) => {
	connectCloudinary();
	try {
		const options = {
			folder,
			resource_type: "auto",
		};

		if (height) {
			options.height = height;
		}

		if (quality) {
			options.quality = quality;
		}

		return await cloudinary.uploader.upload(file.tempFilePath, options);
	} catch (error) {
		console.log(
			"Error while uploading file to cloudinary: ",
			error.message
		);
	}
};
