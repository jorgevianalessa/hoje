const { type } = require('express/lib/response');
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
// Está tabela guarda os dados de todos os lojista do site
const Raq_boleta = new Schema ( {
    numberChave:{
        type:String,
        required:false,
    },
    data:{
        type:String,
        required:false
    },
    posicao:{
        type:String, 
        required:false
    },
    rotor:{index:{}},
    boleta:
           { 
             chave:{type:String,  required:false},
             credito:
                {
                  numeroconta:{type:String,  required:false},
                  nomeConta:{type:String,  required:false},
                  historico:{type:String,  required:false},
                  valor:{type:String,  required:false},
                }  
              ,
              debito:
                {
                  numeroconta:{type:String,  required:false},
                  nomeConta:{type:String,  required:false},
                  historico:{type:String,  required:false},
                  valor:{type:String,  required:false},
                }  
               ,               
           }
    ,
   // fluxo:[
   //        {
   //          chave:{type:String,  required:false},
   //          histórico:{type:String,  required:false},
   //          posicao:{type:String,  required:false},
   //          numero_conta:{type:String,  required:false},
   //          nome_conta:{type:String,  required:false},
   //          numero_cpartida:{type:String,  required:false},
   //          nome_cpartida:{type:String,  required:false},
   //          vencimento:{type:String,  required:false},
   //          valor:{type:Number,  required:false},
   //          pagamento:{type:String},
   //          observacao:{type:String,  required:false},
   //        }
   // ],
    operacao:{
            origemoperacao:{}       
    },
    chaveClose:{
        chaveClose:{type:Number,  required:false}
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
Raq_boleta.plugin(mongoosePaginate);
mongoose.model("raq_boleta",Raq_boleta)