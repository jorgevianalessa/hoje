const { ObjectId, Long, Int32, Double, Decimal128 } = require('mongodb');
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
// Está tabela guarda os dados de todos os lojista do site
const sample_Mconstrucao = new Schema ({
        loja_id:{type:String,required:false}, 
        marcaloja:{type:String,required:false}, 
        cidade:{type:String,required:false}, 
        bairro:{type:String,required:false}, 
        codigo:{type:String,required:false},
        fornecedor:{type:String,required:false},
        descricao:{type:String,required:false},
        complete:{type:String,required:false},          
        referencia:{type:String,required:false},
        qte:{type:Number,required:false},
        qte_negativa:{type:Number,required:false},
        qte_reservada:{type:Number,required:false},
        e_max:{type:Number,required:false},
        e_min:{type:Number,required:false},
        precocusto:{type:Number,required:false},
        precovista:{type:Number,required:false},
        precoprazo:{type:Number,required:false},
        artigo:{type:String,required:false},
        marcaItem:{type:String,required:false},
        page:{type:String,required:false},
        pageposicao:{type:Number,required:false},
        pageurl:{type:String,required:false},  
        pageok:{type:String,required:false},  
        ponto:{type:Number,required:false},
        figure_mini:{type:String,required:false}, 
        figure_media:{type:String,required:false}, 
        localizacao:[
                 {
                    segmento:{type:String,required:false},
                    setor:[
                            {
                             nameSetor:{type:String,required:false},
                             secao:[ 
                                     {nameSecao:{type:String,required:false}}
                                   ]
                             },
                         ]
                },
                // organiza de acordo com segmento:loja ou prestação de serviço
                //{ template:{type:String,required:false},}
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

sample_Mconstrucao.plugin(mongoosePaginate);
mongoose.model("sample_mconstrucao",sample_Mconstrucao)

