const mongoose = require("mongoose");

const allowedSections = [
	"pages",
	"fonts",
	"books",
	"hobbies",
	"grooming",
	"fitness",
	"explore",
];

const cardSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			default: "",
			trim: true,
		},
		image: {
			type: String,
			default: "",
			trim: true,
		},
		description: {
			type: String,
			default: "",
			trim: true,
		},
		handle: {
			type: String,
			default: "",
			trim: true,
		},
		name: {
			type: String,
			default: "",
			trim: true,
		},
	},
	{
		timestamps: { createdAt: true, updatedAt: false },
		versionKey: false,
	}
);

const createSectionModel = (modelName, collectionName) => {
	if (mongoose.models[modelName]) {
		return mongoose.models[modelName];
	}

	return mongoose.model(modelName, cardSchema, collectionName);
};

const sectionModels = {
	pages: createSectionModel("PagesCard", "pagescards"),
	fonts: createSectionModel("FontCard", "fontcards"),
	books: createSectionModel("BookCard", "bookcards"),
	hobbies: createSectionModel("HobbyCard", "hobbycards"),
	grooming: createSectionModel("GroomingCard", "groomingcards"),
	fitness: createSectionModel("FitnessCard", "fitnesscards"),
	explore: createSectionModel("ExploreCard", "explorecards"),
};

module.exports = {
	allowedSections,
	sectionModels,
};