const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const { configureCloudinary } = require("./config/cloudinary");
const seedDefaultsIfNeeded = require("./config/seedDefaults");
const entriesRouter = require("./routes/entries");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/health", (_req, res) => {
	res.json({ status: "ok" });
});

app.use("/api/entries", entriesRouter);

app.use((err, _req, res, _next) => {
	if (err && err.message === "Only image files are allowed") {
		return res.status(400).json({ error: err.message });
	}

	if (err && err.code === "LIMIT_FILE_SIZE") {
		return res.status(400).json({ error: "Image size must be 5MB or less" });
	}

	console.error(err);
	return res.status(500).json({ error: "Internal server error" });
});

const startServer = async () => {
	try {
		configureCloudinary();
		await connectDB();
		await seedDefaultsIfNeeded();
		app.listen(port, () => {
			console.log(`Server running on port ${port}`);
		});
	} catch (error) {
		console.error("Failed to start server:", error.message);
		process.exit(1);
	}
};

startServer();
