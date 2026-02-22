const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const {
	configureCloudinary,
	uploadFilePathToCloudinary,
	uploadRemoteUrlToCloudinary,
} = require("../config/cloudinary");
const { allowedSections, sectionModels } = require("../models/Entry");

dotenv.config();

const frontendPublicDir = path.join(__dirname, "..", "..", "frontend", "public");
const backendUploadsDir = path.join(__dirname, "..", "uploads");

const isCloudinaryUrl = (url) => typeof url === "string" && url.includes("res.cloudinary.com");
const isRemoteUrl = (url) => typeof url === "string" && /^https?:\/\//i.test(url);

const resolveLocalFilePath = (imageValue) => {
	if (!imageValue || typeof imageValue !== "string") {
		return null;
	}

	if (imageValue.startsWith("/")) {
		const localPath = path.join(frontendPublicDir, imageValue.slice(1));
		return fs.existsSync(localPath) ? localPath : null;
	}

	const uploadsMatch = imageValue.match(/\/uploads\/([^?#]+)/);
	if (uploadsMatch && uploadsMatch[1]) {
		const localPath = path.join(backendUploadsDir, uploadsMatch[1]);
		return fs.existsSync(localPath) ? localPath : null;
	}

	return null;
};

const migrate = async () => {
	configureCloudinary();
	await connectDB();

	for (const section of allowedSections) {
		const model = sectionModels[section];
		const docs = await model.find({}).lean();
		let migratedCount = 0;

		for (const doc of docs) {
			if (!doc.image || isCloudinaryUrl(doc.image)) {
				continue;
			}

			let secureUrl = "";

			if (isRemoteUrl(doc.image)) {
				secureUrl = await uploadRemoteUrlToCloudinary(doc.image, `structured-chaos/${section}`, section);
			} else {
				const filePath = resolveLocalFilePath(doc.image);
				if (!filePath) {
					continue;
				}

				secureUrl = await uploadFilePathToCloudinary(filePath, `structured-chaos/${section}`, section);
			}

			await model.updateOne({ _id: doc._id }, { $set: { image: secureUrl } });
			migratedCount += 1;
		}

		console.log(`${section}: migrated ${migratedCount} image(s)`);
	}

	console.log("Cloudinary image migration complete");
	process.exit(0);
};

migrate().catch((error) => {
	console.error("Cloudinary migration failed:", error.message);
	process.exit(1);
});