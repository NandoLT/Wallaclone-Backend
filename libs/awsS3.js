'use strict'

const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
require('dotenv');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCES_KEY,
  region: process.env.AWS_REGION
});

const s3 = new aws.S3();

const storage = multerS3({
    s3: s3,
    // bucket: process.env.AWS_S3_BUCKET,
    bucket: (req, res, cb) => {
        console.log(" bucketName is >> "+JSON.stringify(req.body.bucketName));
        cb(null, req.body.bucketName);
    },
    key: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;