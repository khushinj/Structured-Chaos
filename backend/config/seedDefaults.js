const { allowedSections, sectionModels } = require("../models/Entry");

const defaultSectionData = {
	pages: [
		{
			handle: "craftx",
			description: "Will help you\nin learning\n\"How to sell\"",
			image: "/craftxImg.png",
		},
		{
			handle: "storiesbyaradhana",
			description: "Always moving\npeople love\ninteresting things",
			image: "/CardImg2.png",
		},
		{
			handle: "chaiaurvadapav",
			description: "Sharing life,\nworking vibe,\nfeeling alive",
			image: "/CardImg3.png",
		},
	],
	fonts: [{ name: "Averia Serif Libre" }, { name: "Cabin" }, { name: "" }],
	books: [
		{ title: "Deep Focus", image: "/book1.jpg" },
		{ title: "Goal Setting", image: "/book2.jpg" },
		{ title: "Focus on goals", image: "/book3.jpg" },
		{ title: "Build Systems", image: "/book4.jpg" },
		{ title: "Mindfulness", image: "/book5.jpg" },
	],
	hobbies: [
		{ title: "Guitar", image: "/guitar.png" },
		{ title: "Rest", image: "/crochet.png" },
	],
	grooming: [
		{ title: "Skincare", image: "/groom1.jpg" },
		{ title: "Hair", image: "/groom2.jpg" },
		{ title: "Nails", image: "/groom3.jpg" },
		{ title: "Smile", image: "/groom4.jpg" },
		{ title: "Makeup", image: "/groom5.jpg" },
	],
	fitness: [
		{ title: "Yoga", image: "/fitness1.jpg" },
		{ title: "Stretch", image: "/fitness2.jpg" },
		{ title: "Pilates", image: "/fitness3.jpg" },
		{ title: "Cardio", image: "/fitness4.jpg" },
	],
	explore: [
		{ title: "Starbucks", image: "/starbucks.jpg" },
		{ title: "Juhu + Flower Shop", image: "/flower-explore.jpg" },
	],
};

const seedDefaultsIfNeeded = async () => {
	for (const section of allowedSections) {
		const model = sectionModels[section];
		const existingCount = await model.countDocuments();

		if (existingCount > 0) {
			continue;
		}

		const defaults = defaultSectionData[section] || [];
		if (defaults.length > 0) {
			await model.insertMany(defaults);
			console.log(`Seeded ${defaults.length} default records for ${section}`);
		}
	}
};

module.exports = seedDefaultsIfNeeded;