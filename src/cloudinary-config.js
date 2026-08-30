export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
};

export const cloudinaryConfigured = Boolean(
  cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset
);
