const { v2: cloudinary } = require("cloudinary");

const requiredEnvVars = ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"];

const ensureCloudinaryEnv = () => {
	const missing = requiredEnvVars.filter((name) => !process.env[name]);

	if (missing.length > 0) {
		throw new Error(`Missing Cloudinary env vars: ${missing.join(", ")}`);
	}
};

const configureCloudinary = () => {
	ensureCloudinaryEnv();

	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});
};

const uploadBufferToCloudinary = (fileBuffer, folder, publicIdPrefix = "img") => {
	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{
				folder,
				resource_type: "image",
				public_id: `${publicIdPrefix}-${Date.now()}`,
			},
			(error, result) => {
				if (error) {
					reject(error);
					return;
				}

				resolve(result.secure_url);
			}
		);

		uploadStream.end(fileBuffer);
	});
};

const uploadFilePathToCloudinary = async (filePath, folder, publicIdPrefix = "img") => {
	const result = await cloudinary.uploader.upload(filePath, {
		folder,
		resource_type: "image",
		public_id: `${publicIdPrefix}-${Date.now()}`,
	});

	return result.secure_url;
};

const uploadRemoteUrlToCloudinary = async (imageUrl, folder, publicIdPrefix = "img") => {
	const result = await cloudinary.uploader.upload(imageUrl, {
		folder,
		resource_type: "image",
		public_id: `${publicIdPrefix}-${Date.now()}`,
	});

	return result.secure_url;
};

module.exports = {
	configureCloudinary,
	uploadBufferToCloudinary,
	uploadFilePathToCloudinary,
	uploadRemoteUrlToCloudinary,
};