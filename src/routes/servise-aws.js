// Carregando os módulos
const express = require('express')
const router = express.Router()
const multer = require('multer')
const crypto = require('crypto')
const path =require('path')
require('../../app')


// const {multerConfig} = require('../config/multer')
const tmpFolder =path.resolve('tmp')
// const {UploadImage} = require('../controllers-aws/UploadImage')
// const upload = multer({multerConfig});

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"tmp/");
    },
    filename:(req,file,cb)=>{
       const fileHasn=crypto.randomBytes(10).toString('hex');
       const filename=`${fileHasn}-${file.originalname}`
       cb(null,Date.now() + '_' + file.originalname);
       console.log('valor Hash',fileHasn)   
       cb(null,filename)
    }
   
})



const upload=multer({storage})

router.post('/',upload.single('file'),(req,res)=>{
    let img1=req.file;

    
    console.log('valor de img1',img1)

    console.log("---------------------------------------")
    console.log('o nome do arquivo :',img1.filename)
    console.log(img1.size.valueOf())
    try{
          console.log(1)
        //   console.log('valor req',req)
        //    console.log(res)
           
        }catch(e){
            console.log(e)
        }       
     return res.send('olá');
})


// router.delete('/:filename',async((request,response)=>{


// }))


module.exports =router;