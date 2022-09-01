const { s3UploadFile } = require('../helpers/s3UploadFile');
/**
 * Validates if a file is sent in the request.
 * If a file is sent, it loads it to aws s3
 * and returns the location url in the req.body.image object.
 */
const uploadFile = async (req, res, next) => {
  if (req.files) {
    const files = [];
    // Loop through all submitted files.
    Object.keys(req.files).forEach((key) => {
      files.push(req.files[key]);
    });
    // Load only the first file
    const urlFile = await s3UploadFile(files[0]);
    req.body.image = urlFile;
  }
  next();
};

module.exports = { uploadFile };
