import multer from "multer";

const handleUploadError = (error, req, res, next) => {
  if (!(error instanceof multer.MulterError)) return next(error);

  const statusCode = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
  const message =
    error.code === "LIMIT_FILE_SIZE"
      ? "Uploaded image is too large"
      : error.code === "LIMIT_FILE_COUNT"
        ? "Too many files uploaded"
        : error.message;

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default handleUploadError;
