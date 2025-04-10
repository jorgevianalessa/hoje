const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Está tabela guarda os endereço dos usuário/clientes do site
const EnderecoUsuario = new Schema ( {
    _idNegocio:{
        type:String,
        required:true
    },
    cep:{
        type:String,
        required:true
    },
    logradouro:{
        type:String,
        required:true
    },
    numero:{
        type:String,
        required:true
    },
    loja:{
        type:String,
        required:true
    },
    andar:{
        type:String,
        required:true
    },
    sala:{
        type:String,
        required:true
    },
    bairro:{
        type:String,
        required:true
    },
    cidade:{
        type:String,
        required:true
    },
    estado:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
       type:Date,
       required:false
   }
})

mongoose.model("enderecousuario",EnderecoUsuario)