'use strict'

const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
require('dotenv').config({
    path:  __dirname + '/../.env'
});

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});

const s3 = new aws.S3();

const storage = multerS3({
    s3: s3,
    bucket: (req, res, cb) => {
        cb(null, `${process.env.AWS_S3_BUCKET}/${req.apiAuthUserId}`);
    },
    acl: 'public-read',
    contentType: (req, file, cb) => {
        cb(null, file.mimetype);
    },
    key: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    // limits : {fileSize : process.env.MAX_SIZE_FILE},
}).single('photo');

const createUserFolder = async (userId) => {
    await s3.putObject({
        Key:`${userId}/`,
        Bucket: process.env.AWS_S3_BUCKET
        },(err, data) => {
            console.log('ERROR S3', err);
            console.log('DATA S3', data);
        });
};


const deleteSingleImage = async (bucketName, key) => {
    const bucketParams = {
        Bucket: bucketName,
        key
    };

    s3.deleteObject({
        Bucket: bucketName,
        Key: key
      }, function(err, data) {
        if (err) {
            console.log("Error: " + err);
        }
        else {
            console.log('Successfully deleted the item');
         return;
        }
      });
};

const deleteMultipleImages = () => {
    //Implementar si en front se opta por tener galeria de producto.
};

module.exports = {upload, createUserFolder, deleteSingleImage, deleteMultipleImages}; 