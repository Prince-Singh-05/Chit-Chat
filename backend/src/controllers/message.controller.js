import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { uploadFileOnCloudinary } from "../lib/utils.js";

export const getUserForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
		const filteredUsers = await User.find({
			_id: { $ne: loggedInUserId },
		}).select("-password");

		res.status(200).json({
			success: true,
			message: "User fetched successfully",
			users: filteredUsers,
		});
	} catch (error) {
		console.log("Error in getUserForSidebar controller ", error.message);
		res.status(500).json({
			success: false,
			message: `Error in getUserForSidebar controller ${error.message}`,
		});
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const myId = req.user._id;

		const messages = await Message.find({
			$or: [
				{ senderId: myId, recieverId: userToChatId },
				{ senderId: userToChatId, recieverId: myId },
			],
		});

		res.status(200).json({
			success: true,
			message: "All messages fetched successfully",
			messages,
		});
	} catch (error) {
		console.log("Error in getMessages controller ", error.message);
		res.status(500).json({
			success: false,
			message: `Error in getMessages controller ${error.message}`,
		});
	}
};

export const sendMessage = async (req, res) => {
	try {
		const { text, image } = req.body;
		const { id: recieverId } = req.params;
		const senderId = req.user._id;

		let imageUrl;
		if (image) {
			const uploadResponse = await uploadFileOnCloudinary(image);
			imageUrl = uploadResponse.secure_url;
		}

		const newMessage = new Message({
			senderId,
			recieverId,
			text,
			image: imageUrl,
		});

    // socket.io logic here...

		res.status(201).json({
			success: true,
			newMessage,
		});
	} catch (error) {}
};