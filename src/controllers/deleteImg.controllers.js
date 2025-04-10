
//const s3 = new aws.S3({
//    endpoint:'nyc3.digitaloceanspaces.com',
//    accessKeyId:'DO007GR4A6XXRGET8V98',
//    secretAccessKey:'1BgvdGm3XEkICOWna1advp6x3mWOIUBKAqiQ4bACVbk',
//})

const spacesEndpoint = new AWS.Endpoint(process.env.SPACES_ENDPOINT);
let j='https://amelia.nyc3.cdn.digitaloceanspaces.com/0023b65e30eb1c39a267_boneco_09.jpg'

const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
});
//set delete param bucket name and file name with extension

const param = {
    Bucket: process.env.BUCKET_NAME,
    Key: j
};
//call delete method 
s3.deleteObject(param, function (err, data) {
    if (err) {
        console.log('err', err)

    }
    console.log('data', data)
});