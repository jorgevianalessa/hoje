const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
// Está tabela guarda os dados de todos os lojista do site
const ProdutoComercio = new Schema ( {
  validator:{
    $jsonSchema:{
           bsonType:"object",
           required:["codigoBarra","descitivo"],
           properties:{
                codigo:{           // unico para cada produto 
                    bsonType:String,
                    description:"necessário para ...."
                    //required:true
                },
                codigoBarra:{           // unico para cada produto 
                    bsontype:String,
                    //required:false,
                    description:"em teste"
                },
                descritivo:{       // descritivo unico do produto : Pode-se fazer pesquisa pelo descritivo com as primeiras letras
                    type:String,
                    required:true
                },
                especificacao:[    // bitolas,comprimento,largura,cor,voltagem,preço
                            {
                                acabamento: String,
                                comprimento:String,
                                bitola:String,
                            }
                ],
                palavrachaves:[
                    {    //  São palavra chaves para pesquisa por 
                    type:String,
                    required:true
                    }
                ],
                segmento:[
                    {
                    type:String,
                    required:false
                    }
                ],
                segmento01:[
                    {
                    type:String,
                    required:false
                    }
                ],
                segmento02:[
                    {
                    type:String,
                    required:false
                    }
                ],
                fornecedores:[   // unico devido código do produto obedecer o código do fabricante;
                    id_fornec={     
                        type:String,
                        required:true
                    },
                ],
                marca:{
                    type:String,
                    required:true
                },
                id_lojista:[    
                        // vários logistas podem vender esse produto
                    {
                        identificador:[
                            bsonType=String,
                            required=false
                            ]  
                        },
                        {
                            preco:[  
                                type=String,
                                required=false
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
                }
            } 
         }     
       } 
})

ProdutoComercio.plugin(mongoosePaginate);
mongoose.model("produto",ProdutoComercio)