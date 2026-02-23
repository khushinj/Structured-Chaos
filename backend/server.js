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
const normalizeOrigin = (value) => value.trim().replace(/\/+$/, "");
const parseOrigins = (value) =>
	(value || "")
		.split(/[\s,]+/)
		.map((origin) => origin.trim())
		.filter(Boolean)
		.map(normalizeOrigin);

const defaultCorsOrigins = [
	"https://potential-bassoon-px9vrwrwxr5hrqwq-3000.app.github.dev/",
	"http://127.0.0.1:3000",
	"https://structured-chaos.vercel.app",
].map(normalizeOrigin);

const corsOrigins = Array.from(
	new Set([...defaultCorsOrigins, ...parseOrigins(process.env.CORS_ORIGIN)])
);

const isGithubPreviewOrigin = (origin) =>
	/^https:\/\/[a-z0-9-]+\.app\.github\.dev$/i.test(origin);

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin) {
				return callback(null, true);
			}

			const normalizedRequestOrigin = normalizeOrigin(origin);
			if (
				corsOrigins.includes(normalizedRequestOrigin) ||
				isGithubPreviewOrigin(normalizedRequestOrigin)
			) {
				return callback(null, true);
			}

			return callback(new Error("Not allowed by CORS"));
		},
	})
);

app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/health", (_req, res) => {
	res.json({ status: "ok" });
});

app.use("/api/entries", entriesRouter);

app.use((err, _req, res, _next) => {
	if (err && err.message === "Not allowed by CORS") {
		return res.status(403).json({ error: err.message });
	}

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
