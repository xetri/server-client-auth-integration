import * as Minio from "minio"

// Initialize the MinIO client
const minioClient = new Minio.Client({
  endPoint: '172.21.0.2',
  port: 9000,
  useSSL: false,
  accessKey: Bun.env.MINIO_ACCESS_KEY,
  secretKey: Bun.env.MINIO_SECRET_KEY,
});

// Specify the bucket name and the object name (file name)
const bucketName = 'profile';
const objectName = 'package.json';

let objinfo = await minioClient.fPutObject(bucketName, "u1/" + objectName, objectName)
console.log("File uploaded succesfully", objinfo.etag)

let obj = await minioClient.getObject(bucketName, "u1/" + objectName)

console.log(`${minioClient.protocol}//${minioClient.host}:${minioClient.port}${obj.url}`)