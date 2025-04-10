const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
// Está tabela guarda os dados de todos os lojista do site
const Lojista = new Schema ( {
    razao:{
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
    template:{
        type:String,
        required:true,
        // direciona o form template.
    },
    atividade:{
        type:String,
        required:true,
        // direciona o form template.
    },
    responsavelHum:{
        type:String,
        required:true
    },
    cpfHum:{
        type:String,
        required:true
    },
    cnpj:{
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
    marca:{
        type:String,
        required:true
    },
    celular:{
        type:String,
        required:true
    },
    telefone:{type:String,required:true
    },
    email:{type:String,required:true
    },
    senha:{type:String,required:true
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
    urllogolista:{
        type:String,
        required:false
    },
    urllogomarca:{
        type:String,
        required:false
    },
    urltitulopage:{
        type:String,
        required:false
    },
    segmento:[
        {
         titulo:{type:String,required:false},
         sub_titulo:[
                    {
                    setor:{type:String,required:false},
                    secao:{type:String,required:false}
                    }
                ],
        },
    ],
    fornecedores:
             [
              {
                fornecId:{type:String,required:false},
                fornecName:{type:String,required:false},
              }

             ], 
    ativo:{
         // Se for ativo=0 então o lojista não existe mais ou foi descredenciado;
         // Se for ativo=1 está credenciado e atuando
         ativo:{type:String,required:false},
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
Lojista.plugin(mongoosePaginate);
mongoose.model("lojista",Lojista)