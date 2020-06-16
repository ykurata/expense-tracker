const AWS = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3')
 
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "yasuko-my-recipes",  
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function(req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

module.exports = upload;