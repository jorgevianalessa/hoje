const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Está tabela guarda os dados dos fornecedores do comércio
const Fornecedor = new Schema ( {
    dados:[
        {
            razao:{
                type:String,
                required:false
            },
            cnpj:{
                type:String,
                required:true,
                unique:true
            },
            inscricao:{type:String,required:false},
            marca:{
                type:String,
                required:false
            },
            email:{
                type:String,
                required:false
            },
        }
    ],
    qlojistas:
           [
              {
                lojaid:{type:String,required:false},
                lojaname:{type:String,required:false},
                lojasegmento:{type:String,required:false},
                number_contabil:{type:String,required:false},
                ativo:{type:Number,required:false}
              } 
           ],
    address:[
        {
            cep:{
                type:String,
                required:false
            },
            logradouro:{
                type:String,
                required:false
            },
            numero:{
                type:String,
                required:false
            },
            bairro:{
                type:String,
                required:false
            },
            cidade:{
                type:String,
                required:false
            },
            estado:{
                type:String,
                required:false
            },
        }
    ],
    contato:[
        {
            representante:[
                {
                    nome:{},
                    email:{},
                    celular:{}
                }
            ],
            comercial:[
                {
                    nome:{},
                    email:{},
                    celular:{}
                }
            ],
            tecnica:[
                {
                    nome:{},
                    email:{},
                    celular:{}
                }
            ],
        }
   ],
   createAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
       type:Date,
       required:false
   }
})


// Fornecedor.virtual('Id').get(function(){
//     return this._id;
// });

// produtos: [
    //         {
    //             codigo: {
    //                 type:String,
    //                 required:true
    //             },
    //             descritivo:{
    //                 type:String,
    //                 required:true
    //             } 
    //         },
    // ],

mongoose.model("fornec",Fornecedor)