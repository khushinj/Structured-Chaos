const express = require("express");
const multer = require("multer");
const { allowedSections, sectionModels } = require("../models/Entry");
const { uploadBufferToCloudinary } = require("../config/cloudinary");

const router = express.Router();

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (_req, file, cb) => {
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
			return;
		}

		cb(new Error("Only image files are allowed"));
	},
});

const toGroupedPayload = (entriesBySection) => {
	const grouped = allowedSections.reduce((acc, section) => {
		acc[section] = [];
		return acc;
	}, {});

	for (const section of allowedSections) {
		const sectionEntries = entriesBySection[section] || [];
		grouped[section] = sectionEntries.map((entry) => ({
			id: String(entry._id),
			title: entry.title,
			image: entry.image,
			description: entry.description,
			handle: entry.handle,
			name: entry.name,
			createdAt: entry.createdAt,
		}));
	}

	return grouped;
};

router.get("/", async (_req, res, next) => {
	try {
		const sectionsPayload = {};

		await Promise.all(
			allowedSections.map(async (section) => {
				const model = sectionModels[section];
				sectionsPayload[section] = await model.find({}).sort({ createdAt: 1 }).lean();
			})
		);

		res.json(toGroupedPayload(sectionsPayload));
	} catch (error) {
		next(error);
	}
});

router.get("/:section", async (req, res, next) => {
	try {
		const { section } = req.params;

		if (!allowedSections.includes(section)) {
			return res.status(400).json({ error: "Invalid section" });
		}

		const model = sectionModels[section];
		const entries = await model.find({}).sort({ createdAt: 1 }).lean();

		return res.json(
			entries.map((entry) => ({
				id: String(entry._id),
				title: entry.title,
				image: entry.image,
				description: entry.description,
				handle: entry.handle,
				name: entry.name,
				createdAt: entry.createdAt,
			}))
		);
	} catch (error) {
		next(error);
	}
});

router.post("/:section", upload.single("image"), async (req, res, next) => {
	try {
		const { section } = req.params;

		if (!allowedSections.includes(section)) {
			return res.status(400).json({ error: "Invalid section" });
		}

		const sectionModel = sectionModels[section];

		const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
		const description = typeof req.body.description === "string" ? req.body.description.trim() : "";
		const handle = typeof req.body.handle === "string" ? req.body.handle.trim() : "";
		const name = typeof req.body.name === "string" ? req.body.name.trim() : "";

		if (section === "fonts") {
			if (!name) {
				return res.status(400).json({ error: "Font name is required" });
			}
		}

		if (section === "pages") {
			if (!req.file || !handle || !description) {
				return res.status(400).json({ error: "Image, handle and description are required." });
			}
		}

		if (["books", "hobbies", "grooming", "fitness", "explore"].includes(section)) {
			if (!req.file || !title) {
				return res.status(400).json({ error: "Title and image are required." });
			}
		}

		const imageUrl = req.file
			? await uploadBufferToCloudinary(req.file.buffer, `structured-chaos/${section}`, section)
			: "";

		const createdEntry = await sectionModel.create({
			title,
			description,
			handle,
			name,
			image: imageUrl,
		});

		return res.status(201).json({
			id: String(createdEntry._id),
			title: createdEntry.title,
			image: createdEntry.image,
			description: createdEntry.description,
			handle: createdEntry.handle,
			name: createdEntry.name,
			createdAt: createdEntry.createdAt,
		});
	} catch (error) {
		next(error);
	}
});

router.put("/:section/:id", upload.single("image"), async (req, res, next) => {
	try {
		const { section, id } = req.params;

		if (!allowedSections.includes(section)) {
			return res.status(400).json({ error: "Invalid section" });
		}

		const sectionModel = sectionModels[section];
		const existingEntry = await sectionModel.findById(id);

		if (!existingEntry) {
			return res.status(404).json({ error: "Entry not found" });
		}

		const incomingTitle = typeof req.body.title === "string" ? req.body.title.trim() : undefined;
		const incomingDescription = typeof req.body.description === "string" ? req.body.description.trim() : undefined;
		const incomingHandle = typeof req.body.handle === "string" ? req.body.handle.trim() : undefined;
		const incomingName = typeof req.body.name === "string" ? req.body.name.trim() : undefined;

		const nextTitle = incomingTitle ?? existingEntry.title;
		const nextDescription = incomingDescription ?? existingEntry.description;
		const nextHandle = incomingHandle ?? existingEntry.handle;
		const nextName = incomingName ?? existingEntry.name;

		const nextImage = req.file
			? await uploadBufferToCloudinary(req.file.buffer, `structured-chaos/${section}`, section)
			: existingEntry.image;

		if (section === "fonts" && !nextName) {
			return res.status(400).json({ error: "Font name is required" });
		}

		if (section === "pages" && (!nextImage || !nextHandle || !nextDescription)) {
			return res.status(400).json({ error: "Image, handle and description are required." });
		}

		if (["books", "hobbies", "grooming", "fitness", "explore"].includes(section) && (!nextTitle || !nextImage)) {
			return res.status(400).json({ error: "Title and image are required." });
		}

		existingEntry.title = nextTitle;
		existingEntry.description = nextDescription;
		existingEntry.handle = nextHandle;
		existingEntry.name = nextName;
		existingEntry.image = nextImage;

		const updatedEntry = await existingEntry.save();

		return res.json({
			id: String(updatedEntry._id),
			title: updatedEntry.title,
			image: updatedEntry.image,
			description: updatedEntry.description,
			handle: updatedEntry.handle,
			name: updatedEntry.name,
			createdAt: updatedEntry.createdAt,
		});
	} catch (error) {
		next(error);
	}
});

router.delete("/:section/:id", async (req, res, next) => {
	try {
		const { section, id } = req.params;

		if (!allowedSections.includes(section)) {
			return res.status(400).json({ error: "Invalid section" });
		}

		const sectionModel = sectionModels[section];
		const deletedEntry = await sectionModel.findByIdAndDelete(id);

		if (!deletedEntry) {
			return res.status(404).json({ error: "Entry not found" });
		}

		return res.json({ success: true, id: String(deletedEntry._id) });
	} catch (error) {
		next(error);
	}
});

module.exports = router;