const { model,Schema } = require('mongoose');

const imageupSchema = new Schema({
    loja:{
        id:{type:String,required:true},
        razao:{type:String,required:true},
        posicao:
            {
            number:{type:String,required:true},// posição que vai ficar no site
            detalhes:{
                    pos:{type:String,required:false},
                    url:{type:String,required:false},
                    nameprod:{type:String,required:false},
                    precoprod:{type:String,required:false},
                    condpagamento:{type:String,required:false},
            }
        },
        createAt:{
                    type:Date,
                    default:Date.now()
                },
        updateAt:{
                   type:Date,
                   required:false
        }         
    },

   
})

module.exports = model('uploadimage',imageupSchema);
