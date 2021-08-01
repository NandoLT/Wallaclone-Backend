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
        // cb(null, `${req.body.bucketName}/${req.body.userId}`);
        cb(null, `${process.env.AWS_S3_BUCKET}/${req.body.userId}`);
        // cb(null, `${process.env.AWS_S3_BUCKET}`);
    },
    acl: 'public-read',
    contentType: (req, file, cb) => {
        // console.log(file.mimetype);
        cb(null, file.mimetype);
    },
    key: function (req, file, cb) {
        // console.log(file);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
const createUserFolder = async (userId) => {
    await s3.putObject({
        Key:`${userId}/`,
        Bucket: process.env.AWS_S3_BUCKET
        },(err, data) => {
            console.log('ERROR S3', err);
            console.log('DATA S3', data);
        });
};


const deleteSingleImage = () => {
};

const deleteMultipleImages = () => {
};

module.exports = {upload, createUserFolder, deleteSingleImage, deleteMultipleImages}; 