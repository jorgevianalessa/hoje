


// Incluir em cada conta o histórico de lançamento

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
// Está tabela guarda os dados de todos os lojista do site
const Raq_plano_subtitulo = new Schema ( {
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
    numero_titulo:{type:String,required:false},
    subtitulo:[
        {
          subtitulo_numero:{type:String,required:false},
          subtitulo_nome:{type:String,required:false}
        }
    ],
     createAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
       type:Date,
       required:false
   }
})
Raq_plano_subtitulo.plugin(mongoosePaginate);
mongoose.model("raq_plano_subtitulo",Raq_plano_subtitulo)