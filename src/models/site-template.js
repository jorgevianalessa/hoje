const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
// Está tabela guarda os dados de todos os lojista do site
const site_Template = new Schema (
        [
            {
                idexterno:{    
                    // unico para cada produto 
                    type:String,
                    required:false,
                    unique:true
                },
                razao:{  // descritivo unico do produto : Pode-se fazer pesquisa pelo descritivo com as primeiras letras:exemplo-> torneira lavatório
                    type:String,
                    required:true
                },
                template:{
                      type:String,
                      required:false
                },
                palavrachaves:[
                     {
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
                secao:[
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
                createAt:{
                    type:Date,
                    default:Date.now()
                },
                updateAt:{
                    type:Date,
                    required:false
                }
            }
        ]
)

site_Template.plugin(mongoosePaginate);
mongoose.model("site_template",site_Template)