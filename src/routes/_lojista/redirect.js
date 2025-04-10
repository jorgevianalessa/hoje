const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');

const { ObjectId, ReturnDocument } = require('mongodb');
const { eAdmin } = require("../../../helpers/eAdmin");
require('../../models/lojista');
const Lojista = mongoose.model('lojista');

require('../../models/fornecedor');
const Fornecedor = mongoose.model('fornec');

require('../../models/sample_roupa');
const Roupa = mongoose.model('sample_roupa');

//require('../../models/roupa_cor');
//const RoupaCor = mongoose.model('roupa_cores');

require('../../models/segmentos_');
const Segmento = mongoose.model('segmentos');

const { request } = require('http');

router.get('/roupa-editando-size/:id',async(req,res)=>{
    console.log('')
    console.log('___________________________________________________')
    console.log('')
    console.log('   [ 29 ]                                      ')
    console.log('   origem views : views/_cooperado/lojista/roupa/roupa-editando-size.handlebars-')
    console.log('   origem route : _lojista/redirect/roupa-editano-size/:id')
    console.log('   Obs : Essa rotina volta para editando-size')
    console.log('   vem de "inserindo-cor" || "add-produto-nvsize"  || "editar-produto-tamanho" ')
    console.log('   destino : views/_cooperado/lojista/edita_produto.handlebars')
    console.log('___________________________________________________')
    console.log('')
    let corpo=req.params;
   // console.log('valor de corpo [ 38 ] ',corpo)
    corpo=corpo.id;
    let idproduto=corpo.substring(0,24);
    let idcorfoto=corpo.substring(25,49)
    console.log(idproduto);
    console.log(idcorfoto);
    //....................................
    RoupaCor.find({_id:idcorfoto})
    .then((extensao)=>{
       //console.log('');
       //console.log(extensao);
       console.log('');
       console.log('________________________________________________');
       console.log('');
       [extensao]=extensao
       console.log('');
       //produto=extensao.idproduto;
       let especie=extensao.especificacao;
       [especie]=especie;
       console.log('[ 57 ]',especie)
       RoupaStok.find({'_id':idproduto})
                .then((produto)=>{
                    [produto]=produto;
                    console.log(produto);
                    res.render("_cooperado/lojista/roupas/roupa-editando-size",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:produto,extensao:extensao,especie:especie});
                })
                .catch((error)=>{
                   console.log(error);
                })
       
    })
    .catch((er)=>{
       console.log(er);
    });
  })

router.get('/next-produto-vitrine/:id',async(req,res)=>{
    console.log('');
    console.log('__________________________________________');
    console.log('');
    console.log(' [ 78 ]');
    console.log(' origem views : views/_cooperado/lojista/edita_produto.handlebars');
    console.log(' origem route : route/_lojista/lojista/next-produto-temp');
    console.log(' obs : localizar o próximo registro a partir do código');
    console.log('');
    console.log(' destino : views/_cooperado/lojista/edita_produto.handlebars');
    console.log('');
    //console.log(req.params)
    let id=req.params.id;
    let H={
     idproduto:id
    };
    RoupaStok.findOne({_id:id})
             .then((resp)=>{
               console.log('')
                console.log('valor do retorno',resp)
                console.log('')
                let {produto}=resp;
                let detalhe=produto.detalhes;
                detalhe.sort(detalhe.cor);
                [detalhe]=detalhe;
                 /////////////////////////////////////////////////////////////////
                console.log('');
                console.log('__________________________________________');
                console.log('');
                console.log('  [ 871 ]                                 ');
                console.log('  Ainda dentro da rotina [ 845 ] next-produto-vitrine');
                console.log('  Pega os dados do produto selecionado');
                console.log('  Pega os detalhes das cores e tamnho correspondente ao produto');
                console.log('');
                console.log('___________________________________________');
                res.render("_cooperado/lojista/produto_edita",{ layout:'roupa-edita-temp.handlebars',produto:produto,detalhe:detalhe,h:H});
                //................................................................................................                
             })
             .catch((err)=>{
                console.log(err);
             })
 
      //res.render("_cooperado/lojista/vis-detalhe-EditTamanhoQte",{ layout:'roupa-edita-temp.handlebars',produto:produto,detalhe:w,idx:nId});
 })

 router.get('/redireciona_cadfornec/:id',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1250 ]');
  console.log(' origem views :');
  console.log(' origem route : route/_');
  console.log(' obs : ');
  console.log('');
  console.log(' destino :');
  console.log('');
  console.log(' ___________________________________');
  console.log('');
  console.log(req.params);
  let numberId=req.params.id;
  let q={};
  Lojista.findOne({_id:numberId},{razao:1,segmento:1})
         .then((resultado)=>{
            console.log("");
            console.log("rrrr",resultado);
            console.log("");
            q={
              idloja:numberId,
              razaoLoja:resultado.razao,
              segmento:resultado.segmento.titulo,
            }
            //...................................
            console.log('valor do resultado',resultado)
            console.log('');
            console.log(' valor de q',q);
            console.log('');
            console.log('_____________________________________________________________');
            res.render("_cooperado/lojista/fornecedor", {layout:'lojista/admin-loja.handlebars',client:q})  
         })  
         .catch((err)=>{
             console.log(' [ 1266 ]',err)
         })
  



})

router.get('/fornec_getfornec',(req,res)=>{
  // Essa rotina vem do menu sidebar/admin central para gerar a lista de fornecedores
  console.log("");
  console.log('__________________________________________________') ;
  console.log(' [ 178 ] routes/_lojista/lojista/get:/fornec_getfornec......');
  console.log("");
  console.log(" origem views : views/_cooperados/lojista/fornecedor.handlebars");
  console.log(" origem route : roue/_lojista/lojista/fornec_gravafornec => redirect/fornec-getfornec");
  console.log(" obs :");
  console.log("");
  console.log(' destino :');
  console.log('');
  console.log('__________________________________________________') ;
  console.log("")
  let Q=req.body;
  console.log(' [ 189 ] -> vr de Q :',Q)
  // Essa rotina é de passagem do menu para a lista de fornecedores
  Segmento.find({},{segmento:1,_id:0})
          .then((seg)=>{
              console.log('resultado da busca' ,seg)
              seg.sort()
              res.render("_cooperado/lojista/fornecedor", {layout:'lojista/admin-loja.handlebars',segment:seg,client:Q})
            })    
          .catch((err)=>{
               console.log(err)
          })    
})

router.get('/voltapage_visual-page/:id',async(req,res)=>{
  console.log('');
  console.log(' ______________________________________________');
  console.log('');
  console.log(' [ 206 ]');
  console.log('');
  console.log(' origem views : /_cooperado/templates/roupa-1.handlebars');
  console.log(' origem route : /_lojista/lojista/voltapage_vi?sual-page/:id');
  console.log(' obs : Essa rotina é redirect(fixaposicaoimg) [ 2536 ] onde foram gravadas as posições do site');
  console.log('');
  console.log(' destino : volta para a page_vis?ual-page para continuar a edição da pagine do site ');
  console.log(' ');
  console.log(' _____________________________________________________ ');
  let nucleo=req.params;
  console.log('valor do params',nucleo);
  console.log('');
  //console.log('---------------------------------');
  //corpo=corpo.id;
  let idloja=nucleo.id;
  //console.log('__________________________________________________');
  console.log(' id : ', idloja);
  try{
        RoupaStok.findOne({'produto.lojaid':idloja},{'produto.lojaid':1})
                .then((r)=>{
                      console.log(r)
                      let r1=r.produto;
                      console.log('r1 : ',r1.lojaid);
                      console.log('________________________________________________')
                      res.render("_cooperado/templates/roupa-1",{ layout:'lojista/roupa-loja-formata.handlebars',container:r1});
                })
                .catch((e)=>{
                  console.log(e)
                })
   }catch(e){
        console.log(e)
   }
})

router.get('/page_visual-page/:id',async(req,res)=>{
  console.log('');
    console.log('_____________________________________________');
    console.log('');
    console.log(' [ 232  ]');
    console.log(' origem views : views/_cooperados/admin/admincooperados.handlebars');
    console.log(' origem route : route/_lojista/lojista/page-visual-page/');
    console.log(' obs : _cooperado/lojista/visual-page",{ layout:"loja-formata.handlebars"');
    console.log('');
    console.log(' destino : carrega templeta da page para ser montada');
    console.log('           _cooperado/templates/roupa-1  ');
    console.log('');
    console.log('___________________________________________________');
    console.log('');
    //console.log('requisição _id',req.params);
    console.log('',req.params);
    //return
    let id=req.params.id;
    id=id.toString();
    console.log('id :',id)
    //console.log('-------------------------------------')
    let container={}
    try{
        Lojista.findOne({'_id':id})
              .then((resp)=>{
                    //console.log('valor da resp',resp)
                    let razao=resp.razao;
                    let pos;
                    container={
                      razao:razao,
                      id:id
                    }
                    //.......................................................
                    razao=razao.toLowerCase();
                    pos=razao.search(" ");
                    console.log('razao : ', razao)
                    //.............................
                    let cidade=resp.cidade;
                    cidade=cidade.toLowerCase();
                    //  ...................................
                    let segmento=resp.segmento;
                    [segmento]=segmento;
                    let titulo=segmento.titulo;
                    titulo=titulo.toLowerCase();
                    console.log( 'titulo : ',titulo);
                    //  ..................................
                    let subtitulo= segmento;
                    let r1=subtitulo.sub_titulo;
                    console.log('valor do sub_titulo :',r1)
                    let l=subtitulo.length;
                    // --------------------------------------------------
                    let caminho= cidade + "^" + titulo + "^" + subtitulo;
                    console.log('')
                    //console.log('-------------------------------------')
                    console.log('container do lojista : ',container);
                    //console.log('termina LOAD de pag_visual-page');
                    console.log('-------------------------------------')
                    console.log('')
                    let rzao=resp.razao;
                    let f=[];
                    f.push(container)
                    console.log(container.id)

                    //:::::::::::::::::::::::::::::::::::::::::::::::::::::
                    res.render("_cooperado/templates/roupa-1",{ layout:'lojista/roupa-loja-formata.handlebars',caminho:caminho,container:container});
              })
              .catch((e)=>{
                  console.log(e)
              })
       }catch(e){
            console.log(e)
       }
})

router.get('/load-roupa-foto/:id',async(req,res)=>{
    console.log('');
    console.log(' ______________________________________________');
    console.log('');
    console.log(' [ 305 ]');
    console.log('');
    console.log(' origem views : ');
    console.log(' origem route : /_lojista/lojista/voltapage_vis?ual-page/:id');
    console.log(' obs : Essa rotina é redirect(fixaposicaoimg) [ 2536 ] onde foram gravadas as posições do site');
    console.log('');
    console.log(' destino : _cooperado/lojista/roupa-foto')
    console.log(' ');
    console.log(' _____________________________________________________ ');
    console.log(req.params);
    let nucleo=req.params.id;
    let pos;
    let l=nucleo.length;
    pos=nucleo.search(":");
    idproduto=nucleo.substring(0,pos);
    idcor=nucleo.substring((pos+1),l);
    if (idcor=="anotar"){
         return
    }else{
    console.log(idproduto, ' <==> ',idcor)
    await  RoupaStok.find({_id:idproduto})                 
             .then((vitrine)=>{
                console.log('resultado : ',vitrine);
                [vitrine]=vitrine;
                console.log('');
                console.log('___________________________________________');
                console.log('');
                //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                RoupaCor.find({_id:idcor})
                        .then((extensao)=>{
                           console.log('retorno dos elementos da nova cor :');
                           console.log(extensao)
                          // let dados;
                           [extensao]=extensao;
                           let especie;
                           [especie]=extensao.especificacao;
                           console.log(especie)
                           //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                           res.render("_cooperado/lojista/roupa-foto",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine,extensao:extensao,especie:especie});  
                           return
                        })  
                        .catch((e)=>{
                           console.log(e)
                        })

                
             })
             .catch((e)=>{
                console.log(e)
             }) 
            }       
})

router.get('/complemento/:id',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 362 ]');
  console.log(' origem views :views/_cooperado/lojista/tabela-cores.handlebars');
  console.log(' origem route : route/_lojista/roupas.js/redirect.js/complemento/:id');
  console.log(' obs : Vai inserir as fotos antes de colocar a cor,tamanho,etc...');
  console.log('');
  console.log(' destino : views/_cooperado/lojista/roupas_add-complemento.handlebars');
  console.log(req.params);
  let idProduto=req.params.id;
  console.log('idProduto :',idProduto)
  RoupaStok.findOne({_id:idProduto})
           .then((vitrine)=>{
              console.log('valor de vitrine',vitrine)
              let ncor=vitrine.produto;
              console.log('numbercor :',ncor.homenumbercor);
              console.log('');
              ncor=ncor.homenumbercor
              let l=ncor.length;
              console.log(l)
              if (l!=24){
                  console.log('prima!')      
              }else{
                //console.log(' dentro de RoupaCor => ',ncor)
                RoupaCor.findOne({_Id:ncor})
                        .then((extensao)=>{
                           console.log('valor da extensao 386:',extensao)
                           res.render("_cooperado/lojista/roupas/roupa_add-complemento",{ layout:'lojista/roupa-coloca-foto.handlebars',vitrine:vitrine,extensao:extensao});  
                        })
                        .catch((er)=>{
                          console.log(er)
                        })
              }   
           })
           .catch((err)=>{
             console.log(err);
           })
 
})



  module.exports = router;