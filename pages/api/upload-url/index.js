import aws from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';	

const getExtension = (fileName) => {
  var patternFileExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i;

 return (fileName).match(patternFileExtension)
} 

export default withApiAuthRequired(async function handler(req, res) {
  const objectName = `story-${uuidv4()}${getExtension(req.query.file)[0]}`;

   aws.config.update({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
      region: process.env.REGION,
      signatureVersion: 'v4',
   });

   const s3 = new aws.S3();
   const post = await s3.createPresignedPost({
      Bucket: process.env.BUCKET_NAME,
      Fields: {
        key: objectName,
        "acl": "public-read"
      },
      Expires: 60, // seconds
      Conditions: [
        {"acl": "public-read" },
        ['content-length-range', 0, 5242880], // up to 5 MB
      ],
   });

   res.status(200).json({...post, objectName: objectName});
});