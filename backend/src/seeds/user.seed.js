import {} from "dotenv/config";
import User from "../models/user.model.js";
import { connectDB } from "../lib/db.js";

const seedUsers = [
	// Female Users
	{
		email: "emma.thompson@example.com",
		fullName: "Emma Thompson",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/women/11.jpg",
	},
	{
		email: "olivia.miller@example.com",
		fullName: "Olivia Miller",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/women/12.jpg",
	},
	{
		email: "sophia.davis@example.com",
		fullName: "Sophia Davis",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/women/13.jpg",
	},
	{
		email: "ava.wilson@example.com",
		fullName: "Ava Wilson",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/women/14.jpg",
	},
	{
		email: "isabella.brown@example.com",
		fullName: "Isabella Brown",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/women/15.jpg",
	},
	{
		email: "mia.johnson@example.com",
		fullName: "Mia Johnson",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/women/16.jpg",
	},
	{
		email: "charlotte.williams@example.com",
		fullName: "Charlotte Williams",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/women/17.jpg",
	},
	{
		email: "amelia.garcia@example.com",
		fullName: "Amelia Garcia",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/women/18.jpg",
	},

	// Male Users
	{
		email: "james.anderson@example.com",
		fullName: "James Anderson",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
	},
	{
		email: "william.clark@example.com",
		fullName: "William Clark",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/men/12.jpg",
	},
	{
		email: "benjamin.taylor@example.com",
		fullName: "Benjamin Taylor",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/men/13.jpg",
	},
	{
		email: "lucas.moore@example.com",
		fullName: "Lucas Moore",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/men/14.jpg",
	},
	{
		email: "henry.jackson@example.com",
		fullName: "Henry Jackson",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/men/15.jpg",
	},
	{
		email: "alexander.martin@example.com",
		fullName: "Alexander Martin",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/men/16.jpg",
	},
	{
		email: "daniel.rodriguez@example.com",
		fullName: "Daniel Rodriguez",
		password: "123456",
		profilePic: "https://randomuser.me/api/portraits/men/17.jpg",
	},
];

const seedDatabase = async () => {
	try {
		await connectDB();
		await User.insertMany(seedUsers);
		console.log("Database seeded successfully");
	} catch (error) {
		console.log("Error seeding database:", error);
	}
};

seedDatabase();
