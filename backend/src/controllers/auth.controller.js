import { generateToken, uploadFileOnCloudinary } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
	try {
		const { fullName, email, password } = req.body;

		if (!fullName || !email || !password) {
			return res.status(400).json({
				succeess: false,
				message: "All fields are required",
			});
		}

		if (password.length < 6) {
			return res.status(400).json({
				succeess: false,
				message: "Password must be at least 6 characters",
			});
		}

		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				succeess: false,
				message: "Email already exists",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			fullName,
			email,
			password: hashedPassword,
		});

		if (!newUser) {
			return res.status(400).json({
				succeess: false,
				message: "Invalid User Data",
			});
		}

		generateToken(newUser._id, res);
		await newUser.save();

		res.status(200).json({
			succeess: true,
			message: "User signup successfull",
			user: {
				id: newUser._id,
				fullName: newUser.fullName,
				email: newUser.email,
				profilePic: newUser.profilePic,
			},
		});
	} catch (error) {
		console.log("Error in signup controller ", error.message);
		res.status(500).json({
			succeess: false,
			message: `Error in signup controller ${error.message}`,
		});
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				succeess: false,
				message: "All fields are required",
			});
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				succeess: false,
				message: "Invalid Credentials",
			});
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({
				succeess: false,
				message: "Invalid Credentials",
			});
		}

		generateToken(user._id, res);
		res.status(200).json({
			succeess: true,
			message: "User login successfull",
			user: {
				id: user._id,
				fullName: user.fullName,
				email: user.email,
				profilePic: user.profilePic,
			},
		});
	} catch (error) {
		console.log("Error in login controller ", error.message);
		res.status(500).json({
			succeess: false,
			message: `Error in login controller ${error.message}`,
		});
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({
			succeess: true,
			message: "Logged out successfully",
		});
	} catch (error) {
		console.log("Error in logout controller ", error.message);
		res.status(500).json({
			succeess: false,
			message: `Error in logout controller ${error.message}`,
		});
	}
};

// check if there is some issue
export const updateProfile = async (req, res) => {
	try {
    console.log("Request's files - ", req.file);

		// const { profilePic } = req.files;
		// const userId = req.user._id;

		// if (!profilePic) {
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "Profile pic is required",
		// 	});
		// }

		// const folder = process.env.FOLDER_NAME;
		// const uploadResponse = await uploadFileOnCloudinary(profilePic, folder);
		// const updatedUser = await User.findByIdAndUpdate(
		// 	userId,
		// 	{ profilePic: uploadResponse.secure_url },
		// 	{ new: true }
		// );

		res.status(200).json({
			success: true,
			message: "Profile picture updated",
		});
	} catch (error) {
		console.log("Error in update profile controller ", error.message);
		res.status(500).json({
			succeess: false,
			message: `Error in update profile controller ${error.message}`,
		});
	}
};

export const checkAuth = (req, res) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		console.log("Error in checkAuth controller ", error.message);
		res.status(500).json({
			succeess: false,
			message: `Error in checkAuth controller ${error.message}`,
		});
	}
};
