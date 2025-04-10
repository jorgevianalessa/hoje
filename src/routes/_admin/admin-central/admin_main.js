const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
const { eAdmin } = require("../../../../helpers/eAdmin")
// -----------------------------------------------------------------------------------------------
//   ENTRANDO NO HOME DA PARTE ADMINISTRATIVA ? 
// -----------------------------------------------------------------------------------------------
router.get('/',(req,res) => {
    console.log('');
    console.log('__________________________________________');
    console.log(' [ 11 ]');
    console.log(' origem views : /www.rotaes.com.br/{admin/login}');
    console.log(' origem route : { central/ } ./src/routes/_admin/admin_main.js=> get/');
    console.log(' obs : layout:"adminCentral.handlebars"');
    console.log('');
    console.log(' destino : _admin/admin/admincentral => central-dashboads');
    console.log('');
    res.render("_admin/admin/admin/admin-central", {layout:'central/admin-central.handlebars'})
})


router.get('/login',(req,res) => {
     async function f(){
       await  res.render("admin/login")
     }        
})

router.post('/login',async(req,res,next) => {
  console.log('linha 777 -',req)  
  await passport.authenticate("local",{
       successRedirect:"/admin/",
       failureRedirect: "/admin/login",
       failureFlash : true
   })(req,res,next)
})

router.get('/logout',(req,res) => {
   req.logout()
   req.flash("success_msg","Deslogado com sucesso!")
   res.redirect("/admin/login")
})
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Usuário
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::
router.get('/usuarios',eAdmin ,(req,res) =>{
   res.redirect("admin/usuarios")
   //    const {page = 1} = req.query

   //    Usuario.paginate({},{page,lean:true,limit:3})
   //           .then((usuario) =>{
   //                 res.render("admin/usuarios",{usuarios:usuario})
   //           })
   //           .catch((err)=>{
   //               req.flash("error_msg","error_msg","Usuário não encontrado!")
   //               res.redirect("admin/usuarios")
   //           })


})

// Cadastrando usuario
router.get('/cad-usuario',(req,res) => {
   res.render("admin/cad-usuario")
})

// Ok
//router.post('/add-usuario',index,(req,res) =>{
//    res.redirect("admin/vis-usuario",{usuario:users})
//})

// Detalhe Visualização
router.get('/vis-usuario/:id',eAdmin,(req,res) => {
   Usuario.findOne({_id : req.params.id})
          .lean()
          .then((usuario) => {
               res.render("admin/vis-usuario",{usuario:usuario})
          })
          .catch((err) =>{
              req.flash("error_msg","Error: Usuario não encontrado!")
              res.redirect("/admin/usuarios")
          })
})

// Editar usuário
router.get('/edit-usuario/:id',eAdmin ,(req,res) => {
     Usuario.findOne({_id:req.params.id})
            .lean()
            .then((usuario) => {
                res.render("admin/edit-usuario",{usuario:usuario})
            })
            .catch((err) => {
                req.flash("error_msg","Error:Usuário não encontrado!")
                res.render("admin/usuarios")
            })
})

router.post("/update-usuario",eAdmin ,(req,res) => {
   var dados_usuario = req.body
   var errors = []
   if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null ){ 
       errors.push({ error:"Erro:Necessário preencher o campo nome!"})
   }

   if(!req.body.email || typeof req.body.email == undefined || req.body.email == null ){
       errors.push({ error:"Erro:Necessário preencher o campo email!"})
   }

   if(errors.length> 0 ){
        console.log(dados_usuario)
        res.render("admin/edit-usuario",{errors:errors, usuario: dados_usuario})
   }else{
       // :::::::::::::::::::::::::::::::::::::::::::::::
       Usuario.findOne({ _id: req.body._id})
           .then((usuario) => {
                   usuario.nome = req.body.nome,
                   usuario.email = req.body.email
               
                   usuario.save()
                       .then(() => {
                           req.flash("success_msg","Usuário editado com sucesso!")
                           res.redirect("/admin/usuarios")
                       }) 
                       .catch((erro) => {
                           req.flash("error_msg","Error:Usuário não foi editado!")
                           res.redirect("/admin/usuarios")
                       })
           })
           .catch((erro) => {
                   req.flash("error_msg","Error:Usuário não encontrado!")
                   res.redirect("/admin/usuarios")
           })

   }

})

router.get('/del-usuario/:id',eAdmin ,(req,res) => {
         Usuario.deleteOne({ _id : req.params.id})

     .then(() =>{
       req.flash("success_msg","Usuário apagado com sucesso!")
       res.redirect("/admin/usuarios")
     })
     .catch(() => {
       req.flash("error_msg","Error:Usuário não encontrado!")
       res.redirect("/admin/usuarios")
     }) 
})

module.exports = router;