const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config({path:'./.env'});

require('../../../models/lojista');
const Lojista = mongoose.model('lojista');

require('../../../models/sample_mconstrucao')
const Mconstrucao=mongoose.model('sample_mconstrucao');

require('../../../models/sample_mconstrucao');
const Sample = mongoose.model('sample_mconstrucao');

router.get('/produto/:id',async(req,res)=>{
    console.log('');
    console.log('_______________________________________________');
    console.log(' [ 18 ] ');
    console.log('origem views : views/_cooperado/sample/raqsystem/menu-compra_venda');
    console.log(" origem route : _sample/raq-rotinas")
    console.log(' obs : Vem do Menu Produto de CompraVenda/RAQSystem  para o cadastro de Produto ');
    console.log('');
    console.log(' destino : ');
    console.log('')
    let id=req.params.id
    console.log(id)
    Lojista.find({_id:id})
           .then((resp)=>{
              console.log(resp)
              resp=resp[0];
              let segmento=resp.segmento
              console.log(segmento)
              //---------------------------------------------------
              res.render("_cooperado/sample/raqsystem/compras/cad_produto",{layout:'lojista/templete3.handlebars',lojista:resp,segmento:segmento})
           })
           .catch((err)=>{
              console.log(err)
           })
    
  })

  router.get('/listaProduto/:id',async(req,res)=>{
    console.log('');
    console.log('[ 478 ]');
    console.log(' origem views : views/_cooperado/sample/raqsystem/menu-comp´ra_venda');
    console.log(' origem route : routes/_sample/raqsystem/listaProduto/:id');
    console.log(' destino : retorna para preencher o cbo SelectSecoes');
    console.log('');
    console.log(req.params)
    let id=req.params.id;
    let lojista=id;
    
    Mconstrucao.find({loja_id:id})
               .then((result)=>{
                res.render("_cooperado/sample/raqsystem/compras/lista-produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result:result});
               })
               .catch((err)=>{
                  console.log(err)
               })
  })

  module.exports = router;