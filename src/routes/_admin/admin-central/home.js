const express=require('express')
const router=express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path =require('path')
const fs = require('fs')

const { eAdmin } = require("../../../../helpers/eAdmin")
// const { eAdmin } = require("../../helpers/eAdmin")
const flash = require('connect-flash')
const console = require('console')

// 7768
router.get('/',(req,res)=>{
   console.log('');
   console.log('______________________________________');
   console.log(' ');
   console.log(' [ 17 ]');
   console.log(' origem views :');
   console.log(' origem route : _admin/home.js/get');
   console.log(' obs : página do site HOME');
   console.log('');
   console.log(' destino :_site/home/grid-home.handlebars :: layout:"site/home/home.handlebars"');
   console.log('');
   console.log('');
   res.render("_site/home/grid-home",{ layout:'site/home/home.handlebars'})
})
  
module.exports=router