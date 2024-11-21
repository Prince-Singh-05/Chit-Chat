import { v2 as cloudinary } from "cloudinary";
import {} from "dotenv/config";

const connectCloudinary = () => {
	try {
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});
	} catch (error) {
		console.log("Eroor while connecting to cloudinary ", error.message);
	}
};

export default connectCloudinary;
