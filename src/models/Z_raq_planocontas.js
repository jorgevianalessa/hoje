

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
    conta:
        {
            operador:{type:String,required:false},
            vetor:{type:String,required:false},
            nmvetor:{type:String,required:false},
            numeroTituloCta:{type:String,required:false},
            nomeTituloCta:{type:String,required:false},
            vetor_sub:{type:String,required:false},
            nmvetor_sub:{type:String,required:false},
            numeroSubCta:{type:String,required:false},
            nomeSubCta:{type:String,required:false},
            vetor_cta:{type:String,required:false},
            nmvetor_cta:{type:String,required:false},
            numeroConta:{type:String,required:false},
            nomeConta:{type:String,required:false}
        }
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
Raq_planoctas.plugin(mongoosePaginate);
mongoose.model("raq_planoctas",Raq_planoctas)