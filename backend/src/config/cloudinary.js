let cloudinary = null;

try {
  const module = await import("cloudinary");
  cloudinary = module.v2 || module.default?.v2 || module.default;
} catch {
  console.warn(
    "Cloudinary package is not installed yet. Run 'npm install' in backend to enable Cloudinary image uploads.",
  );
}

export function configureCloudinary() {
  if (!cloudinary?.config) return cloudinary;

  const credentials = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };
  if (Object.values(credentials).every(Boolean)) {
    cloudinary.config(credentials);
  }

  return cloudinary;
}

configureCloudinary();

export default cloudinary;
