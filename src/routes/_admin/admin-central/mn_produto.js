const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../../../models/lojista')
const Lojista = mongoose.model('lojista')

router.get('/listfornecImport',(req,res)=>{
    // Essa rotina vem do menu sidebar/admin central para gerar a lista de fornecedores ??
    // Essa rotina vem do handlebars:lj-lista-fornecedor.handlebars 
    console.log('-------------------------------------------') 
    console.log('(11) --> get/_admin/nm_produto/listFornecImport')
    console.log('opção 1-vem de _admincentral/produto/importar')
    console.log('opção 2-vem de _cooperado/lojista/lj-lista-fornecedor.handlebars')
    let [loja]=Object.values(req.params)
    console.log('nome da loja',loja)
    // Essa rotina é de passagem do menu para a lista de fornecedores
 
    Lojista.findOne({razao:loja},{segmento:1,_id:0}).sort({"segmento":1})
              .then((seg)=>{
                  // seg.segmento.sort()
                   console.log('Vr do segmento',seg)
                   if(seg==='null'){
                      console.log(1)
                      res.render("_admin/admin/main_lista-fornec_importando", {layout:'participe.handlebars'})
                   }else{
                     console.log(2)
                     res.render("_admin/admin/main_lista-fornec_importando", {layout:'participe.handlebars',segment:seg,loja:loja})
                   }
              })
              .catch((e)=>{
                console.log(e)
              })
 })


 router.get('/animacao',(req,res)=>{
  //res.render("_animacao/novo", {layout:'animacao/plantas.handlebars'})
  //res.render("_animacao/mapa", {layout:'animacao/plantas.handlebars'})
   //res.render("_animacao/final", {layout:'animacao/plantas.handlebars'})
  //res.render("_animacao/linha-movel", {layout:'animacao/plantas.handlebars'})
  //res.render("_animacao/ponto1", {layout:'animacao/plantas.handlebars'})
  //res.render("_animacao/ponto2", {layout:'animacao/plantas.handlebars'})
  //res.render("_animacao/ponto3", {layout:'animacao/plantas.handlebars'})
  res.render("_animacao/_animacao-home", {layout:'animacao/plantas.handlebars'})
   // res.render("_animacao/line", {layout:'animacao/plantas.handlebars'})
    //res.render("_animacao/animacao", {layout:'animacao/plantas.handlebars'})
    //res.render("_animacao/fightingGames", {layout:'animacao/plantas.handlebars'})
 })

 router.get("/cadastro-cliente",(req,res)=>{
      console.log('cadastrocliente')
  res.render("_animacao/_cadastro-cliente", {layout:'animacao/plantas.handlebars'})
 })

 router.get("/upload-planta-cliente",(req,res)=>{
  console.log('ponto4-upload-planta-cliente')
  res.render("_animacao/_upload-planta-cliente", {layout:'animacao/plantas.handlebars'})
 })

 router.get("/menuAnimacao",(req,res)=>{
   console.log('cadastrocliente')
   res.render("_animacao/_menuProjeto", {layout:'animacao/plantas.handlebars'})
})
 
//  router.get("/menuAnimacao",(req,res)=>{
//     console.log('cadastrocliente')
//    //  res.render("_animacao/ponto4-projeto-cliente", {layout:'animacao/plantas.handlebars'})
//     res.render("_animacao/_menuProjeto", {layout:'animacao/plantas.handlebars'})
//  })

 router.get("/boxLeft",(req,res)=>{
  console.log('projeto-aquecedor')
  let nucleo=req.params
  console.log(nucleo)
  res.render("_animacao/_boxLeft", {layout:'animacao/plantas.handlebars'})
 })

 router.get("/boxRight",(req,res)=>{
   console.log('projeto-aquecedor')
   let nucleo=req.params
   console.log(nucleo)
   res.render("_animacao/_boxRight", {layout:'animacao/plantas.handlebars'})
  })

  router.get("/boxBottom",(req,res)=>{
   console.log('projeto-aquecedor')
   let nucleo=req.params
   console.log(nucleo)
   res.render("_animacao/_boxBottom", {layout:'animacao/plantas.handlebars'})
  })

  router.get("/boxTeto",(req,res)=>{
    console.log('projeto-aquecedor')
    let nucleo=req.params
    console.log(nucleo)
    res.render("_animacao/_boxTeto", {layout:'animacao/plantas.handlebars'})
  })

  router.get("/boxSuspenso",(req,res)=>{
    console.log('projeto-aquecedor')
    let nucleo=req.params
    console.log(nucleo)
    res.render("_animacao/_boxSuspensoAnexo", {layout:'animacao/plantas.handlebars'})
  })

  router.get("/distribuicaoTeto",(req,res)=>{
    console.log('projeto-aquecedor')
    let nucleo=req.params
    console.log(nucleo)
    res.render("_animacao/_distribuicaoTeto", {layout:'animacao/plantas.handlebars'})
  })
 
 router.get("/distribuicao",(req,res)=>{
   console.log('projeto-aquecedor')
   let nucleo=req.params
   console.log(nucleo)
   res.render("_animacao/_distribuicao", {layout:'animacao/plantas.handlebars'})
 })

 router.get("/distribuicaoError",(req,res)=>{
  console.log('projeto-aquecedor')
  let nucleo=req.params
  console.log(nucleo)
  res.render("_animacao/_distribuicaoError", {layout:'animacao/plantas.handlebars'})
})


 router.get("/distribuicao-dupla",(req,res)=>{
  console.log('projeto-aquecedor')
  let nucleo=req.params
  console.log(nucleo)
  res.render("_animacao/_distribuicao-dupla", {layout:'animacao/plantas.handlebars'})
})


 router.get("/eletrica",(req,res)=>{
  console.log('projeto-aquecedor')
  let nucleo=req.params
  console.log(nucleo)
  res.render("_animacao/_eletrica", {layout:'animacao/plantas.handlebars'})
})


router.get("/trindade_canto",(req,res)=>{
  console.log('projeto-aquecedor')
  let nucleo=req.params
  console.log('1212',nucleo)
  res.render("_animacao/trindade/_trindade_canto",{layout:'animacao/plantas.handlebars'})
 })

 router.get("/canto-distribuicao",(req,res)=>{
  console.log('projeto-aquecedor')
  let nucleo=req.params
  console.log('1212',nucleo)
  res.render("_animacao/trindade/_distribuicao-dupla",{layout:'animacao/plantas.handlebars'})
 })

 
module.exports = router;