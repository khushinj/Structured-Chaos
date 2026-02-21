const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedSections = [
	"pages",
	"fonts",
	"books",
	"hobbies",
	"grooming",
	"fitness",
	"explore",
];

const dataFilePath = path.join(__dirname, "data", "entries.json");

app.use(cors());
app.use(express.json({ limit: "2mb" }));

const ensureStoreExists = () => {
	if (!fs.existsSync(dataFilePath)) {
		fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
		fs.writeFileSync(
			dataFilePath,
			JSON.stringify(
				{
					pages: [],
					fonts: [],
					books: [],
					hobbies: [],
					grooming: [],
					fitness: [],
					explore: [],
				},
				null,
				2
			)
		);
	}
};

const readStore = () => {
	ensureStoreExists();
	const raw = fs.readFileSync(dataFilePath, "utf-8");
	const parsed = JSON.parse(raw);
	for (const section of allowedSections) {
		if (!Array.isArray(parsed[section])) {
			parsed[section] = [];
		}
	}
	return parsed;
};

const writeStore = (store) => {
	fs.writeFileSync(dataFilePath, JSON.stringify(store, null, 2));
};

const normalizeEntry = (entry) => ({
	id: entry.id,
	title: typeof entry.title === "string" ? entry.title.trim() : "",
	image: typeof entry.image === "string" ? entry.image.trim() : "",
	description: typeof entry.description === "string" ? entry.description.trim() : "",
	handle: typeof entry.handle === "string" ? entry.handle.trim() : "",
	name: typeof entry.name === "string" ? entry.name.trim() : "",
	createdAt: entry.createdAt,
});

app.get("/health", (_req, res) => {
	res.json({ status: "ok" });
});

app.get("/api/entries", (_req, res) => {
	const store = readStore();
	res.json(store);
});

app.post("/api/entries/:section", (req, res) => {
	const { section } = req.params;

	if (!allowedSections.includes(section)) {
		return res.status(400).json({ error: "Invalid section" });
	}

	const incoming = normalizeEntry(req.body || {});
	if (!incoming.image && section !== "fonts") {
		return res.status(400).json({ error: "Image is required for this section" });
	}

	if (section === "pages" && (!incoming.handle || !incoming.description)) {
		return res.status(400).json({ error: "Handle and description are required for Pages" });
	}

	if (section === "fonts" && !incoming.name) {
		return res.status(400).json({ error: "Font name is required" });
	}

	if (["books", "hobbies", "grooming", "fitness", "explore"].includes(section) && !incoming.title) {
		return res.status(400).json({ error: "Title is required" });
	}

	const store = readStore();
	const createdEntry = {
		...incoming,
		id: `${section}-${Date.now()}`,
		createdAt: new Date().toISOString(),
	};

	store[section].push(createdEntry);
	writeStore(store);

	return res.status(201).json(createdEntry);
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
