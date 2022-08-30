const fs = require('fs');
const { s3Client } = require('./s3Client');

const bucketNameDefault = process.env.aws_bucket_name;

/**
 * This function storage files in aws s3 services.
 * @param {Object} file A file object.
 * @param {String} bucketName Name of the bucket.
 * @returns A promise with the file location url.
 */
const s3UploadFile = (file, bucketName = bucketNameDefault) => {
  // Configure the file stream and obtain the upload parameters
  const fileStream = fs.createReadStream(file.tempFilePath);
  const uploadParams = {
    Bucket: bucketName,
    Key: file.name,
    Body: fileStream,
  };

  return new Promise((resolve, reject) => {
    // call S3 to retrieve upload file to specified bucket
    s3Client.upload(uploadParams, (error, data) => {
      if (!error) resolve(data.Location);
      reject(error);
    });
  });
};

module.exports = { s3UploadFile };
