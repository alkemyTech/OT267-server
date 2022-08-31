const S3 = require('aws-sdk/clients/s3');

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3({
  accessKeyId,
  secretAccessKey,
});

module.exports = { s3Client };
