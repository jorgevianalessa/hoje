

// Incluir em cada conta o histórico de lançamento

const { type } = require('express/lib/response');
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
// Está tabela guarda os dados de todos os lojista do site
const Raq_plano_titulo = new Schema ( {
    numberChave:{
        type:String,
        required:false,
    },
    data:{
        type:Date,
        required:false
    },
    idloja:{type:String,required:false},
    operador:{type:String,required:false},

    numero_vetor:{type:Number,required:false},
    nome_vetor:{type:String,required:false},
    titulo:[
        {
          titulo_numero:{type:String,required:false},
          titulo_nome:{type:String,required:false}
        }
    ],
   

    // },
     createAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
       type:Date,
       required:false
   }
})
Raq_plano_titulo.plugin(mongoosePaginate);
mongoose.model("raq_plano_titulo",Raq_plano_titulo)