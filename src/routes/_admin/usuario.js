const express = require('express')
// const mongoose = require('mongoose')
const router = express.Router()
const passport = require('passport')
require('../../../config/auth')(passport)

router.get('/login',(req,res)=>{
    console.log('');
    console.log('____________________________________________');
    console.log('');
    console.log(' [ 11  ]');
    console.log(' origem views : views/www.rotaes.com.br/{admin/login');
    console.log(' origem route : _admin/usuario.js/login');
    console.log(' obs : mostra a page para digitar a senha ');
    console.log('');
    console.log(' destino : _admin/usuario/login => layout:"login.handlebars"');
    console.log('');
    console.log('____________________________________________');
    console.log('');
    console.log('');
    res.render("_admin/usuario/login",{ layout:'login.handlebars'});
})

router.post('/login',async(req,res,next) =>{
    console.log('');
    console.log('____________________________________________');
    console.log('');
    console.log(' [ 28 ]');
    console.log(' origem views :');
    console.log(' origem route : /_admin/usuario/post("/login")');
    console.log(' obs : ');
    console.log('');
    console.log(' destino :');
    console.log('');
    console.log('req.body  : ',req.body)
    console.log('____________________________________________');
    //require('dotenv').config({path:'./config.env'})
    console.log('');
    try{
        console.log(' [ 42 ] => antes do passport.authenticate')
        await passport.authenticate("local",{
            successRedirect:"/central/",
            failureRedirect:"/usuario/login",
            failureFlash:true
        })(req,res,next)
        console.log(' [ 48 ] => depois do passport.authenticate : ');
        //console.log(res)
    }
    catch(err){
        console.log(err)
    }

})

router.get('/logout',(req,res) => {
    console.log('--> /logout')
    req.logout()
    req.flash("success_msg","Deslogado com successo!")
    res.redirect('/usuario/login')
})

// 
 router.get('/loginloja',(req,res)=>{
     console.log('40usuario/loginloja')
   
     res.render("_cooperado/usuario/loginloja",{ layout:'login.handlebars'});
 })

// router.post('/loginloja',(req,res,next) =>{
//     //console.log('--> usuarioloja/post/loginloja-Post')
//     let emae=req.body.email;
//     let senha=req.body.senha;
//     let errors = []
//     if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
//         errors.push({ error : "Erro: Necessário preencher o email!"})
//     }

//     if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
//         errors.push({ error : "Erro: Necessário colocar a senha!"})
//       }

//       if(req.body.senha.length>6 || req.body.senha.length<6){
//         errors.push({ error : "Erro: A senha não pode ser de comprimento diferente de 6!"})
//       }
      
//     if(errors.length>0){
//         console.log('os erros',errors)
//         res.render("usuario/loginloja",{ layout:'admin.handlebars',errors:errors})
//    }else{
//        try{
//             console.log( emae ,'<--->',senha)
//             Comercio.findOne({email:emae,senha:senha})
//                        .then((r)=>{
//                         console.log('valor de r -->',r)
//                         if(!r || r==undefined){
//                             console.log("algo está errado")
//                             res.render("usuario/loginloja",{ layout:'admin.handlebars',errors:r})
//                         }else{
//                            // console.log('cooperdao???',r)
//                             res.redirect('/admin/cooperados')
//                             // res.render("admin/admincooperados",{ layout:'participe.handlebars',cooperado:r});
//                         }
//                        })
//                        .catch((e)=>{
//                            console.log(e)
//                        })
//             //console.log(6)
//         }
//         catch(err){
//           console.log(9)
//           console.log(err)
//         }
//     }
// })


module.exports = router;