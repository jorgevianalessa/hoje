const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const path =require('path');
require('dotenv').config({path:'./.env'})

const { upload } = require('../../libs/multer');
const { upload1 } = require('../../libs/multer');
const { uploadFile,getFiles } = require('../../controllers/sample.controllers');
const { uploadFoto } = require('../../controllers/editafoto.controllers');
const { ListObjectVersionsCommand } = require('@aws-sdk/client-s3');
const { ObjectId, MongoServerClosedError } = require('mongodb');
const { off, send } = require('process');
const { serialize } = require('v8');

require('../../models/sample_alimentacao');
const Alimentacao = mongoose.model('sample_alimentacao');


require('../../models/sample_mconstrucao');
const Sample = mongoose.model('sample_mconstrucao');

require('../../models/sample_mconstrucao')
const Mconstrucao=mongoose.model('sample_mconstrucao')

require('../../models/lojista');
const Lojista = mongoose.model('lojista');

require('../../models/segmentos_')
const Segmentos = mongoose.model('segmentos')

// Essa rotina direciona qual page será mostrada de acordo com os itens particulariedade  de cada produto.
router.get('/lista_produto/:id',async(req,res)=>{
   console.log('');
   console.log('[ 36 ]');
   console.log('Vai buscar o lojista correspondente ao idClient')
   console.log(' origem views : views/_cooperado/admin/admincooperado-sample.handlebars');
   console.log(' origem route : routes/_sample/rotas.js/cadastro_produto');
   console.log(' destino :');
   console.log('');
   let idClient=req.params.id;
   let namesegmento;
   console.log('idClient : ',idClient)
   //............................................
   Lojista.findOne({_id:`${idClient}`})
          .then((lojista)=>{
                  namesegmento=lojista.segmento;
                  [namesegmento]=namesegmento;
                  console.log('');
                  console.log('__________________________________________');
                  console.log('');
                  let seta=namesegmento.titulo;
                  console.log(' nome do setor do cliente : ' ,seta);
                  console.log('');
                 // console.log('[ 50 ]');
                  console.log(' número do cliente : ',idClient);
                  console.log('__________________________________________');
                  console.log('');
                  if(seta==="Agricultura"){
                        
                  }else if(seta==="Alimentação"){
                     buscaAlimentacao(lojista)
                  }else if(seta==="Automóveis"){
                     
                  }else if(seta==="Comércio Exterior"){
                     
                  }else if(seta==="Comunicação"){
                     
                  }else if(seta==="Construção Civil"){
                     
                  }else if(seta==="Educação"){
                     
                  }else if(seta==="Estética"){
                     
                  }else if(seta==="Eletrônicos Fotografia"){
                     
                  }else if(seta==="Informática"){

                  }else if(seta==="Material de Construção"){
                     buscaMaterialContrucao(lojista)
                  }else if(seta==="Móveis Decoração"){
                     
                  }else if(seta==="Pets"){
                     
                  }else if(seta==="Roupas"){
                     buscaRoupas(lojista)
                  }else if(seta==="Saúde"){
                     
                  }else if(seta==="Serviço"){
                     
                  }else if(seta==="Turismo"){
                     
                  }
          })
          .catch((e)=>{
             console.log(e)
          })


          async function buscaAlimentacao(lojista){
                Alimentacao.find({loja_id:idClient})
                      .then((result)=>{
                           console.log('');
                           console.log(result)
                           //return
                           res.render("_cooperado/sample/alimentacao/cad_alimentacao_produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result,result});
                      })
                      .catch((e)=>{
                           console.log(e)
                     })     
          }

          async function buscaMaterialContrucao(lojista){
                console.log('------------------------------------')
                console.log(idClient);
                console.log('__________________________________________')
                Mconstrucao.find({loja_id:idClient})
                      .then((estoque)=>{
                          console.log('[ 121 ] buscando os produtos do cliente ');
                          let S=estoque[0].localizacao;
                          [S]=S;
                          console.log('[ nome do segmento : ]',S.segmento)
                          let R=S.setor;
                          console.log('[ dados do setor : ]',R)
                          console.log('-----------------------------------------------')
                          res.render("_cooperado/sample/materialconstrucao/lista-produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result:estoque});
                      })
                      .catch((e)=>{
                         console.log(e)
                      })     
          }

          async function buscaRoupas(lojista){
                Sample.find({loja_id:idClient})
                      .then((result)=>{
                           res.render("_cooperado/sample/roupas/cad_roupas_produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result,result});
                      })
                      .catch((e)=>{
                        console.log(e)
                      })  
          }
})

router.get('/cadastro_produto/:id',async(req,res)=>{
   console.log('');
   console.log('[ 148 ]');
   console.log('Vai buscar o lojista correspondente ao idClient')
   console.log(' origem views : views/_cooperado/admin/admincooperado-sample.handlebars');
   console.log(' origem route : routes/_sample/rotas.js/cadastro_produto');
   console.log(' destino :');
   console.log('');
   //console.log(req.params)
   let idClient=req.params.id;
   //console.log(typeof(idClient))
   let namesegmento;
   console.log('idClient : ',idClient)
   //............................................
   Lojista.findOne({_id:`${idClient}`})
          .then((lojista)=>{
                  namesegmento=lojista.segmento;
                  [namesegmento]=namesegmento;
                  console.log('');
                  console.log('__________________________________________');
                  console.log('');
                  let seta=namesegmento.titulo;
                  console.log(' nome do setor do cliente : ' ,seta);
                  console.log('');
                 // console.log('[ 50 ]');
                  console.log(' número do cliente : ',idClient);
                  console.log('__________________________________________');
                  console.log('');
                  if(seta==="Agricultura"){
                        
                  }else if(seta==="Alimentação"){
                     buscaAlimentacao(lojista)
                  }else if(seta==="Automóveis"){
                     
                  }else if(seta==="Comércio Exterior"){
                     
                  }else if(seta==="Comunicação"){
                     
                  }else if(seta==="Construção Civil"){
                     
                  }else if(seta==="Educação"){
                     
                  }else if(seta==="Estética"){
                     
                  }else if(seta==="Eletrônicos Fotografia"){
                     
                  }else if(seta==="Informática"){

                  }else if(seta==="Material de Construção"){
                     buscaMaterialContrucao(lojista)
                  }else if(seta==="Móveis Decoração"){
                     
                  }else if(seta==="Pets"){
                     
                  }else if(seta==="Roupas"){
                     buscaRoupas(lojista)
                  }else if(seta==="Saúde"){
                     
                  }else if(seta==="Serviço"){
                     
                  }else if(seta==="Turismo"){
                     
                  }
          })
          .catch((e)=>{
             console.log(e)
          })


          async function buscaAlimentacao(lojista){
                Alimentacao.find({loja_id:idClient})
                      .then((result)=>{
                           console.log('');
                           console.log(result)
                           //return
                           res.render("_cooperado/sample/alimentacao/cad_alimentacao_produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result,result});
                      })
                      .catch((e)=>{
                           console.log(e)
                     })     
          }

          async function buscaMaterialContrucao(lojista){
                console.log('------------------------------------')
                console.log(idClient);
                console.log('__________________________________________')
                Mconstrucao.find({loja_id:idClient})
                      .then((estoque)=>{
                          console.log('[ 121 ] buscando os produtos do cliente ');
                          let S=estoque[0].localizacao;
                          [S]=S;
                          console.log('[ nome do segmento : ]',S.segmento)
                          let R=S.setor;
                          console.log('[ dados do setor : ]',R)
                          console.log('-----------------------------------------------')
                          res.render("_cooperado/sample/materialconstrucao/cad_construcao_produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result:estoque});
                      })
                      .catch((e)=>{
                         console.log(e)
                      })     
          }

          async function buscaRoupas(lojista){
                Sample.find({loja_id:idClient})
                      .then((result)=>{
                           res.render("_cooperado/sample/roupas/cad_roupas_produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result,result});
                      })
                      .catch((e)=>{
                        console.log(e)
                      })  
          }
})
// busca todos os segmentos para indicar qual o produto pertence                                            // Cadastro de ???? 
//router.get("/buscarSetor-CadProduct/:id",async(req,res)=>{
//   console.log('');
//   console.log('__________________________________________');
//   console.log('');
//   console.log(' [ 263 ] ');
//   console.log('');
//   console.log(' origem views : views/_cooperado/lojista/cadastro_produto.handlebars');
//   console.log(' origem route : route/_sample/rotas/buscar_subseg/:id');
//   console.log(' Obs : ');
//   console.log('');
//   console.log(' destino : retorna para lista os2 produtos');
//   console.log('');
//   let p1=req.params.id;
//   console.log(p1)
//   console.log('____________________________________________________');
//   Segmentos.find({segmento:p1})
//            .then((result)=>{
//               console.log('');
//               console.log('');
//               let S1=result[0].setor;
//               console.log('');
//               let l=S1.length;
//               let setor=[]
//               for (let i=0;i<l;i++){
//                 setor.push(S1[i].name)
//               }
//               setor.sort();
//               console.log('');
//               console.log(setor)
//               res.send(setor);
//            })
//            .catch((e)=>{
//                  console.log(e)
//            }) 
//            
//})

// Essa rotina pertence ao Cadastro de Produtos Material de Construção
router.get('/buscarSetor-CadProduct/:id',async(req,res)=>{
   console.log('');
   console.log('[ 303 ]');
   console.log(' origem views : views/_cooperado/sample/cadastro_produto.handlebars');
   console.log(' origem route : routes/_sample/rotas.js/buscarSetor-CadProduct');
   console.log(' destino : retorna para preencher o cbo Select');
   console.log('');
   console.log(req.params)
   let idClient=req.params.id;
   Lojista.find({_id:idClient},{'segmento.titulo':1})
          .then((segmentos)=>{
              // console.log(segmentos)
               console.log('--------------------------------')
               let setor;
               [setor]=segmentos;
               let titulo=setor.segmento;
               console.log('');
               console.log(' título principal => ',titulo);
               console.log('');
               console.log('--------------------------------')
               res.send(titulo)
          }) 
          .catch((e)=>{
             console.log(e)
          })
})

router.get('/buscaSecoes-CadProduct/:id',async(req,res)=>{
   console.log('');
   console.log('[ 330 ]');
   console.log(' origem views : views/_cooperado/sample/raqsystem/cad_produto.handlebars');
   console.log(' origem route : routes/_sample/rotas.js/buscaSecoes-CadProduct/:id');
   console.log(' destino : retorna para preencher o cbo SelectSecoes');
   console.log('');
   console.log(req.params)
    Segmentos.find({segmento:p1})
    .then((result)=>{
       console.log(result)
       res.send(result);
    })
    .catch((err)=>{
      console.log(err);
    })

})

// Essa rotina busca os setores correspondente ao segmento selecionado do produto.
// Pertence a cadastro do produto para edição
router.get('/Segmento-EditaProduct/:id',async(req,res)=>{
   console.log('');
   console.log('[ 202 ]');
   console.log(' origem views : views/_cooperado/sample/cadastro_produto.handlebars');
   console.log(' origem route : routes/_sample/rotas.js/buscar_setores');
   console.log(' destino : retorna para preencher o cbo Select');
   console.log('');
   console.log(req.params)
   let idClient=req.params.id;
   Lojista.find({_id:idClient},{'segmento.titulo':1})
          .then((segmentos)=>{
              // console.log(segmentos)
               console.log('--------------------------------')
               let setor;
               [setor]=segmentos;
               let titulo=setor.segmento;
               console.log('');
               console.log(titulo);
               console.log('');
               console.log('--------------------------------')
               res.send(titulo)
          }) 
          .catch((e)=>{
             console.log(e)
          })
})

// Essa rotina é para a Edição do produto
router.get('/Segmento-EdicaoProduct/:id',async(req,res)=>{
   console.log('');
   console.log('[ 230 ]');
   console.log(' origem views : views/_cooperado/sample/cadastro_produto.handlebars');
   console.log(' origem route : routes/_sample/rotas.js/buscar_artigos');
   console.log(' destino : retorna para preencher o cbo Select');
   console.log('');
   console.log(req.params)
   let idClient=req.params.id; 
   Lojista.find({_id:idClient},{'segmento.titulo':1})
          .then((result)=>{
             //console.log('247',result)
             console.log('___________________________');
             let p;
             [p]=result
            // console.log(p.segmento)
             const titulos=[];
             p=p.segmento
             let l=p.length;
             for(let i=0;i<l;i++){
                console.log(p[i].titulo,'=>',i)
                let n=p[i].titulo
                ArrayN(n)
              }

              function ArrayN(n){
                  titulos.push(n)
              }
             console.log('___________________________');
             console.log('');
             console.log('___________________________');
             console.log( '268',titulos)
             console.log('___________________________');
             res.send(titulos)
          })
          .catch((er)=>{
              console.log(er)
          })
})

router.get('/Segmento-EdicaoProduct_/:id',async(req,res)=>{
   console.log('');
   console.log('[ 230 ]');
   console.log(' origem views : views/_cooperado/sample/cadastro_produto.handlebars');
   console.log(' origem route : routes/_sample/rotas.js/buscar_artigos');
   console.log(' destino : retorna para preencher o cbo Select');
   console.log('');
   console.log(req.params)
   let idClient=req.params.id; 
   Lojista.find({_id:idClient},{'segmento':1})
          .then((result)=>{
             //console.log('247',result)
             console.log('___________________________');
             let p;
             [p]=result
            // console.log(p.segmento)
             const titulos=[];
             p=p.segmento
             let l=p.length;
             for(let i=0;i<l;i++){
                console.log('item 0',p[i].titulo,'=>',i)
                console.log('item 1',p[i]._id,'=>',i)
                let n=p[i].titulo + "--" + p[i]._id
                ArrayN(n)
              }

              function ArrayN(n){
                  titulos.push(n)
              }
             console.log('___________________________');
             console.log('');
             console.log('___________________________');
             console.log( '268',titulos)
             console.log('___________________________');
             res.send(titulos)
          })
          .catch((er)=>{
              console.log(er)
          })
})

// 
router.get("/Setor-EditaProduct/:id",async(req,res)=>{
   console.log('');
   console.log('__________________________________________');
   console.log('');
   console.log(' [ 282 ] ');
   console.log('');
   console.log(' origem views : views/_cooperado/lojista/cadastro_produto.handlebars');
   console.log(' origem route : route/_sample/rotas/buscar_subseg/:id');
   console.log(' Obs : ');
   console.log('');
   console.log(' destino : retorna para lista os produtos');
   console.log('');
   let p1=req.params.id;
   console.log(p1)
   console.log('____________________________________________________');
   Segmentos.find({segmento:p1})
           .then((result)=>{
                console.log('[ 295 ] ',result)
                result=result[0]
                let S1=result.setor
                console.log('---------------------------------')
                let l=S1.length;
                console.log('');
                console.log('comprimento do array ',l);
                let nameSetor=[];
                console.log('');
                for (let i=0;i<l;i++){
                    let name=S1[i].name;
                   // console.log('nome ', name,'ordem :',i)
                    fixarArray(name)
                }
                function fixarArray(name){
                  nameSetor.push(name);
                }
                //console.log(nameSetor)
                res.send(nameSetor)
           })
           .catch((e)=>{
                console.log(e)
           }) 
            
})

router.get("/Secao-EdicaoProduct/:id",async(req,res)=>{
   
   console.log('');
   console.log('__________________________________________');
   console.log('');
   console.log(' [ 318 ] ');
   console.log('');
   console.log(' origem views : views/_cooperado/lojista/cadastro_produto.handlebars');
   console.log(' origem route : route/_sample/rotas/buscar_subseg/:id');
   console.log(' Obs : ');
   console.log('');
   console.log(' destino : retorna para lista os produtos');
   console.log('');
   let p1=req.params.id;
   console.log(' [ 327 ] =>',p1)
   console.log('____________________________________________________');
   //return
   Segmentos.find({
              $and:[
                {segmento:"Material de Construção"},
                {'setor.name':p1}
              ]
           },{setor:1})
           .then((result)=>{
                console.log('[ 332 ] ',result)
                result=result[0]
                let S1=result.setor
                console.log('---------------------------------')
                console.log(' [ 299 ] ==> ',S1[0].name);
              //  return
                //[S1]=S1
                let l=S1.length;
                console.log('');
               // console.log('comprimento do array ',l);
                let nameSetor=[];
                console.log('');
              //  return
                for (let i=0;i<l;i++){
                    let setor1=S1[i].name;
                    if (p1==setor1){
                     let name=S1[i].secao;
                     console.log('nome ', name,'ordem :',i)
                     fixarArray(name)
                    }
                  
                }
                function fixarArray(name){
                   console.log('===>',name)
                  nameSetor.push(name);
                }
                //console.log(nameSetor)
                res.send(nameSetor)
           })
           .catch((e)=>{
                console.log(e)
           }) 
            
            
})

router.post('/insere_produto',async(req,res)=>{
    console.log('');
    console.log('__________________________________________');
    console.log('');
    console.log(' [ 217 ] ');
    console.log('');
    console.log(' origem views : views/_cooperado/lojista/cadastro_produto.handlebars');
    console.log(' origem route : route/_sample/rotas/insere_produto');
    console.log(' Obs : ');
    console.log('');
    console.log(' destino : retorna para lista os produtos');
    console.log('');
    //...............................................
    let nucleo=req.body;
    console.log(nucleo)
    //................................................
    let loja_id=nucleo.nameIdLoja;
    let marcaloja=nucleo.nameMarcaLoja;
    let codigo=nucleo.nameCodigo;
    let descricao=nucleo.nameDescricao;
    let complete=nucleo.nameComplete;
    let material=nucleo.nameMaterial;
    let vista=parseFloat(nucleo.nameVista)
    let prazo=parseFloat(nucleo.namePrazo);
    let setor=nucleo.nameSetor;
    let artigo=nucleo.nameArtigo;
    let marcaItem=nucleo.nameMarcaItem;
    let page='default';
    let pageposicao=0;
    let pageurl='https://';
    
    ////////////////////////////////////////////////////////
    await Sample.insertMany({
        marcaloja:`${marcaloja}`,
        loja_id:`${loja_id}`,
        codigo:`${codigo}`,
        descricao:`${descricao}`,
        complete:`${complete}`,
        referencia:`${material}`,
        precovista:parseFloat(`${vista}`),
        precoprazo:parseFloat(`${prazo}`),
        artigo:`${artigo}`,
        marcaItem:`${marcaItem}`,
        page:`${page}`,
        pageposicao:`${pageposicao}`,
        pageurl:`${pageurl}`,
        pageok:'no',
        ponto:0,
        notafiscal:0,
        localizacao:[
                {
                  segmento: `${setor}`,
                  setor:artigo,
                  seccao:[{depto:"acabamento"}],
                  template:"loja",
                }
              ]
    })
    .then((result)=>{
        console.log('');
        console.log('_________________________________________________________');
        //console.log('[ 138 ] result => ',result)
        ////////////////////////////////////////////////////////////
        Lojista.findOne({_id:`${loja_id}`})
               .then((lojista)=>{
                   console.log('');
                   console.log('ficha do lojista :',lojista);
                   //result=result[0];
                   Sample.find({loja_id:loja_id}).sort({pageposicao:1})
                         .then((result)=>{
                            console.log('');
                            console.log(' [ 148 ] ',result);
                            console.log('___________________________________');
                            res.render("_cooperado/sample/materialconstrucao/cadastro_produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result:result});
                         })
                         .catch((e)=>{
                           console.log(' [ 96 ', e)
                         })  
               })
               .catch((e)=>{

               })
       
        
       //.........................................................    
    })
    .catch((err)=>{
        console.log(err,'ESTÁ ERRADA! 391', err)
    })
  });
  
router.post('/upload/',upload,uploadFile);
router.post('/upload_edita/',upload,uploadFoto);
router.post('/files',getFiles);

router.get('/deleteproduto/:id',async(req,res)=>{
    let nucleo=req.params;
    console.log('');
    console.log("DELETE!",nucleo)
})

router.get('/editarfoto/:id',async(req,res)=>{
    console.log('');
    console.log('__________________________________________');
    console.log('');
    console.log(' [ 661 ] ');
    console.log('');
    console.log(' origem views : views/_cooperado/lojista/cadastro_produto.handlebars');
    console.log(' origem route : route/_sample/rotas/editarfoto');
    console.log(' Obs : ');
    console.log('');
    console.log(' destino : retorna para lista os produtos');
    console.log('');
    //...............................................
    let nucleo=req.params;
    console.log('');
    console.log("Foto!",nucleo)
    let idProduto=nucleo.id;
    Sample.findOne({_id:idProduto})
          .then((result)=>{
            console.log('');
            console.log(' [ 337 ] ',result)
            let setor=result.localizacao;
            [setor]=setor;
            console.log('nome do setor',setor.setor);
            console.log('');
            res.render("_cooperado/sample/materialconstrucao/edita-foto",{ layout:'sample/formata-produto.handlebars',result:result,setor:setor});
          })
          .catch((e)=>{
             console.log(e)
          })
})

router.get('/editaproduto/:id',async(req,res)=>{
   console.log('');
   console.log('__________________________________________');
   console.log('');
   console.log(' [ 693 ] ');
   console.log('');
   console.log(' origem views : views/_cooperado/sample/materialconstrucao/cad_construção_produto.handlebars');
   console.log(' origem route : route/_sample/rotas/editaproduto');
   console.log(' Obs : ');
   console.log('');
   console.log(' destino : retorna para lista os produtos');
   console.log('');
   //...............................................
   let nucleo=req.params;
   console.log(' [ 703 ]',nucleo.id);
   //console.log("EDITA!",nucleo)
   let corpo=[];
   let sub={};
   let nameSegmento;
   let nameSetor;
   let nameSecao;
   let opcao=0;
   let idProduto=nucleo.id;
         Sample.findOne({_id:idProduto})
                   .then((produto)=>{
                     console.log(' 714 ',produto)
                     let segmento=produto.localizacao;
                     let l=segmento.length;
                     let errors=[];
                     for (let i=0;i<l;i++){
                         let palavra=segmento[i];
                         console.log('palavra =>',palavra)
                         nameSegmento=palavra.segmento;
                         if(!nameSegmento || typeof nameSegmento == undefined || nameSegmento == null ){ 
                             console.log('bingo!!!!!!')
                             opcao=0;
                             let N=100;
                             sub={
                              id:produto._id,
                              loja_id:produto.loja_id,
                              marcaloja:produto.marcaloja,
                              cidade:produto.cidade,                       
                              bairro:produto.bairro,
                              codigo:produto.codigo,
                              descricao:produto.descricao,
                              complete:produto.complete,
                              referencia:produto.referencia,
                              pvista:produto.precovista,
                              pprazo:produto.precoprazo,
                              artigo:produto.artigo,
                              pageurl:produto.pageurl,
                              marca:produto.marcaItem,                       
                              segmento:'nulo',
                              setor:'nulo',
                              secao:'nulo',
                             }
                         }else{
                              opcao=1
                              console.log(' [ 746 ]',palavra)
                              console.log('segmento :',nameSegmento)
                              console.log('<><><><><><><><><><><>');
                              let [setor]=palavra.setor;
                              console.log(' 750  ',setor)
                              console.log('_____________________________')
                              //obj.I
                              if( setor="undefined"){
                                 console.log("bomba")
                              }else{
                                console.log('que tiro foi esse!') 
                                console.log(setor.nameSetor)
                                nameSetor=setor.nameSetor;
                                secao=setor.secao;
                                [secao]=secao;
                                nameSecao=secao;
                                console.log(nameSetor,'<<>>',secao.nameSecao)
                              }
                              console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                             
                             
                              
                              console.log('======================================')
                              let W=[];
                              sub={
                                 id:produto._id,
                                 loja_id:produto.loja_id,
                                 marcaloja:produto.marcaloja,
                                 cidade:produto.cidade,                       
                                 bairro:produto.bairro,
                                 codigo:produto.codigo,
                                 descricao:produto.descricao,
                                 complete:produto.complete,
                                 referencia:produto.referencia,
                                 pvista:produto.precovista,
                                 pprazo:produto.precoprazo,
                                 artigo:produto.artigo,
                                 pageurl:produto.pageurl,
                                 marca:produto.marcaItem,                       
                                 segmento:nameSegmento,
                                 setor:nameSetor,
                                 secao:nameSecao,
                              }
                              if(!setor.setor || typeof setor == undefined || setor == null ){ 
                                 errors.push({ error:"Erro:Necessário preencher o campo nome!"})
                                 console.log('dentro!!!')
                              }else{
                                W.push(setor.nameSetor)
                              } 
                          }
                     }
                     console.log('=====================================================');
                     console.log('________________________________________________________________________');
                    

                    
                     corpo.push(sub)
                     console.log('');
                     console.log(corpo);
                     res.render("_cooperado/sample/materialconstrucao/edita-produto",{ layout:'sample/formata-produto.handlebars',produto:sub});
                   })
                   .catch((e)=>{
                      console.log(e)
                   })
})

router.post('/grava_edicao',async(req,res)=>{
   console.log('');
   console.log('__________________________________________');
   console.log('');
   console.log(' [ 591 ] ');
   console.log('');
   console.log(' origem views : views/_cooperado/sample/materialconstrucao/edita=produto.handlebars');
   console.log(' origem route : route/_sample/rotas/grava_edicao');
   console.log(' Obs : ');
   console.log('');
   console.log(' destino : 1retorna para lista os produtos');
   console.log('');
    //...............................................
   let nucleo=req.body;
   console.log('');
   console.log('',nucleo);
   console.log('');
   let produtoId=nucleo.nameProdutoId;
   let lojaId=nucleo.nameLojaid;
   let codigo=nucleo.nameCodigo;
   let descricao=nucleo.nameDescricao;
   let complete=nucleo.nameComplete;
   let material=nucleo.nameMaterial;
   let pvista=nucleo.namePvista;
   let pprazo=nucleo.namePprazo;
   let segmento=nucleo.nameSegmento;
   let setor=nucleo.nameSetor;
   let secao=nucleo.nameSecao;
   console.log('==> ',secao)
   console.log('_____________________________');
   console.log(produtoId)
   console.log('');
   console.log(lojaId);
   console.log('________________________________');
   console.log(codigo);
   
   Mconstrucao.updateMany({
                         $and:[
                           {_id:produtoId},
                           {loja_id:lojaId},
                               ]
                       },
                       {
                         $set:{
                                  codigo:`${codigo}`,
                                  descricao:`${descricao}`,
                                  complete:`${complete}`,
                                  referencia:`${material}`,
                                  precovista:`${pvista}`,
                                  precoprazo:`${pprazo}`,
                                  localizacao:[
                                    {segmento:segmento,
                                     setor:[
                                            {
                                            nameSetor:setor,
                                            secao:[
                                                 //   {
                                                      secao,
                                                 //   }
                                                   ]
                                               }
                                           ]
                                    }
                                   ]
                                  //]
                              }
                       },
              )
              .then((produto)=>{
                 console.log("=> ",produto)    
                 Lojista.findOne({_id:`${lojaId}`})
                        .then((lojista)=>{
                              Sample.find({loja_id:lojaId}).sort({pageposicao:1})
                                  .then((result)=>{
                                       res.render("_cooperado/sample/materialconstrucao/cad_construcao_produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result:result});
                                  })
                                  .catch((e)=>{
                                    console.log(' [ 469 ]=> ', e)
                                  })  
                        })
                        .catch((e)=>{
                           console.log(' ',e)
                        })
              })
              .catch((err)=>{
                 console.log(err);
              })

      // localizacao:[
      //  {
      //    segmento:`${setor}`,
      //    setor:`${secao}`,
      //    seccao:[`${secao}`],
      //    templete:'loja'
      //  }
    
})

router.post('/grava_edicao_',async(req,res)=>{
   console.log('');
   console.log('__________________________________________');
   console.log('');
   console.log(' [ 915 EDIÇÃO ] ');
   console.log('');
   console.log(' origem views : views/_cooperado/sample/materialconstrucao/edita=produto.handlebars');
   console.log(' origem route : route/_sample/rotas/grava_edicao');
   console.log(' Obs : ');
   console.log('');
   console.log(' destino : 1retorna para lista os produtos');
   console.log('');
    //...............................................
   let nucleo=req.body;
   console.log('');
   console.log('',nucleo);
   console.log('');
   let produtoId=nucleo.nameProdutoId;
   let lojaId=nucleo.nameLojaid;
   let codigo=nucleo.nameCodigo;
   let descricao=nucleo.nameDescricao;
   let complete=nucleo.nameComplete;
   let material=nucleo.nameMaterial;
   let pvista=nucleo.namePvista;
   let pprazo=nucleo.namePprazo;
   let segmento=nucleo.nameSegmento;
   let setor=nucleo.nameSetor;
   let secao=nucleo.nameSecao;
   console.log('==> ',secao)
   console.log('_____________________________');
   console.log(produtoId)
   console.log('');
   console.log(lojaId);
   console.log('________________________________');
   console.log(codigo);
   
   Mconstrucao.updateMany({
                         $and:[
                           {_id:produtoId},
                           {loja_id:lojaId},
                               ]
                       },
                       {
                         $set:{
                                  codigo:`${codigo}`,
                                  descricao:`${descricao}`,
                                  complete:`${complete}`,
                                  referencia:`${material}`,
                                  precovista:`${pvista}`,
                                  precoprazo:`${pprazo}`,
                                  localizacao:[
                                              {segmento:segmento,}
                                              ]
                                  //]
                              }
                       },
              )
              .then((produto)=>{
                 console.log("=> ",produto)    
                 Lojista.findOne({_id:`${lojaId}`})
                        .then((lojista)=>{
                              Sample.find({loja_id:lojaId}).sort({pageposicao:1})
                                  .then((result)=>{
                                       res.render("_cooperado/sample/materialconstrucao/cad_construcao_produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result:result});
                                  })
                                  .catch((e)=>{
                                    console.log(' [ 469 ]=> ', e)
                                  })  
                        })
                        .catch((e)=>{
                           console.log(' ',e)
                        })
              })
              .catch((err)=>{
                 console.log(err);
              })
})

router.get('/visualizar/:id',async(req,res)=>{
    let nucleo=req.params;
    console.log('');
    console.log("VISUALIZAR!",nucleo)
    // mostra um form com o produto somente para observação dos dados
})

// ESSA ROTINA RENOMEA O NOME DO CAMPO ????
router.post('/rename_field',async(req,res)=>{
   console.log('');
   console.log('__________________________________________');
   console.log('');
   console.log(' [ 497 ] ');
   console.log('');
   console.log(' origem views : views/_cooperado/sample/materialconstrucao/cad_construcao_produto')
   console.log(' Obs : ');
   console.log('');
   console.log(' destino : renomea um field');
   console.log('');
   //let id=req.body.nameLojaId;
  // console.log('==>',id)
   return
   console.log('----------------------------------------------------')
   Lojista.find({})
          .then((result)=>{
              let l=result.length;
              for (let i=0;i<l;i++){
                let loja=result[i];
                buscaproduto(loja)
              }
          })
          .catch((e)=>{
            console.log(e)
          })
   async function  buscaproduto(loja){      
            let id=loja._id;
            Mconstrucao.find({loja_id:id})
                     .then((resp)=>{
                           console.log('');
                           console.log(resp.marcaloja)
                           console.log('');
                           //console.log(resp[1])
                           console.log('');
                        // return
                           let l=resp.length
                           for (let i=0;i<l;i++){
                              let registro=resp[i];
                              updateName(registro);
                           }
                        ////////////////////////////////
                     })
                     .catch((e)=>{

                     })
   }           
   //////////////////////////////////////////////////////////////////////           
   function updateName(resp){
        let id=resp._id; 
        //console.log(id)
         id=id.toString()
         console.log('[544]',id)
         Mconstrucao.updateOne({_id:id},
                                 { "localizacao": { $exists: true } },
                                 [{
                                 $set: {
                                    localizacao: {
                                       $map: {
                                       input: "$localizacao.setor",
                                       in: {
                                          segmento: "$localizacao.setor",

                                       }
                                       }
                                    }
                                 }
                                 }],
                               //{ $rename:{"localizacao.setor":"localizacaosegmento"}
                               //        }
                  )
                  .then((respost)=>{
                     console.log('');
                     console.log(respost);
                     console.log('');
                     console.log('__________________________________________');
                  })
                  .catch((e)=>{
                     console.log(e);
                  }) 
   }   
} )   

router.get('/deletaCampo/:id',async(req,res)=>{
   console.log('23/06/2024 ==>>')
   let n1=req.params;
   console.log(n1)
   console.log('')
   Sample.updateOne ({_id:ObjectId(n1)},
                     {$set:{localizacao:[
                                        {'segmento':'material de construção',
                                         setor:[
                                                {nameSetor:"acabamento"},
                                                {secao:[
                                                         {nameSecao:"porcelanato"}
                                                       ]
                                                }
                                               ]
                                        }
                                       ]}
                     },
                     { upsert: true}
               // $set:[{"segmento.$":[{nameSegmento:"test1"}]}]
      )
      .then( (result)=>{
          console.log(result)
      })
      .catch((er)=>{
         console.log(er);
      })
   
        //  {
                                                          //     setor:[
                                                          //              {nameSetor:"test2"},
                                                          //              {
                                                          //              setor:[
                                                          //                    {nameSecao:'test3'},
                                                          //                    ]
                                                          //           }
                                                          //           ]
                                                          //  }

})

// busca os setores para reduce lista de produtos contente.
router.get("/selectSetor/:id",(req,res)=>{
   let c5='kgi0123npf'
   console.log('');
   console.log('__________________________________________');
   console.log('');
   console.log(' [ 860 ] ');
   console.log('');
   console.log(' origem views : views/_cooperado/sample/materialconstrucao/cad_construcao_produto')
   console.log(' Obs : ');
   console.log('');
   console.log(' destino : busca os setores pertinentes ao lojista');
   console.log('');
   let palavra=req.params.id;
   console.log(palavra)
   let l=palavra.length;
   let numberClient=palavra.substring(0,24)
   console.log('número client ',numberClient)
   let resto=palavra.substring(34,l);
   console.log('nome do segmento :',resto)
   resto='Material de Construção';
   let setores=[];
   let Newsetores=[];
   let texto;
   Mconstrucao.find({'localizacao.segmento':resto},{'localizacao.setor':1}
                   )
                  .then((result)=>{
                     // console.log('result => ',result)
                      let l=result.length;
                      console.log('comprimento ',result.length)
                      for (let i=0;i<l;i++){
                        let local=result[i].localizacao;
                        [local]=local
                       // console.log('   ',i,'---',local.setor)
                        let nameSetor=local.setor;
                        [nameSetor]=nameSetor;
                       // console.log(nameSetor.nameSetor)
                        if(nameSetor.nameSetor=='Piso Revetimento'){
                           console.log('localllll',local)
                        }
                        setores.push(nameSetor.nameSetor)
                      }
                      setores.sort();
                     // console.log('1000',setores)
                      palavra=setores[0];
                      Newsetores.push(palavra)
                      for ( let j=0;j<l;j++){
                         texto=setores[j];
                         //console.log(palavra + '====',texto)
             
                         if (texto===palavra){
                             // deixa passar
                         }else{
                           Newsetores.push(texto);
                           palavra=texto
                         }
                         
                         
                      }
                      console.log(Newsetores)
                      res.send(Newsetores)
                  })
                  .catch((err)=>{
                     console.log('eroor : ',err);
                  })

})

// vai buscar os produtos pertinentes ao setor selecionado
router.get("/selectSetorProduto/:id",(req,res)=>{
   let c5='015678j3lk'
          '015678j3lk'
   console.log('');
   console.log('__________________________________________');
   console.log('');
   console.log(' [ 1159 ] ');
   console.log('');
   console.log(' origem views : views/_cooperado/sample/materialconstrucao/cad_construcao_produto')
   console.log(' Obs : ');
   console.log('');
   console.log(' destino : busca os setores pertinentes ao lojista');
   console.log('');
   let palavra=req.params.id;
   console.log(palavra)
   let l=palavra.length;
   let numberClient=palavra.substring(0,24)
   console.log('numero cliente :',numberClient)
   let resto=palavra.substring(34,l);
   console.log('nome setor',resto)
   console.log('___________________________________________')
  // resto='Ferramentas';
   let setores=[];
   let Newsetores=[];
   let texto;
  //let h=new ObjectId(numberClient)
   Mconstrucao.find(
                    {
                     $and:[
                           {
                           loja_id:numberClient,  
                           'localizacao.setor.nameSetor':resto,
                           },
                          ]  
                     },
                   
                   )
                  .then((result)=>{
                      console.log('result => ',result)
                      let l=result.length;
                      console.log('length =>',l)
                      res.send(result)
                      //res.send(result)
                      return
                      console.log('comprimento ',result.length)
                      console.log('');
                      console.log('_______________________');
                      console.log('');
                      for (let i=0;i<l;i++){
                        let local=result[i];
                       // console.log(' local =>',local.localizacao)
                        let g=local.localizacao
                        let f=g[0].setor;
                        [f]=f;
                        console.log('setor',f.secao)
                        setores.push(f.secao)
                      }
                      setores.sort();
                     // console.log('1000',setores)
                      palavra=setores[0];
                      Newsetores.push(palavra)
                      for ( let j=0;j<l;j++){
                         texto=setores[j];
                         console.log(palavra + '====',texto)
             
                         if (texto===palavra){
                              console.log('dentro');
                              console.log(palavra)
                         }else{
                           Newsetores.push(texto);
                           palavra=texto
                         }
                         
                         
                      }
                      console.log(Newsetores);
                     // res.send(Newsetores);
                  })
                  .catch((err)=>{
                     console.log('eroor : ',err);
                  })
                 
})
module.exports = router;