// const { render } = require("ejs");
// const Image = require('../models/image')

// const renderIndex = (req,res)=>{
//     res.render('upload',{
//         title:'Upload an image',
//     })
// };

// const uploadFile =async (req,res) =>{
//     const newImage = new Image();
//     newImage.url=req.file.location;
//     await newImage.save();
//     console.log(req.file);
//     res.redirect("/files");
// };

// const getFiles =async (req,res) =>{
//     const images = await Image.find()
//     // console.log(images)
//     res.render('files',{
//         title:'Get files',
//         images
//     })
// };

// const getSingleFile = (req,res)=>{};

// module.exports = {
//     renderIndex,
//     getFiles,
//     getSingleFile,
//     uploadFile
// }