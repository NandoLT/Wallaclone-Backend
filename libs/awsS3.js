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
    bucket: (req, res, cb) => {
        cb(null, `${process.env.AWS_S3_BUCKET}/${req.body.userId}`);
    },
    acl: 'public-read',
    contentType: (req, file, cb) => {
        cb(null, file.mimetype);
    },
    key: function (req, file, cb) {
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
            // console.log('DATA S3', data);
        });
};


const deleteSingleImage = async (bucketName, key) => {
    console.log('ENTRO EN DELETE AWS');
    const bucketParams = {
        Bucket: bucketName,
        key
    };
    console.log('BUCKETPARAMS', bucketParams);
    // await s3.deleteObject(bucketParams);

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