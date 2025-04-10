// Carregando os módulos
const express = require('express')
const router = express.Router()
//require('./../config/db')
require('../../app')
//const knex=require('../config/db')
//const { eAdmin } = require("../../helpers/eAdmin")
const {eAdmin}=require("../../helpers/eAdmin")
const passport = require('passport')
const bcryptjs = require('bcryptjs')
const app = require('express')
//const { index } =require('../controllers/UserController')

// ENTRADA : DASHBORD
router.get('/',eAdmin,(req,res) => {
    console.log(req.params)
    res.render("../views/admin/index")
})

router.get('/login',(req,res) => {
     console.log('linha 23- admin/login')
     res.render("admin/login")
})

router.post('/login',(req,res,next) => {
    console.log('linha 28 / hoje')
    passport.authenticate("local",{
        successRedirect:"/admin/",
        failureRedirect: "/admin/login",
        failureFlash : true
    })(req,res,next)
})

router.get('/nota',eAdmin,(req,res) => {
    console.log(9999)
    res.render("compra/xml")
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
// router.post('/add-usuario',index,(req,res) =>{
//      res.redirect("admin/vis-usuario",{usuario:users})
// })

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

//Exportando o módulo de rotas
module.exports =router