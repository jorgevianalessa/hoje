const { ObjectId, Long, Int32, Double, Decimal128 } = require('mongodb');
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
// Está tabela guarda os dados de todos os lojista do site
const sample_Roupa = new Schema ({
        fornec_id:{type:String,required:false},         
        razaofornec:{type:String,required:false}, 
        marcaloja:{type:String,required:false}, 
        loja_id:{type:String,required:false}, 
        codigo:{type:String,required:false},
        descricao:{type:String,required:false},
        complete:{type:String,required:false},          
        tecido:{type:String,required:false},
        artigo:{type:String,required:false},
        posicao:{type:Number,required:false},
        page:{type:String,required:false},
        pageurl:{type:String,required:false},
        ponto:{type:Number,required:false},
        titulo:[
                {type:String,required:false},    // adulto,teen,baby
        ], 
        cores:[
                {
                obj:{type:Number,required:false}, 
                fase:{type:Number,required:false}, 
                urlfront:{type:String,required:false},   
                urlleft:{type:String,required:false}, 
                urlback:{type:String,required:false}, 
                urlright:{type:String,required:false}, 
                cor:{type:String,required:false},   
                corback:{type:String,required:false},         
                corfront:{type:String,required:false},         
                corinput:{type:String,required:false}, 
                especificacao:[
                        {
                        tamanho:{type:String,required:false},
                        qte:{type:Number,required:false},
                        precocusto:{type:Number,required:false},
                        precovista:{type:Number,required:false},
                        precoprazo:{type:Number,required:false},
                        }
                ]
                },
                ],
        //},
        createAt:{
                type:Date,
                default:Date.now()
        },
        updateAt:{
                type:Date,
                required:false
        },
             
                
 })

sample_Roupa.plugin(mongoosePaginate);
mongoose.model("sample_roupa",sample_Roupa)

