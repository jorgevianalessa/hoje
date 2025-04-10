// const express = require('express')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const localStrategy = require('passport-local').Strategy

require("../src/models/Usuario")
const Usuario = mongoose.model('usuarios')
const passport = require('passport')
const res = require('express/lib/response')

module.exports = function (passport) {
    console.log('--------------------------------- ')
    console.log('(linha 12) --> module.export/config/auth.js')
    console.log('--------------------------------- ')
    console.log('valor de ->>>','senha')
    passport.use(new localStrategy({usernameField:'email',passwordField:'senha'},(email,senha,done)=>{
                console.log('linha 17 - dentro de auth.js - module.exports = function (passport)',email)
                Usuario.find({email:email})
                        .then((usuario)=>{
                            console.log('---------------------------------')
                            console.log('(19) -->module.export/config/auth')
                            let [usuar]=usuario;
                            usuario=usuar;
                            console.log('-----------------------???---------- ',usuario)
                            if(!usuario | usuario=='null'){
                                console.log(1)
                                //res.render("_admin/usuario/cad_usuario")
                                return done(null,false,{message:"Cadastro com este e-mail não encontrado!X"})
                            }
                            console.log("valor do usuário???",usuario)
                            if(usuario.admin==1){
                                    bcryptjs.compare(senha,usuario.senha,(erro,correta) => {
                                        console.log('valor -correta- true',correta)
                                        if(correta){
                                           console.log(usuario) 
                                           return done(null,usuario)
                                        }else{
                                           return done(null,false,{message:"Dados de acesso não confere!"})
                                        }
                                    })
                                }else{
                                    console.log("não é administrador!")
                                    return done(null,false,{message:"não é administrador!"})
                                }         
                        })   
                        .catch((err)=>{
                            console.log(err)
                        })
                
                        // Salvar os addos do usuário na sessão
                        passport.serializeUser((usuario,done) => {
                            done(null,usuario.id)
                        })
                       
                        passport.deserializeUser((id,done) => {
                             Usuario.findById(id,(erro,usuario) => {
                                   done(erro,usuario)
                            })
                        }) 
                console.log(666)         
            }))
}

   