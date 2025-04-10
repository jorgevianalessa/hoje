const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
// Está tabela guarda os dados de todos os lojista do site
const Raq_ControlSaida = new Schema ( {
    numberPgamento:{
        type:String,
        required:true,
    },
    condicao:{
        type:String,
        required:true
    },
    rentabilidade:{
        type:String,
        required:true
    },
    posicao:{
        type:String, // entregue,pendente,cancelado
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
Raq_ControlSaida.plugin(mongoosePaginate);
mongoose.model("raq_controlSaida",Raq_ControlSaida)