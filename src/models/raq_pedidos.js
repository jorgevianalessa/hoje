const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
// Está tabela guarda os dados de todos os lojista do site
const Raq_Pedido = new Schema ( {
    numberPedido:{
        type:String,
        required:false,
    },
    numberFornec:{
        type:String,
        required:false
    },
    nomeFornec:{
        type:String,
        required:false
    },
    comprador:{
        type:String, 
        required:false
    },
    posicao:{
        type:String, 
        required:false
    },
    itens:[
          {
                IdProduto:{type:String,  required:false},
                codigoProduto:{type:String,  required:false},
                qte:{type:String,  required:false},
                descricao:{type:String,  required:false},
                custo:{type:String,  required:false},
                venda:{type:String,  required:false}
           }
    ],
    condicaoPg:{number:{type:String,  required:false}},
    local:{
        endlocal:[
            {
                nomelocal:{type:String,required:false},
                bloco:{type:String,required:false},
                apto:{type:String,required:false},
                qte:{type:String,required:false},
                chave:{type:String,required:false},
            }
        ],
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
Raq_Pedido.plugin(mongoosePaginate);
mongoose.model("raq_pedido",Raq_Pedido)