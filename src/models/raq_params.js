


// Incluir em cada conta o histórico de lançamento

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
// Está tabela guarda os dados de todos os lojista do site
const Plano_params = new Schema ( {
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
    parametros:{
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
Plano_params.plugin(mongoosePaginate);
mongoose.model("plano_params",Plano_params)