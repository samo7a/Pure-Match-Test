const bucket = require("aws-sdk/clients/s3");
const fs = require("fs");
require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;

const s3 = new bucket({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: region,
});

//upload file to s3
const uploadImage = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const fileName = file.filename;
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileStream,
  };
  return s3.upload(params).promise();
};

//get file from s3

exports.uploadImage = uploadImage;
