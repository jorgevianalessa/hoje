const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Está tabela cadastrará os usuários/clientes do do site e administradores do site
const Segmento = new Schema ( {
    segmento:{
        type:String,
        required:true
    },
    setor:[
          {
            name:{type:String,required:true},
            secao:[ {type:String,required:false}],
          }
        ]
    ,   
    createAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
       type:Date,
       required:false
   }
})

mongoose.model("segmentos",Segmento)