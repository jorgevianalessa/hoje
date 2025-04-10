const { render } = require("express-handlebars");
const { ObjectId } = require("mongodb");
const mongoose = require('mongoose');

require('../models/sample_alimentacao');
const Alimentacao = mongoose.model('sample_alimentacao');

//require('../models/sample_mconstrucao');
//const Sample = mongoose.model('sample_mconstrucao');

require('../models/sample_mconstrucao')
const Mconstrucao=mongoose.model('sample_mconstrucao')

require('../models/lojista');
const Lojista = mongoose.model('lojista');



const uploadFoto =async (req,res) =>{
    console.log('');
    console.log('___________________________________');
    console.log('');
    console.log(' [ 23 ] editafoto.controllers ]');
    console.log(' origem views : src/libs/multer.js');
    console.log(' origem route : src/controllers/editafoto.controllers.js');
    console.log(' obs : aqui grava no MongoDb o path da imagem da OceanDigital');
    console.log('');
    console.log(' destino : views/_cooperado/sample/m,aterialconstrucao/edita-foto.handlebars');
    console.log('');
    console.log(' ___________________________________');
    console.log('');
    //......................................................
    let corpo=req.body;
    let local=req.file.location;
    let idProduto=corpo.idProduto;;
    let loja_id=corpo.nameLoja_id;
    let setor=corpo.nameSetor;
    console.log('____________________________________________________')
    //........................................................
    console.log('');
    console.log( 'local => ',local);
     console.log( 'setor => ',setor);
    console.log('________________________________________________________');
    
    Mconstrucao.updateOne(
                    {
                        $and:[
                              {_id:idProduto},
                              {loja_id:loja_id},
                            ],
                    }, 
                    {
                        $set:{
                               pageurl:local,
                            }
                    }
                )
                .then((result)=>{
                  console.log(result);
                  goCooperado();
                })
                .catch((e)=>{
                console.log(e)
                })

async  function  goCooperado(){
    Lojista.findOne({_id:loja_id})
           .then((lojista)=>{
               console.log(lojista) 
               goPage(lojista)
           })
           .catch((err)=>{
               console.log(err)
           }) 
}


async function goPage(lojista){
            //////////////////////////////////////////
            Mconstrucao.find({loja_id:loja_id})
                       .then((result)=>{
                          res.render("_cooperado/sample/materialconstrucao/cad_construcao_produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result:result});            
                       })
                       .catch((er)=>{
                          console.log(er)
                       })
            }
}













const getFiles1 =async (req,res) =>{

}

module.exports = {
    getFiles1,
    uploadFoto
}
