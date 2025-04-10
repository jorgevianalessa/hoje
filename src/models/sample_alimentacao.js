const { ObjectId, Long, Int32, Double, Decimal128 } = require('mongodb');
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
// Está tabela guarda os dados de todos os lojista do site
const sample_Alimentacao = new Schema ({
        marcaloja:{type:String,required:false}, 
        loja_id:{type:String,required:false}, 
        codigo:{type:String,required:false},
        prato:{type:String,required:false},
        acompanhamento:{type:String,required:false},          
        numeropessoas:{type:String,required:false},
        preco:{type:Number,required:false},
        artigo:{type:String,required:false},
        page:{type:String,required:false},
        pageposicao:{type:Number,required:false},
        pageurl:{type:String,required:false},  
        pageok:{type:String,required:false},  
        ponto:{type:Number,required:false},
        setor:[
                {
                  setor:{type:String,required:false},
                  template:{type:String,required:false},
                  material:{type:String,required:false},
                  sub:[
                        {
                          depto:{type:String,required:false},      
                        }
                  ]
                }
        ], 
        createAt:{
                type:Date,
                default:Date.now()
        },
        updateAt:{
                type:Date,
                required:false
        },
             
                
 })

sample_Alimentacao.plugin(mongoosePaginate);
mongoose.model("sample_alimentacao",sample_Alimentacao)

