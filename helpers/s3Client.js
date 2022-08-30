const S3 = require('aws-sdk/clients/s3');

const accessKeyId = process.env.aws_access_key_id;
const secretAccessKey = process.env.aws_secret_access_key;

const s3Client = new S3({
  accessKeyId,
  secretAccessKey,
});

module.exports = { s3Client };
