const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config({path:'./.env'})
const crypto = require('crypto')
// const path = require('path');

const { S3_ENDPOINT } = process.env;
const {BUCKET_NAME} =process.env;

//console.log('');
//console.log('__________________________________________');
//console.log('');
//console.log(' [ 14 ] route : src/libs/multer.js')
//console.log('')
//console.log(' endpoint:',S3_ENDPOINT);
//console.log(' name : ',BUCKET_NAME)
//console.log('');
//console.log('___________________________________________');

//const s3 = new aws.S3({
//    endpoint:'nyc3.digitaloceanspaces.com',
//    accessKeyId:'DO007GR4A6XXRGET8V98',
//    secretAccessKey:'1BgvdGm3XEkICOWna1advp6x3mWOIUBKAqiQ4bACVbk',
//})

const s3 = new aws.S3({
        endpoint:'nyc3.digitaloceanspaces.com',
        accessKeyId:'DO007GR4A6XXRGET8V98',
        secretAccessKey:'1BgvdGm3XEkICOWna1advp6x3mWOIUBKAqiQ4bACVbk',
})

const upload = multer({
         storage:multerS3({
         s3,
         bucket:BUCKET_NAME,
         acl:'public-read',
         metadata:(req,file,cb) =>{
            cb(null,{
                fieldname:file.fieldname ,
            })
         },
         key:(req,file,cb)=>{
            cb(null,crypto.randomBytes(10).toString('hex')  + "_" + file.originalname);
           // console.log('');
           // console.log('______________________________________');
           // console.log('');
            //console.log(' [ 42 multer.js ]');
            //console.log(' origem views :');
            //console.log(' origem route : src/libs/multer.js');
            console.log(' obs : Faz a gravação da imagem na OceanDigital');
            console.log('  :');
            console.log(' destino  : src/controlles/index.controllers.js');
            console.log('______________________________________')
            console.log('');
        }
         
    }),
}).single('upload');

module.exports = { upload,s3 };