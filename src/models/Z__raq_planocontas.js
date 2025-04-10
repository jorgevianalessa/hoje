

// Incluir em cada conta o histórico de lançamento

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
// Está tabela guarda os dados de todos os lojista do site
const Raq_planoctas = new Schema ( {
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
    titulo:{
        vetor:{type:Number,required:false},
        titulo_numero:{type:String,required:false},
        titulo_nome:{type:String,required:false}
    }
    ,
    sub_titulo:{
        sub_vetor:{type:Number,required:false},
        sub_numero:{type:String,required:false},
        sub_nome:{type:String,required:false},
    },
    conta:{
        cta_vetor:{type:String,required:false},
        cta_numero:{type:String,required:false},
        cta_nome:{type:String,required:false}
    },
    parametros: {
        params:{type:String,required:false},
        params_parametro:{type:String,required:false},
        params_numeroconta:{type:String,required:false},
        params_nomeconta:{type:String,required:false},

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
Raq_planoctas.plugin(mongoosePaginate);
mongoose.model("raq_planoctas",Raq_planoctas)