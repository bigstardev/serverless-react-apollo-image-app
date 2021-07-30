const AWS = require('aws-sdk');
const stream = require('stream');
const uuidv4 = require('uuid/v4')
const dotenv = require("dotenv")
dotenv.config();

const ACCESS_KEY_ID = process.env.S3_USER_KEY;
const SECRET_ACCESS_KEY = process.env.S3_USER_SECRET;
const BUCKET_NAME = process.env.S3_IMAGES_BUCKET;

// upload stream setup
const uploadStream = ({ Key, ACL, ContentType }) => {
  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY_ID,
		secretAccessKey: SECRET_ACCESS_KEY,
    Bucket: BUCKET_NAME
  });
  const pass = new stream.PassThrough();
  
  return {
    writeStream: pass,
    promise: s3.upload({
      Bucket: BUCKET_NAME,
      Key,
      ACL,
      ContentType,
      Body: pass 
    }).promise(),
  };
}

const readFileDetails = upload => 
  new Promise(async (resolve, reject) => {
    const { filename, mimetype, createReadStream } = await upload;

    const { writeStream, promise } = uploadStream({
      Key: `${uuidv4()}-${filename}`,
      ACL: 'public-read',
      ContentType: mimetype,
    });

    // when upload is done
    promise.then((response) => {
      console.log("Upload completed successfully")
      resolve({ 
        location: response.Location,
        filename,
        mimetype
      })

    }).catch((err) => {
      console.log("Upload failed", err.message)
      reject()
    })

    // create read stream 
    let stream = createReadStream();
    
    // pipe it uploadStream
    stream.pipe(writeStream);
    stream.on('error', (err) => writeStream.destroy(err))

  });

  module.exports = { readFileDetails };