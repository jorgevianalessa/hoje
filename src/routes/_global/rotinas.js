const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../../models/fornecedor');
const Fornecedor = mongoose.model('fornec');
require('../../models/segmentos_');
const Segmento = mongoose.model('segmentos');
require('../../models/lojista');
const Lojista = mongoose.model('lojista');

router.get('/pegasegmento/:id',(req,res)=>{
    console.log('');
    console.log('____________________________________________');
    console.log('');
    console.log(' [ 16 ]');
    console.log(' origem views : views/_modelo/raq-fornecedor.handlebars');
    console.log(' origem route : /_global/rotinas/pegasegmento;:id');
    console.log(' obs : busca os segmento vinculados');
    console.log('');
    console.log(' destino : resposta para carregar o select : ');
    console.log('____________________________________________');
    console.log('');

    let Q=req.params;
    let idex=Q.id;
    console.log('==>',idex)
    console.log(' [ 29 ] -> id do lojista : ',idex)
    console.log('');
    // Essa rotina é de passagem do menu para a lista de fornecedores
    Lojista.findOne({_id:`${idex}`},{'segmento':1,razao:1,_id:0})
            .then((result)=>{
                //let result=seg;
                //console.log(result);
                //[result]=result;
               // let [w]=result;
                //result.sort();
                console.log('');
                console.log('valor de segmento :');
                console.log(result);
                res.send(result)
            })    
            .catch((err)=>{
                console.log(err)
            })    
})
module.exports = router;