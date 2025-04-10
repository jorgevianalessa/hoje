const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
// Está tabela guarda os dados de todos os lojista do site
const Raq_Client = new Schema ( {
    razaoNome:{
        type:String,
        required:true,
    },
    assinante:{
        type:String,
        required:true,
        // Se assinante=0 não é assinante não tem direito a publicação.
        // Se assinante=1 é assinante então publica os produtos.
    },
    situacao:{
        type:String,
        required:true,
        // Se ativo=0 está suspenso.
        // Se ativo=1 é em atividade.
    },
    cpfCnpj:{
        type:String,
        required:true
    },
    inscricao:{
        type:String,
        required:true
    },
    site:{
        type:String,
        required:false
    },
    celular:{
        type:String,
        required:true
    },
    telefone:{type:String,required:true
    },
    email:{type:String,required:true
    },
    cep:{type:String,required:false
    },
    logradouro:{
        type:String,
        required:false
    },
    numero:{
        type:String,
        required:false
    },
    complemento:{
        type:String,
        required:false
    },
    cidade:{
        type:String,
        required:false
    },
    bairro:{
        type:String,
        required:false
    },
    estado:{
        type:String,
        required:false
    },
    ativo:{
         // Se for ativo=0 então o lojista não existe mais ou foi descredenciado;
         // Se for ativo=1 está credenciado e atuando
         ativo:{type:String,required:false},
    }, 
    raq:{
        edificio:[
            {
           nome:{type:String,required:false},
           bloco:{type:String,required:false},
           apto:{type:String,required:false},
           qte:{type:String,required:false},
           chave:{type:String,required:false},
            }
        ],
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
Raq_Client.plugin(mongoosePaginate);
mongoose.model("raq_client",Raq_Client)