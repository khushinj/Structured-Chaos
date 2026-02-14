
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;
// const mongoUri = process.env.MONGODB_URI;

// app.use(cors());
// app.use(express.json());

// app.get("/health", (_req, res) => {
// 	res.json({ status: "ok" });
// });

// async function startServer() {
// 	if (!mongoUri) {
// 		console.error("MONGODB_URI is not set in .env");
// 		process.exit(1);
// 	}

// 	try {
// 		await mongoose.connect(mongoUri);
// 		console.log("MongoDB connected");

// 		app.listen(port, () => {
// 			console.log(`Server running on port ${port}`);
// 		});
// 	} catch (error) {
// 		console.error("Failed to connect to MongoDB", error);
// 		process.exit(1);
// 	}
// }

// startServer();
