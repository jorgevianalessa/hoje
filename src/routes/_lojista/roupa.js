const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
//const { Decimal128, Double } =require('mongodb');
/////////////////////////////////////////////////////
//const aws = require('aws-sdk');
const aws=require('@aws-sdk/client-s3')
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config({path:'./.env'})
const { DeleteObjectCommand } =require('@aws-sdk/client-s3')
const { S3 } =require('@aws-sdk/client-s3')
/////////////////////////////////////////////////////////
const { ObjectId } = require('mongodb');
const { eAdmin } = require("../../../helpers/eAdmin");
require('../../models/lojista');
const Lojista = mongoose.model('lojista');

require('../../models/sample_roupa');
const RoupaStok = mongoose.model('sample_roupa');

require('../../models/fornecedor');
const Fornecedor = mongoose.model('fornec');

//require('../../models/tableCor');
//const TableCor=mongoose.model('table_cor')

require('../../models/segmentos_');
const Segmento = mongoose.model('segmentos');

const { request } = require('http');
const { upload } = require('../../libs/multer');
const { uploadFile,getFiles } = require('../../controllers/index.controllers');
const { Console } = require('console');
const { send } = require('process');
const { AutoScaling } = require('aws-sdk');
const { distinct } = require('../../models/imageUp');
//.........................................................
const csv=require('csvtojson');
const path =require('path');

// atualizado 13/08/23
router.post('/cad_fornecedor',(req,res)=>{
    // Essa rotina vem do cooperados/produto/menu/cadastrar-fornecedor
    // essa rotina pega todos os segmento para buscar fornecedore cadastrados no lojista
    console.log('');
    console.log('____________________________________________');
    console.log('');
    console.log(' [ 152 ]');
    console.log(' origem views : views/_cooperado/admin/admincooperados => fornecedores()');
    console.log(' origem route : _lojista/roupa/cad_fornecedor');
    console.log(' obs : layout:"lojista/admin-loja.handlebars" ');
    console.log('       abre a page de cadastro do fornecedor');
    console.log(' destino : views/_cooperado/lojista/cad-fornecedor');
    console.log('');
    console.log('____________________________________________');
    console.log('');
    console.log("")
    //.......................................................
    let Q=req.body;
    console.log('[ 164 ] - dados do lojista que está cadastrando o fornecedor',Q);
    console.log('');
    res.render("_cooperado/lojista/fornecedor", {layout:'lojista/admin-loja.handlebars',client:Q})
})

router.get('/pegasegmento/:id',(req,res)=>{
    console.log('');
    console.log('____________________________________________');
    console.log('');
    console.log(' [ 172 ]');
    console.log(' origem views : views/_cooperado/lojista/cad_fornecedor.handlebars');
    console.log(' origem route : /lojista/lojista.js/pegasegmento;:id');
    console.log(' obs : busca os segmento vinculados');
    console.log('');
    console.log(' destino : resposta para carregar o select : ');
    console.log('____________________________________________');
    console.log('');

    let Q=req.params;
    let idex=Q.id;
    console.log(' [ 185 ] -> id do lojista : ',Q)
    console.log('');
    // Essa rotina é de passagem do menu para a lista de fornecedores
    Lojista.find({_id:`${idex}`},{segmento:1,_id:0})
            .then((seg)=>{
                let result=seg;
                [result]=result;
                let [w]=result.segmento;
                seg.sort();
                console.log('');
                console.log('valor de segmento :');
                console.log(w)
                res.send(w)
            })    
            .catch((err)=>{
                console.log(err)
            })    
})

router.get('/fornecedor_vinculadoLojista/:id',async(req,res)=>{
    // Essa rotina vem do cadastro de fornecedores.
    console.log('');
    console.log('____________________________________________');
    console.log('');
    console.log(' [ 207 ]');
    console.log(' origem views : _cooperado/lojista/cad-fornecedor.handlebars=>fornecedor_vinculadoLojista()');
    console.log(' origem route : routes/_lojista/lojista/get:/fornecedor_vinculadoLojista()');
    console.log(' obs : ');
    console.log('');
    console.log(' destino : retorna resposta para => ');
    console.log('           views/_cooperado/lojista/cad-fornecedor.handlebars=>  ')
    console.log('           fornecedor_vinculadoLojista()')
    console.log('');
    console.log('____________________________________________');
    console.log('');
        
    // Essa rotina é de passagem do menu para a lista de fornecedores
   // console.log(req.params);
    let palavra=req.params;
    palavra=palavra.id;
    console.log(palavra)
    let pos=palavra.search(":=");
    let seg=palavra.substring(0,pos);
    let lojaid=palavra.substr(pos+2);
    console.log('valores : ',seg, ' : ',lojaid)
 
    await  Fornecedor.find({
                          $and:[
                                {'segmento.titulo':seg},
                                {'lojista.lojaid':lojaid}
                          ]
                      })
                     .then((seg)=>{
                         console.log(seg)
                         //...................................................................................
                         res.send(seg)
                     })
                     .catch((err)=>{
                         console.log(err)
                     })

})

router.get('/fornecedor_desvincula-Lojista/:id',async(req,res)=>{
  console.log('') 
    console.log('____________________________________________') 
    console.log('') 
    console.log(' [ 250 ]')
    console.log(' origem views : views/_cooperado/lojista/fornecedor.handlebas')
    console.log(' origem route : routes/_lojista/lojista/post:fornec_gravafornec')
    console.log(' obs : action="/lojista/fornec_gravafornec/') 
    console.log('') ;
    console.log(' destino :views/_cooperado/lojista/fornecedor.handlebas') ;
    console.log('') ;
    console.log('____________________________________________') ;
    console.log('') ;
    console.log(' req.params :',req.params);
    let palavra=req.params.id;
    console.log(palavra);
    let num=palavra.substring(0,24);
    let number=palavra.substring(31,55);
    console.log('valor de num',num);
    console.log('valor de num',number);
    //return
    Fornecedor.deleteOne({
                           $and :[
                            {'lojista.lojaid':number},
                            {_id:num} 
                           ]
                          })
              .then((r1)=>{
                console.log(r1);
              })            
              .catch((error)=>{
                 console.log(error)
              })
})

router.post('/fornec_gravafornec',async(req,res)=>{
    // Essa rotina vem da lista de fornecedores / admin central e cadastra o fornecedore Geral
    console.log('') 
    console.log('____________________________________________') 
    console.log('') 
    console.log(' [ 185 ]')
    console.log(' origem views : views/_cooperado/lojista/fornecedor.handlebas')
    console.log(' origem route : routes/_lojista/lojista/post:fornec_gravafornec')
    console.log(' obs : action="/lojista/fornec_gravafornec/') 
    console.log('') ;
    console.log(' destino :views/_cooperado/lojista/fornecedor.handlebas') ;
    console.log('') ;
    console.log('____________________________________________') ;
    console.log('') ;
    console.log(' req.body :',req.body)
    let nucleo=req.body;
    ///////////////////////////////////////////////
    //          IDENTIDADE
    let lojaid=nucleo.lojaidForm;
    lojaid=lojaid.trim();

    let lojarazao=nucleo.lojarazaoForm;
    lojarazao=lojarazao.trim();

    let lojasegmento=nucleo.namelojasegmentoForm;
    lojasegmento=lojasegmento.trim();
    //////////////////////////////////////////////////////
    //            DADOS
    let razao=nucleo.raz3oForm;
    razao=razao.trim();
    
    let cnpj=nucleo.cnj3Form;
    cnpj=cnpj.trim();

    let inscr=nucleo.inscrForm;
  
    let marca=nucleo.marc3Form;
    marca=marca.trim();
  
    let email=nucleo.ema3lForm
    email=email.trim();
  
    /////////////////////////////////////////////////
    //                ADDRESS  
    let cep=nucleo.inputCepForm;
    cep=cep.trim();
  
    let avenida =nucleo.inputAvenidaForm;
    avenida=avenida.trim();

    let numero =nucleo.inputNumeroForm;
    numero=numero.trim();
  
    let cidade=nucleo.inputCidadeForm;
    cidade=cidade.trim();
  
    let bairro=nucleo.inputBairroForm;
    bairro=bairro.trim();
  
    let estado =nucleo.inputEstadoForm;
    estado=estado.trim();
    ///////////////////////////////////////////////////
    //          CONTATO
    let nomeRepres=nucleo.inputRepresentanteNomeForm;
    let celularRepres=nucleo.inputRepresentanteCelularForm;

    let nomeComercial=nucleo.inputComercialNomeForm;
    let celularComercial=nucleo.inputComercialCelularForm

    let nomeTecnica=nucleo.inputTecnicaNomeForm;
    let celularTecnica=nucleo.inputTecnicaCelularForm

    ////////////////////////////////////////////////////
    console.log('1000 => : ',cnpj);
    console.log('2000 => : ',`${razao}`);
    console.log('3000 => : ',`${marca}`);
    console.log('4000 => : ',`${email}`);
    Fornecedor.findOne({  'dados.cnpj':cnpj})
              .then((resp)=>{
                 console.log('se fornec igual null >>',resp)
                 if(resp==[] || resp==null){
                      console.log('está aqui');
                      new Fornecedor(
                        {
                          dados:[
                                {
                                  razao:`${razao}`,     // razao
                                  cnpj:`${cnpj}`,      // cnpj
                                  inscricao:`${inscr}`,
                                  marca:`${marca}`,     // marca 
                                  email:`${email}`,    // email
                                  segmento:[
                                    {titulo:`${lojasegmento}`},
                                  ],
                                }
                              ],
                          qlojistas:[
                                {
                                  lojaid:`${lojaid}`,
                                  lojaname:`${lojarazao}`,
                                  lojasegmento:`${lojasegmento}`,
                                  number_contabil:0,
                                  ativo:0,
                               }
                              ],
                          address:[
                                {
                                  cep:`${cep}`,
                                  logradouro:`${avenida}`,
                                  numero:`${numero}`,
                                  cidade:`${cidade}`,
                                  bairro:`${bairro}`,
                                  estado:`${estado}`,
                                }
                              ],
                          contato:[
                                {
                                  representante:[
                                    {
                                      nome:`${nomeRepres}`,
                                      celular:`${celularRepres}`,
                                    }
                                  ],
                                  comercial:[
                                    {
                                      nome:`${nomeComercial}`,
                                      celular:`${celularComercial}`
                                    }
                                  ],
                                  tecnica:[
                                    {
                                      nome:`${nomeTecnica}`,
                                      celular:`${celularTecnica}`
                                    }
                                  ],
                                }
                              ]      
                        }
                        //................................
                        )
                        .save()
                        .then((result)=>{
                            console.log(' gravação');
                            console.log(result);
                            res.redirect('/redirect/fornec_getfornec')
                        }).catch((err)=>{
                            console.log('vr do err',err)
                          res.send(err)
                        })
                 }else{
                    // editafornec(a)
                    Fornecedor.updateOne(
                      {
                         cnpj:`${a}`,
                      },
                      {
                      $set:{
                            //'produto.detalhes.$.tamanho':t,
                            //'produto.detalhes.$.qte':q,
                             'lojista.lojaid':`${lojaid}`,
                             'lojista.lojaname':`${lojarazao}`,
                             'lojista.lojasegmento':`${lojasegmento}`
                            }
                      },
                    )   
                    .then((result)=>{
                       console.log('result da upgrade [ 318 ]'.result)
                    })
                    .catch((err)=>{
                       console.log('error [ 324 ] editafornec ',err)
                    })
                 }
              })
              .catch((err)=>{
                console.log(err)
              })
              //..............................................................................
      await  function editafornec(a){
             
    }      
})
// atualizado 05-09-23
router.get('/produt_listaproduto/:id',(req,res)=>{
  console.log("")
  console.log("(389) -----------------------------------------------")
  console.log("routes/_lojista/lojista/get:produt_listaproduto------")
  console.log("vem de cooperado/menu-produto-lista-produto..........")
  console.log("-----------------------------------------------------")
  console.log('rotina busca os produtos cadastro no lojista ',req.params)
  console.log("")
  console.log('id do lojista',req.params)
  let idloja=req.params;
  let cnpjloja;
  let razaoloja;
  console.log("-----------------------------------------------------")
  console.log("",idloja)
  Lojista.find({'_id':ObjectId(idloja)},{cnpj:1,'segmento.titulo':1,razao:1}
           ) 
          .then((resp)=>{
              [resp]=resp;
              razaoloja=resp.razao;
              console.log("cnpj do lojista",resp)
              console.log(razaoloja)
              RoupaStok.find({cnpj:cnpjloja},{'produto.cnpjloja':1,'produto.codigo':1,'produto.descricao':1,'produto.detalhe':1,'produto.tecido':1,'produto.cor':1})
                    .then((result)=>{
                        console.log(result)
                        res.render("_cooperado/lojista/lista-produto",{ layout:'lojista/admin-loja.handlebars',lista:result,razao:razaoloja})
                    })
                    .catch((er)=>{
                      console.log(er)
                    })
          })
          .catch((er)=>{
             console.log(er)
          })
})

router.post('/busca-produto',async(req,res)=>{
      console.log('______________________________________________________________________')
      console.log('')
      console.log('  [ 341 ]                            ')      
      console.log('  origem view  : views/_cooperado/lojista/roupa_listar-temporario.handlebars ')               
      console.log('  origem route : route/_lojista/roupa/busca_produto')
      console.log('  obs : Vem da lista de produto temporário ')
      console.log('');
      console.log('  Essa rotina tem como função de buscar os produtos ');
      console.log('  do fornecedor selecionado.');
      console.log('  destino : views/_cooperado/lojista/roupa_listar-temporário');
      console.log('______________________________________________________________________')
      console.log('');
      console.log(req.body);
      let cnpjFornec=req.body.nameidfornec;
     // RoupaStok.aggregate( [
     //         {
     //           $lookup:
     //               {
     //                 from:'RoupaCor',
     //                 localField:"_id",
     //                 foreignField:"idproduto",
     //                 as:"teste"  
     //               }
     //         }]
     //        ).then((result)=>{
     //            console.log(result.length)
     //            console.log(result[0])
     //            res.send(result)
     //         })
     //         .catch((er)=>{
     //             console.log(er)
     //         })

     // return
      RoupaStok.find({'produto.cnpjfornec':cnpjFornec})
               .then((vitrine)=>{
                   console.log('____________________________');
                   console.log(vitrine.length);
                   console.log('');
                   console.log(vitrine)
                   console.log('_________________________________');
                   res.send(vitrine)
                  // res.render("_cooperado/lojista/roupas/roupa_listar-temporario",{ layout:'lojista/roupaLista.handlebars',vitrine:vitrine});
               })
               .catch((er)=>{
                   console.log(er)
               })
})

router.post('/busca_produto_delete/:id',async(req,res)=>{
      console.log('');
      console.log('______________________________________________________________________')
      console.log('')
      console.log('  [ 390 ]                            ')      
      console.log('  origem view  : views/_cooperado/lojista/listar-temporario.handlebars ')               
      console.log('  origem route : route/_lojista/roupa/busca_produto_delete')
      console.log('  obs : Vem da lista de produto temporário ')
      console.log('');
      console.log('  Essa rotina tem como função preencher ');
      console.log('  o formulário para verificação antes de EXCLUIR ou SUSPENDER um determinado');
      console.log('  produto.')
      console.log('  destino : views/_cooperado/lojista/listar-temporário');
      console.log('______________________________________________________________________')
      console.log('');
      let number;
      number=req.params.id;
      console.log('vr de number',number)
      RoupaStok.findOne({_id:number})
               .then((resp)=>{
                  console.log(resp);
                  res.send(resp) 
               })
               .catch((err)=>{
                  console.log(err)
               })
      //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>         
})

router.post('/delete-produto',async(req,res)=>{
    console.log('');
    console.log('______________________________________________________________________')
    console.log('')
    console.log('  [ 419 ]                            ')      
    console.log('  origem view  : views/_cooperado/lojista/listar-temporario.handlebars ')               
    console.log('  origem route : route/_lojista/roupa/delete-produto')
    console.log('  obs : Vem da lista de produto temporário ')
    console.log('');
    console.log('  Essa rotina tem como função deletar um produto')
    console.log('  selecionado em lista de produto temporários.        ')
    console.log('  destino : views/_cooperado/lojista/busca_produto_delete');
    console.log('______________________________________________________________________')
    console.log('');
    let nucleo;
    nucleo=req.body;
    let idProduto=nucleo.nameDelid;
    let operation=nucleo.nameDeloperacao;
    console.log(' vr do núcleo ',req.body);
    console.log('');
    console.log('',operation);
    if (operation==1){
           console.log("dentro!!")
          RoupaStok.deleteOne({_id:idProduto})
                   .then((resp)=>{
                       console.log(resp);
                       let r=resp.deletedCount;
                       if(r==1){
                         res.send(200)
                       }
                       console.log("vr de r",r)
                   })
                   .catch((err)=>{
                      console.log(err)
                   })
    }else{

    }
    //....................................................................................
})

router.post('/edita-tamanho',async(req,res)=>{
      console.log(' [ 457 ]');
      console.log('');
      console.log(' origem views : views/_cooperado/roupas/roupa-editando-extensao.handlebars ');
      console.log(' origem route : routes/_lojista/roupas/edita-tamanho');
      console.log(' obs : Sai da page edita_produto pa????????ra page lista-temporario =>  "lista de produto"');
      console.log('');
      console.log(' destino : views/?????.handlebars');
      console.log('');
      console.log(req.body);
      console.log('');
      let id=req.body.nameIdExtensao;
      await RoupaCor.findOne({_id:id})
              .then((extensao)=>{
                console.log('---------100---------------');
                console.log('');
                console.log(extensao)
                console.log('------------------------');
                let idproduto=extensao.idproduto;
                RoupaStok.findOne({_id:idproduto})
                         .then((vitrine)=>{
                            res.render("_cooperado/lojista/roupas/roupa_edita-especificacao",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine,extensao:extensao});
                         })  
                         .catch((er)=>{
                            console.log(er)
                         })
              })
              .catch((er)=>{
                 console.log(er)
              })
      
})

router.post('/editar-extensao',async(req,res)=>{
    console.log('');
    console.log(' [ 1085 ]');
    console.log('');
    console.log(' origem views : views/_cooperado/roupas/roupa-editando-extensao.handlebars ');
    console.log(' origem route : routes/_lojista/roupas/editar-extensao');
    console.log(' obs : Sai da page edita_produto pa????????ra page lista-temporario =>  "lista de produto"');
    console.log('');
    console.log(' destino : views/?????.handlebars');
    console.log('');
    console.log('__________________________________')
    console.log(req.body);
    let nucleo=req.body;
    console.log('_______________________________________');
    let id_extensao;
    id_extensao=nucleo.nameExtensaoId;
    //d_extensao=id_extensao.toString()
    console.log('__________________________________');
    console.log('id extensao',id_extensao);
    console.log('__________________________________');
    let tamanho=nucleo.name_tamanho;
    let qte=nucleo.name_qte;
    console.log('qte : ',qte)
    let custo=nucleo.namecusto;
    console.log('custo : ',custo)
    let vista=nucleo.namevista;
    let prazo=nucleo.nameprazo;
    let posicao=0;
    let page=nucleo.namepage;
    console.log(page)
    let idExtensao='6597eff4d7f26088798b4b21'
    let idobject='659806e9857db2b5fe18a822'
    console.log('começando');
    console.log('______________________________')
    RoupaCor.updateOne(
                {_id:idExtensao,'especificacao._id':idobject},
                { $set:{
                      especificacao:
                      {
                       tamanho:tamanho,
                       qte:qte,
                       precocusto:custo,
                       precovista:vista,
                       precoprazo:prazo,
                      // page:page,
                      }
                }
              }
            )
            .then((extensao)=>{
                 console.log('');
                 //console.log('result',extensao);
                 console.log('');
                 console.log(extensao.especificacao.detalhe)
            })
            .catch((er)=>{
               console.log(er)
            })

})

router.get('/busca_adminloja/:id',async(req,res)=>{
      console.log('');
      console.log('______________________________________________');
      console.log('');
      console.log(' [ 1012 ]');
      console.log('');
      console.log(' origem views : views/_cooperado/lojista/edita_produto.handlebars ');
      console.log(' origem route : routes/_lojista/lojista/busca-admin');
      console.log(' obs : Sai da page edita_produto para page lista-temporario =>  "lista de produto"');
      console.log('');
      console.log(' destino : views/_admin/admin/admincentral.handlebars');
      console.log('');
      let corpo=req.params;
      console.log(req.params)
      let lojaId=corpo.id;
      console.log(' [ 1023 ] => ',lojaId)  
      await Lojista.findOne({_id:lojaId})
                  .then((result)=>{
                      console.log('');
                      console.log('dados do lojista : ',result)
                      console.log('________________________________')
                      let segment=result.segmento;
                      [segment]=segment;
                      console.log('');
                      console.log(segment.titulo)
                      let s=segment.titulo;
                      console.log('___________________________________________')
                      r=result;
                      res.render("_cooperado/admin/admincooperados",{ layout:'lojista/admin-loja.handlebars',cooperado:r,segmento:s}) 
                  })
                  .catch((e)=>{
                      console.log(e)
                  })
})

router.get('/busca_listatemp/:id',async(req,res)=>{
  console.log('');
  console.log('_________________________________________________________');
  console.log('');
  console.log('   (    revisado : 24/09/23    )                     ');
  console.log('   [ 986 ]                                    ');
  console.log('  origem views: views/_cooperados/admin/admincooperados.handlebars');
  console.log('   origem : route/_lojista/roupa/listar-temporario.handlebars ');
  console.log('');
  console.log('   Essa rotina pega todos os itens na tabela ');
  console.log('   temporória para edição de cores,tamanhos,qtes,...');
  console.log('');
  console.log('   destino : views/_cooperado/lojista/listar-temporario.handlebars');
  console.log('___________________________________________________________');
  console.log('');
  console.log(' retorno do req.params : ',req.params);
  let corpo=req.params;

  corpo=corpo.id;
  ClientId=corpo.substring(0,24)
  console.log('');
  //let ClientId=req.body.idlistaTemporario;
  //let ClientId=req.params.id;
  //console.log('id da loja : ',ClientId);
  ClientId=ClientId.trim();
  let fornecCnpj;
  let razao;
  ///////////////////////////////////////////////////////////////////////////////////////
  Lojista.findOne({_id:`${ClientId}`})
        .then((resposta)=>{
              if (!resposta || resposta===undefined  || resposta===null){
                  console.log("Não cadastro deste lojista!")
                  res.render("_cooperado/lojista/roupas/lista-temporarioVazio",{ layout:'roupaLista.handlebars',idx:lojaId,fornc:fornecCnpj,razao:razao});
              }else{
                 razao=resposta.razao;
                 console.log('');
                 console.log('razao social da  consulta:',razao);
                 console.log('id da lojista :',ClientId);
                 console.log('');
                 Fornecedor.find({'lojista.lojaid':ClientId},{marca:1})
                           .then((resp)=>{
                              //console.log('relação  de fornecedores',resp)
                              let F;
                              [F]=resp;
                              let h1=F;
                              console.log('');
                              console.log('vr de h1',h1);
                              console.log('');
                              console.log('');
                              //return
                              res.render("_cooperado/lojista/roupas/roupa_listar-temporario",{ layout:'lojista/roupaLista.handlebars',fornec:resp,razao:resposta});
                           })
                           .catch((er)=>{
                              console.log('er',er)
                           })
                
              }
            })      
        .catch((err)=>{
            console.log(err)
        })
})

router.get('/Xbusca_listatemp/:id',async(req,res)=>{
      console.log('');
      console.log('______________________________________________');
      console.log('');
      console.log(' [ 652 ]');
      console.log('');
      console.log(' origem views : views/_cooperado/lojista/edita_produto.handlebars ');
      console.log(' origem route : routes/_lojista/lojista/busca-admin');
      console.log(' obs : Sai da page edita_produto para page lista-temporario');
      console.log('');
      console.log(' destino : ');
      console.log('');
      let corpo=req.params;
      console.log(req.params);
      corpo=corpo.id
      let lojaId;
      lojaId=corpo.substring(0,24);
      let produtoId;
      produtoId=corpo.substring(24,48);
      console.log(' [ 1058 ] => ',lojaId ,'<==>',produtoId);
      let cnpjfornec;
      let X;
      //...................................................................
      await  RoupaStok.findOne({
                              _id:produtoId
                             })
                     .then((vitrine)=>{
                          if(vitrine==[]){
                            console.log('[ 1067 ] não há registro : ',vitrine)
                            res.render("_cooperado/lojista/roupas/vis-tempVazio",{ layout:'participe.handlebars'});
                          }else{
                            //............................................
                            console.log(' valor da consulta : ');
                            console.log('____________________________________________________')
                            console.log(vitrine)
                            X=vitrine.produto;
                            console.log(X.cnpjfornec);
                            cnpjfornec=X.cnpjfornec;
                            console.log(cnpjfornec);
                            console.log(lojaId);
                            Fornecedor.find({
                                              $and:[
                                                    {"cnpj":cnpjfornec},
                                                    {"lojista.lojaid":lojaId}
                                                  ]
                                            }
                                      )
                                      .then((respFornec)=>{
                                          console.log('marcas :')
                                          let H;
                                          [H]=respFornec
                                          console.log(H);
                                          //.............................................................
                                          //return
                                          res.render("_cooperado/lojista/roupas/listar-temporario",{ layout:'lojista/roupaLista.handlebars',fornec:H,razao:vitrine});
                                      })
                                      .catch((err)=>{
                                          console.log(err)
                                      })
                                      //...................................................
                                      console.log('Ok')
                                              
                                          //}    
                                         
                                     //})
                                     //.catch((e)=>{
                                     //   console.log(e)
                                     //})
                          }
                     })
                     .catch((err)=>{
                        console.log(err)
                     })
})

router.get('/adminloja_editpage/:id',async(req,res)=>{
      console.log('');
      console.log('______________________________________________');
      console.log('');
      console.log(' [ 904 ]');
      console.log('');
      console.log(' origem views : views/_cooperado/lojista/edita_produto.handlebars ');
      console.log(' origem route : routes/_lojista/lojista/busca-admin');
      console.log(' obs : Sai da page edita_produto para page lista-temporario =>  "lista de produto"');
      console.log('');
      console.log(' destino : views/_admin/admin/admincentral.handlebars');
      console.log('');
      let corpo=req.params;
      console.log(req.params)
      let idProduto=corpo.id;
      let lojaId;
      let fornecCnpj;
      let nucleo;
      lojaId=req.params.id; 
      await Lojista.findOne({_id:lojaId})
                  .then((result)=>{
                      console.log('');
                      console.log('dados do lojista : ',result)
                      let Seg=result.segmento;
                      r=result;
                      res.render("_cooperado/admin/admincooperados",{ layout:'lojista/roupa-loja-formata.handlebars',cooperado:r,segmento:Seg}) 
                  })
                  .catch((e)=>{
                      console.log(e)
                  })
      ///////////////////////////////////////////////////////////////////////////            
})

router.get('/listatemp_editpage/:id',async(req,res)=>{
      console.log('');
      console.log('______________________________________________');
      console.log('');
      console.log(' [ 756 ]');
      console.log('');
      console.log(' origem views : views/_cooperado/lojista/edita_produto.handlebars ');
      console.log(' origem route : routes/_lojista/lojista/busca-admin');
      console.log(' obs : Sai da page edita_produto para page lista-temporario');
      console.log('');
      console.log(' destino : ');
      console.log('');
      let corpo=req.params;
      console.log(req.params)
      let idProduto;
      let lojaId=corpo.id;
      let fornecCnpj;
      let razao;
      await Lojista.findOne({_id:lojaId})
                   .then((result)=>{
                         console.log('34',result);

                                RoupaStok.find({'produto.lojaid':`${lojaId}`})
                                    .then((vitrine)=>{
                                        //.......................................................
                                        if(vitrine==[]){
                                          console.log('[ 1089 ] resp > ',vitrine)
                                          res.render("_cooperado/lojista/roupas/vis-tempVazio",{ layout:'participe.handlebars'});
                                        }else{
                                            //...................................................
                                            for(let i=0;i<1;i++){
                                                let produto=vitrine[0].produto;
                                                fornecCnpj=produto.cnpjfornec
                                            }
                                          }    
                                          res.render("_cooperado/lojista/roupas/roupa_listar-temporario",{ layout:'lojista/roupaLista.handlebars',vitrine:vitrine,idx:lojaId,fornc:fornecCnpj});
                                    })
                                    .catch((e)=>{
                                      console.log(e)
                                    })
                   })
                   .catch((err)=>{
                     console.log(err)
                   })
})

router.get('/buscacnpj/:id',async(req,res)=>{
    // Faz uma busca para averiguação se o fabricante já consta no cadastro GERAL
    console.log('');
    console.log('____________________________________________');
    console.log('');
    console.log(' [ 990 ]');
    console.log(' origem views : views/_cooperado/lojista/fornecedor.handlebars');
    console.log(' origem route : route/_lojista/lojista/buscacnpj/:id');
    console.log(' obs : verifica se o cnpj já é cadastrao');
    console.log('');
    console.log(' destino : volta para :');
    console.log('           views/_cooperado/lojista/fornecedor.handlebars');
    console.log('')
    console.log('____________________________________________');
    console.log('')
    let fabricante=Object.values(req.params)
    fabricante=fabricante[0];
    //................................................
    let pos=fabricante.search(":=");
    let restante=fabricante.substr(pos+2);
    fabricante=fabricante.substring(0,pos);
    console.log('fabricante : ',  fabricante)
    
    console.log('restante',restante)
    let idex=restante;
    let letra=fabricante;
    let trocaletra=letra.replace("A",".")
    let result = trocaletra.replace("A", ".");
    result=result.replace("B","/");
    result=result.replace("C","-")
    //.........................................
    let id;
    let cnpj;
    let w={}
    await Fornecedor.findOne({cnpj:result,'lojista.lojaid':idex},{'lojista.lojaid':1,cnpj:1})
           .then((fornec)=>{
             console.log("");
             console.log('valor do fornec : ',fornec);
             console.log("_________________________________");
             w=fornec;
             if(!fornec  ||  undefined || []){
                //.....................................................
                console.log("");
                console.log('cnpj : ',result);
                console.log("______________________________________________");
                console.log("");
                Fornecedor.findOne({cnpj:result})
                          .then((respost)=>{
                             console.log('ficha : ',respost)
                             if(!respost || undefined){
                                console.log(' [ 1142 ] ')
                                let s={vr:0};
                                w=[
                                  vr=0.
                                ]
                                console.log('vr de s',s)
                                res.send(w)
                             }else{
                                console.log(67676)
                                let b=ObjectId(respost._id)
                                b=b.toString();
                                console.log('id do fornec',b)
                                w=[
                                  vr=1,
                                  id=b,
                                  cnpj=respost.cnpj,
                                ]
                                res.send(w);
                              }                 
                          }) 
                          .catch((err)=>{
                            console.log(err);
                          })
                //.....................................................
             }else{
                let n=[{vr:1}];
                let b=ObjectId(fornec._Id)
                b=b.toString();
                w=[
                  vr=1,
                  id=b,
                  cnpj=fornec.cnpj,
                  lojaid=restante
                ]
                //................................
                console.log("");
                console.log('dados do fabricante : ',w)
                console.log("_____________________________");
                res.send(w)
             }
           })
           .catch((err)=>{
                  console.log(err)
           })
})

router.post('/addlojista_fornecedor',async(req,res)=>{
    console.log('');
    console.log('____________________________________________');
    console.log('');
    console.log(' [ 1053  ]');
    console.log(' origem views : views/_cooperado/lojista/cad-fornecedor.handlebars');
    console.log(' origem route : route/_lojista/lojista/addlojista_fornecedor');
    console.log(' obs : vincula um lojista a um determinado fornecedor');
    console.log('');
    console.log(' destino : redirect ?????');
    console.log('');
    console.log('____________________________________________');
    console.log('');
    console.log(' retorno do body',req.body);
    let corpo=req.body;
    let fornecId=corpo.vinculaFornecId;
    let lojaId=corpo.vinculaLojaId;
    let lojaName=corpo.vinculaLojaName;
    let lojaSegmento=corpo.vinculaLojaSegmento;
    //.......................................................
    Fornecedor.find({_id:fornecId})
              .then((resp)=>{
                  console.log(' fornecedor : ',resp);
                  if(resp!=='undefined'){
                     Fornecedor.updateMany(
                                  {_id:fornecId},
                                  { $addToSet:{'lojista':[
                                                  {
                                                    lojaid:lojaId,
                                                    lojaname:lojaName,
                                                    lojasegmento:lojaSegmento,
                                                  }
                                                      ]
                                            }                
                                  } ,
                                {upsert:true}
                               )
                               .then((resp)=>{
                                   console.log('atualizado ou não ?',resp)
                                   //res.render("_cooperado/lojista/fornecedor", {layout:'lojista/admin-loja.handlebars',client:`${lojaId}`})
                                   res.redirect(`/redirect/redireciona_cadfornec/${lojaId}`)
                               })
                               .catch((er)=>{
                                   console.log(er)
                               })
                  }
              })
              .catch((er)=>{
                  console.log(er);
              })
});

router.get('/busca_next/:id',async(req,res)=>{
  console.log('');
  console.log('______________________________');
  console.log('');
  console.log(' [ 954 ]');
  console.log(' origem views :');
  console.log(' origem route :');
  console.log(' Obs: ');
  console.log('');
  console.log('________________________________');
  console.log('');
  console.log('req',req.params);
  let id=req.params.id;
  //...........................................................
  RoupaStok.findOne({_id:id})
           .then((resp)=>{
              console.log('');
              let loja=resp.produto.lojaid
              let fornec=resp.produto.cnpjfornec;
              let produtoAtual=resp.produto.codigo
              let produtoVitrine;
              console.log(loja)
              console.log(fornec)
              RoupaStok.find({'produto.cnpj':fornec,'produto.lojaid':loja},{'produto.detalhes':0})
                       .then((resp)=>{
                          const vitrine=resp.sort(function(a, b){return b - a});
                          let l=vitrine.length;
                          for (let i=0;i<l;i++){
                            let produtoNext=vitrine[i].produto.codigo;
                            console.log(produtoAtual,'<><><><><>',produtoNext)
                            if(produtoAtual<produtoNext){
                                produtoVitrine=vitrine[i];
                                break
                            }
                          }
                          console.log('produto vitrine',produtoVitrine)
                          console.log('');
                          produtoVitrine=produtoVitrine._id
                          res.redirect(`/redirect/next-produto-vitrine/${produtoVitrine}`)
                       }) 
           })
           .catch((er)=>{
             console.log(er)
           }) 
})

router.get('/busca_previous/:id',async(req,res)=>{
  console.log('');
  console.log('______________________________');
  console.log('');
  console.log(' [ 735 ]');
  console.log(' origem views :');
  console.log(' origem route :');
  console.log(' Obs: ');
  console.log('');
  console.log('________________________________');
  console.log('');
  console.log('req',req.params);
})
//????????????????????????????????????????????????????
router.post('/buscando_editando_vitrine',async(req,res)=>{
    console.log('');
    console.log('___________________________________');
    console.log('');
    console.log(' [ 1014 ]');
    console.log(' origem views :views/_cooperado/lojista/produto_visualizar');
    console.log(' origem route : route/_lojista/lojista/produto_editando_vitrine');
    console.log(' obs : Busca a page para editar o dados de vitrine');
    console.log('');
    console.log(' destino : _cooperado/lojista/produto_edita_vitrine.handlebars');
    console.log('');
    console.log(' ___________________________________');
    console.log('');
    console.log(req.body);
    let nucleo=req.body;
    let idProduto=nucleo.idproduto;
    RoupaStok.findOne({_id:idProduto})
             .then((vitrine)=>{
                  console.log('vitrine => ',vitrine)
                  res.render("_cooperado/lojista/roupas/roupa_edita_vitrine",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine});  
             })
             .catch((er)=>{
               console.log(er)
             })
})

//SOBRANDO
router.post('/artigos-lojista/:id',(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1041 ]');
  console.log(' origem views :views/_cooperado/lojista/produto_visualizar');
  console.log(' origem route : route/_lojista/lojista/produto_editando_vitrine');
  console.log(' obs : Busca a page para editar o dados de vitrine');
  console.log('');
  console.log(' destino : _cooperado/lojista/produto_edita_vitrine.handlebars');
  console.log('');
  console.log(' ___________________________________');
  console.log('');
  console.log(req.params);
  let idprod=req.params.id;
  //...................................................................
      RoupaStok.distinct("produto.artigo",{'produto.lojaid':`${idprod}`
                    })
               .then((resp)=>{
                   console.log(resp)
                   let L=resp.length;
                   if (L==0){

                   }else{

                   }
               })
               .catch((erro)=>{
                  console.log(erro)
               })     
})

router.post('/buscando_adcinar_size',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1073 ]');
  console.log(' origem views :views/_cooperado/lojista/produto_visualizar');
  console.log(' origem route : route/_lojista/lojista/produto_editando_vitrine');
  console.log(' obs : Busca a page para editar o dados de vitrine');
  console.log('');
  console.log(' destino : _cooperado/lojista/produto_edita_vitrine.handlebars');
  console.log('');
  console.log(' ___________________________________');
  console.log('');
  console.log(req.body);
  let nucleo=req.body;
  let idProduto=nucleo.idproduto;
  RoupaStok.findOne({_id:idProduto})
           .then((vitrine)=>{
                console.log(vitrine)
                res.render("_cooperado/lojista/roupas/roupa-adiciona-size",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine});  
           })
           .catch((er)=>{
             console.log(er)
           })
})

router.post('/buscando_inserir_cor',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1099 ]');
  console.log(' origem views :views/_cooperado/lojista/produto_visualizar');
  console.log(' origem route : route/_lojista/lojista/produto_editando_vitrine');
  console.log(' obs : Busca a page para editar o dados de vitrine');
  console.log('');
  console.log(' destino : _cooperado/lojista/produto_edita_vitrine.handlebars');
  console.log('');
  console.log(' ___________________________________');
  console.log('');
  console.log(req.body);
  let nucleo=req.body;
  let idProduto=nucleo.idproduto;
  RoupaStok.findOne({_id:idProduto})
           .then((vitrine)=>{
                console.log(vitrine)
                res.render("_cooperado/lojista/roupas/roupa-inseri-cor",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine});  
           })
           .catch((er)=>{
             console.log(er)
           })
    
})

router.post('/editando-extensao',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1126 ]');
  console.log(' origem views :views/_cooperado/lojista/roupas/roupa_add-complemento-cor');
  console.log(' origem route : views/_cooperado/lojista/roupas/editando-extensao.handlebars');
  console.log(' obs : grava a cor extensao e seus elementos complementares.');
  console.log('');
  console.log(' destino : vai para redirect/load-roupa-fotos');
  console.log('');
  console.log(' ___________________________________');
  console.log('');
  console.log(req.body);
  let nucleo=req.body;
  //......................................
  let idvitrine=nucleo.nameIdVitrine;
  let idextensao=nucleo.nameIdExtensao;
  let tamanho=nucleo.nameTamanho;
  tamanho=tamanho.toString();
  let qte=nucleo.nameQte;
  qte=parseInt(qte);
  let custo=nucleo.nameCusto;
  let vista=nucleo.nameVista;
  let prazo=nucleo.namePrazo;
  console.log('');
  console.log(custo,'-------------',vista,'-------------------',prazo) 
  //.....................................................................
  let page=nucleo.namePage;
  /////////////////////////////////////////////////////
  RoupaCor.findOne({_id:idextensao})
          .then((extensao)=>{
              console.log(' vr de extensao',extensao)
              let e1;
              [e1]=extensao.especificacao;
              console.log('valor da especificacao',e1._id);
              e1=e1._id;
              e1=e1.toString();
              console.log('-------------------------');
              console.log(e1)
              console.log('');
              RoupaCor.updateOne(
                                 {'especificacao._id':e1},
                                 {$set:{
                                   especificacao:[
                                            {
                                              tamanho:`${tamanho}`,
                                              qte:parseInt(`${qte}`),
                                            }
                                      ],
                                      precocusto:custo,
                                      precocusto:vista,
                                      precocusto:prazo,


                                        }
                                },
                                {upsert:false} ,

                       )
                       .then((result)=>{
                           console.log(result);
                           ////////////////////////////////////
                           RoupaStok.findOne({_id:idvitrine})
                                    .then((vitrine)=>{
                                       console.log(vitrine)
                                       RoupaCor.findOne({_id:idextensao})
                                               .then((extensao)=>{
                                                res.render("_cooperado/lojista/roupas/roupa_add-finalizado",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine,extensao:extensao});
                                               })
                                               .catch((e)=>{
                                                  console.log(e)
                                               })
                                    })
                                    .catch((error)=>{
                                       console.log(error)
                                    })
                       })
                      .catch((err)=>{
                           console.log(err);
                      })
          })
          .catch((er)=>{
             console.log(er)
          })
})

router.post('/editando-extensao-home',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1213 ]');
  console.log(' origem views :views/_cooperado/lojista/roupas/roupa_add-complemento-cor');
  console.log(' origem route : views/_cooperado/lojista/roupas/editando-extensao-home.handlebars');
  console.log(' obs : grava a cor extensao e seus elementos complementares.');
  console.log('');
  console.log(' destino : vai para redirect/load-roupa-fotos');
  console.log('');
  console.log(' ___________________________________');
  console.log('');
  console.log(req.body);
  let nucleo=req.body;
  //......................................
  let idvitrine=nucleo.nameIdVitrine;
  let idextensao=nucleo.nameIdExtensao;
  let tamanho=nucleo.nameTamanho;
  tamanho=tamanho.toString();
  let qte=nucleo.nameQte;
  qte=parseInt(qte);
  let custo=nucleo.nameCusto;
  let vista=nucleo.nameVista;
  let prazo=nucleo.namePrazo;
  console.log('');
  console.log(custo,'-------------',vista,'-------------------',prazo) 
  //.....................................................................
  let page=nucleo.namePage;
  /////////////////////////////////////////////////////
  RoupaCor.findOne({_id:idextensao})
          .then((extensao)=>{
              console.log(' vr de extensao',extensao)
              let e1;
              [e1]=extensao.especificacao;
              console.log('valor da especificacao',e1._id);
              e1=e1._id;
              e1=e1.toString();
              console.log('-------------------------');
              console.log(e1)
              console.log('');
              RoupaCor.updateOne(
                                 {'especificacao._id':e1},
                                 {$set:{
                                   especificacao:[
                                            {
                                              tamanho:`${tamanho}`,
                                              qte:parseInt(`${qte}`),
                                            }
                                      ],
                                      precocusto:custo,
                                      precocusto:vista,
                                      precocusto:prazo,


                                        }
                                },
                                {upsert:false} ,

                       )
                       .then((result)=>{
                           console.log(result);
                           ////////////////////////////////////
                           RoupaStok.findOne({_id:idvitrine})
                                    .then((vitrine)=>{
                                       console.log(vitrine)
                                       RoupaCor.findOne({_id:idextensao})
                                               .then((extensao)=>{
                                                res.render("_cooperado/lojista/roupas/roupa_add-finalizado-home",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine,extensao:extensao});
                                               })
                                               .catch((e)=>{
                                                  console.log(e)
                                               })
                                    })
                                    .catch((error)=>{
                                       console.log(error)
                                    })
                       })
                      .catch((err)=>{
                           console.log(err);
                      })
          })
          .catch((er)=>{
             console.log(er)
          })
})

router.get('/lixobom',(req,res)=>{
          RoupaCor.findOne({
                      $and:[
                        idProduto={$eq:{id_produto}},
                        corback={$eq:{cores}}
                      ]
                  })
                  .then((extensao)=>{
                  console.log('extensao =>',extensao)
                  RoupaCor.updateMany({
                                        $and:[
                                            idProduto={$eq:{id_produto}},
                                            cor={$eq:{cores}}
                                        ],
                                      },
                                      { $set:
                                        { especificacao:[
                                                      {
                                                        tamanho:`${tamanho}`,
                                                        qte:parseInt(`${qte}`),
                                                      }
                                                        ],
                                      precocusto:parseFloat(`${custo}`),
                                      precovista:parseFloat(`${vista}`),
                                      precoprazo:parseFloat(`${prazo}`),
                                    },
                            },
                            {upsert:false}
                          )

                  })
                  .catch((err)=>{
                    console.log(' [ 1667 ]',err)
                  })
///////////////////////////////////////////////////////////////////////////
                  function inserteCor(){
                    //....................................................
                    try{
                          console.log('cores :',cores)
                          console.log('__________________________________________');
                          RoupaCor.insertMany({
                              obj:1,
                              idProduto:`${id_produto}`,
                              lojaid:`${lojaid}`,
                              corback:`${corBack}`,         
                              corfront:`${corFront}`,         
                              corInput:`${corInput}`,         
                              urlfront:'https://',  
                              urlleft:'https://',  
                              urlback:'https://',  
                              urlright:'https://',  
                              
                              especificacao:[
                                      {
                                        tamanho:`${tamanho}`,
                                        qte:`${qte}`,
                                        precocusto:`${custo}`,
                                        precovista:`${vista}`,
                                        precoprazo:`${prazo}`,
                                        posicao:0,
                                        page:"default",
                                      },  
                              ],
                              
                          })
                          .then((result)=>{
                            console.log('Resultado da inserção :');
                            let r5=result;
                            [r5]=r5;
                            r5=r5._id
                            console.log('new object()',result)
                            r5=r5.toString();
                            console.log('----',r5)
                            let G=id_produto + ":"  + r5;
                            //.....................................................................
                            buscanovosElements(id_produto,r5)
                            //......................................................................
                          })
                          .catch((err)=>{
                            console.log(err);
                          })
                        }catch(e){
                          console.log(e)
                        }      
                  }
                  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                  function buscanovosElements(idproduto,idcor){
                      RoupaStok.find({_id:idproduto})                 
                              .then((vitrine)=>{
                                  console.log('vitrine =>  : ',vitrine);
                                  //let r7;
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
                                          // [dados]=resp;
                                          // let especie;
                                          // [especie]=dados.especificacao;
                                          // console.log(especie)
                                            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                                            //res.render("_cooperado/lojista/roupas/roupa-foto",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine,extensao:extensao});  
                                            ////////////////////////////////////////////////
                                          })  
                                          .catch((e)=>{
                                            console.log(e)
                                          })
                                  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                              })
                              .catch((e)=>{
                                console.log(e)
                  }) 
                  } 
})

// Vem de index.controllers [466]
router.get('/roupa_add-complemento-home/:id',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1421 ]');
  console.log(' origem views :views/partials/roupa/_header-table-cor-front');
  console.log(' origem route : route/src/controlles/index.controllers');
  console.log(' obs : Vai inserir as fotos antes de colocar a cor,tamanho,etc...');
  console.log('');
  console.log(' destino : views/_cooperado/lojista/roupas/roupa_add-complemento-home');
  console.log('req.params :',req.params);
  let palavra=req.params;
  console.log('palavra',palavra)
  let idProduto=palavra.id;
   RoupaStok.findOne({_id:idProduto})
            .then((vitrine)=>{
               let number=vitrine.produto.homenumbercor;
               RoupaCor.findOne({_id:number}
                        )
                        .then((extensao)=>{
                             res.render("_cooperado/lojista/roupas/roupa_add-complemento-home",{ layout:'lojista/roupa-coloca-foto.handlebars',vitrine:vitrine,extensao:extensao});  
                        })
                        .catch((err)=>{
                           console.log(err);
                        })
            })
})

router.post('/inserir-foto',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1449 ]');
  console.log(' origem views :views/_cooperado/lojista/roupa/roupa_visualizar.handlebars');
  console.log(' origem route : route/_lojista/roupas.js/inserir-foto');
  console.log(' obs : Vai inserir as fotos antes de colocar a cor,tamanho,etc...');
  console.log('');
  console.log(' destino : views/_cooperado/lojista/roupa/add-homefoto-homecor.handlebars');
  console.log(req.body);
  let idProduto=req.body.idproduto;
  console.log('idProduto :',idProduto)
  RoupaStok.findOne({_id:idProduto})
           .then((vitrine)=>{
              console.log('vitrine :',vitrine)
              let idfoto=vitrine.produto.homenumbercor;
              console.log('idfoto',idfoto);
              if(idfoto=='default' || idfoto==''){
                res.render("_cooperado/lojista/roupas/roupa_add-homefoto-homecor",{ layout:'lojista/roupa-coloca-foto.handlebars',vitrine:vitrine});  
              }else{
                RoupaCor.findOne({_id:idfoto})
                      .then((extensao)=>{
                        console.log(extensao)
                        res.render("_cooperado/lojista/roupas/roupa_add-homefoto-homecor",{ layout:'lojista/roupa-coloca-foto.handlebars',vitrine:vitrine,extensao:extensao});  
                      })
                      .catch((er)=>{

                      })
              }
           })
           .catch((err)=>{
             console.log(err);
           })
})  

router.get('/inserir-foto/:id',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1485 ]');
  console.log(' origem views :views/_cooperado/templates/roupa-1.handlebars');
  console.log(' origem route : route/_lojista/roupas.js');
  console.log(' obs : Vai inserir as fotos antes de colocar a cor,tamanho,etc...');
  console.log('');
  console.log(' destino : views/_cooperado/templetes/roupas-1.handlebars');
  console.log(req.params);
  //return
  let idProduto=req.params.id;
  console.log(idProduto)
  RoupaStok.findOne({_id:idProduto})
           .then((vitrine)=>{
              console.log('vitrine :',vitrine)
              let idfoto=vitrine.produto.homenumbercor;
              console.log('idfoto',idfoto);
              if(idfoto=='def'){
                res.render("_cooperado/lojista/roupas/roupa_add-homefoto-homecor",{ layout:'lojista/roupa-coloca-foto.handlebars',vitrine:vitrine});  
              }else{
              RoupaCor.findOne({_id:idfoto})
                      .then((extensao)=>{
                        console.log(extensao)
                        res.render("_cooperado/lojista/roupas/roupa_add-homefoto-homecor",{ layout:'lojista/roupa-coloca-foto.handlebars',vitrine:vitrine,extensao:extensao});  
                      })
                      .catch((er)=>{

                      })
                  }
           })
           .catch((err)=>{
             console.log(err);
           })
})

router.post('/tablecor-gravar/:id',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1790 ]');
  console.log(' origem views :views/_cooperado/lojista/roupas/roupa-foto.handlebars');
  console.log(' origem route : route/=> /gravarCores()');
  console.log(' obs : Grava todas as cores em uma tabela ');
  console.log('');
  console.log(' destino : views/_cooperado/lojista/roupas/roupa-foto.handlebars');
  console.log(req.params);
  let nucleo=req.params;
  nucleo=nucleo.id;
  let l=nucleo.length;
  let nomecor=nucleo.substring(0,6);
  let codigocor=nucleo.substring(7,l);
  console.log(nomecor , '----',codigocor) 
  try{
      TableCor.insertMany(
              {
                nomecor:nomecor,
                codigocor:codigocor
              }
              ).then((extensao)=>{
                res.send(extensao);
              })
              .catch((err)=>{
                console.log(err);
              })
            }catch(e){
               console.log(e);
            }          
})

router.post('/buscarCores-elements/:id',async(req,res)=>{
    console.log('');
    console.log('___________________________________');
    console.log('');
    console.log(' [ 2013 ]');
    console.log(' origem views :views/_cooperado/lojista/roupa_add-homefoto-homecor.handlebars');
    console.log(' origem route : route/_lojista/roupas.js/buscarCores-elements/:id');
    console.log(' obs : Pega a foto escolhida para homeurl');
    console.log('');
    console.log(' destino : views/_cooperado/lojista/roupa/roupa_add-homefoto-homecor.handlebars');
    console.log(' ___________________________________');
    console.log('');
    let corpo=req.params;
    console.log(corpo);
    let idprod=corpo.id;
    RoupaCor.findOne({_id:idprod})
            .then((resp)=>{
               console.log(resp) 
               res.send(resp)
            })
            .catch((err)=>{
                console.log(err)
            })
})

router.post('/visualizar-result',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1583 ]');
  console.log(' origem views :views/_cooperado/lojista/roupa-foto.handlebars');
  console.log(' origem route : action:/visualizar-result');
  console.log(' obs : após gravar as imagens volta para verificação da implematação da nova cor.');
  console.log('');
  console.log(' destino : views/_cooperado/lojista/roupa_visualizar.handlebars');
  console.log('????');
  console.log(' ___________________________________');
  console.log('');
  console.log('______________________________________________________________________');
  console.log('');
  //...........................................
  console.log('req.body : ',req.body);
  let idProduto;
  //let produto;
  idProduto=req.body.NamevalorId;
  console.log('');
  console.log('____________________________________');
  console.log('');
  //....................................................................
  // Tenho o código do produto
  await RoupaStok.findOne({_id:`${idProduto}`})
                  .then((vitrine)=>{
                        console.log('');
                        console.log('',vitrine);
                        //produto=vitrine;
                        console.log('');
                        /////////////////////////////////////////////////////////////////
                       // console.log('valor do produto : ',produto) 
                        console.log('');
                        console.log('');
                        console.log('___________________________________________');
                        res.render("_cooperado/lojista/roupas/roupa_visualizar",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine});
                        console.log('');
                        console.log('_______________________________________________________');
                        
                  }) 
                  .catch((er)=>{
                    console.log(er)
                  })
})

router.post('/busca-artigo/:id',async(req,res)=>{
    console.log('');
    console.log('___________________________________');
    console.log('');
    console.log(' [ 1629 ]');
    console.log(' origem views :views/_cooperado/lojista/roupa/roupa_vizualizar.handlebars');
    console.log(' origem route : _cooperado/lojista/ruopa/roupa_visualizar/fecnt=> busca-artigo/:id');
    console.log(' obs : buscar os artigos cadastrados para o fornecedor.');
    console.log('');
    console.log(' destino : views/_cooperado/lojista/roupa_visualizar.handlebars');
    console.log('           completa a lista de artigos ');
    console.log(' ___________________________________');
    console.log('');
    let idClient=req.params.id;
    console.log(idClient)
    RoupaStok.distinct("produto.artigo",{_id:{$eq:`${idClient}`}})
             .then((resp)=>{
                 console.log('------------------',resp)
             })
             .catch((er)=>{
               console.log(er);
             }) 
})

router.get('/volta-detalhe-temp/:id',async(req,res)=>{
  console.log('')
  console.log('---[ 1651 ] lojista/volta-detalhe-temp/:id-------')
  console.log('--- Essa rotina vem do edit-detalhe-AddText ----')
  console.log('----e load vis-EditTamanhoqte ------------------')
  let nucleo=req.body;
  console.log(nucleo)
  let corpo=req.params;
  console.log('valor do params',corpo)
  let idProduto=corpo.id;
  console.log('vr de corpo',corpo);
  console.log('')
  console.log('---------------------------------')
 // corpo=corpo.id;
  //corpo=corpo.replace("&&&","/");
  //console.log('valor do corpo',corpo)
  //console.log('-------------------------------------------')
  //let palavra=corpo;
  //let pos=palavra.search(":")
 // let cnpjfornec=palavra.substring(0,pos)
 // console.log('cnpjfornec',cnpjfornec)
 // console.log('-------------------------------------')
 // let l=palavra.length;
 // palavra=palavra.substring((pos+2),l)
 // pos=palavra.search(':');
 // cnpjloja=palavra.substring(0,pos);
 // console.log('cnpjloja',cnpjloja)
  //....................................
 // l=palavra.length;
 // pos=palavra.search(':');
 // palavra=palavra.substring((pos+2),l)
 // let codigo=palavra;
 // console.log('valor de linha 1182',palavra)
  //................................................................
 // pos=palavra.search(":")
 // let lojaid=palavra.substring(0,pos)
 // console.log('lojaid',lojaid);
  //.......................................................
 // palavra=palavra.substring((pos+3),l)
 // console.log('restante',palavra) 
 // l=palavra.length;
 // pos=palavra.search(':');
 // codigo=palavra.substring(0,pos)
  //return
  //.................................................................
  await RoupaStok.findOne({_id:`${idProduto}`})
          .then((resp)=>{
               let {produto}=resp;
               let w=produto.detalhes;
               let detalhe=produto.detalhes;
               detalhe.sort(detalhe.cor)
               console.log('vr de detalha',detalhe)
               console.log('---------------------------');
               ///////////////////////////////////////////////////////////////////////////////////////
               RoupaStok.findOne({_id:`${idProduto}`},{'produto.detalhes':1})
                       .then((r)=>{
                            console.log('vr de r',r)
                            let idProduto=r._id;
                            let letra=r.produto.detalhes;
                            console.log('vr de letra',letra)
                           // let cnpjloja=r.produto.cnpjloja;
                            //let [test]=letra;
                            //let nId=r._id;
                             //nId=nId.toString();
                            console.log()
                            H={
                              cnpjfornec:cnpjfornec,
                              cnpjloja:cnpjloja,
                              idproduto:idProduto
                            }
                            ///////////////////////////////////////////////volta-detalhe-temp//////////////////////////////////////
                            res.render("_cooperado/lojista/produto_edita",{ layout:'roupa-edita-temp.handlebars',produto:produto,detalhe:detalhe,h:H});
                            ///////////////////////////////////////////////////////////////////////////
                       })
                       .catch((err)=>{
                          console.log(err)
                       })
          }) 
          .catch((er)=>{
            console.log(er)
          })
})

router.post('/delete-image',async(req,res)=>{
      // Criei uma nova chave para conectar :
      // teste:DO00DYVYEWTVQF8GLBZV
      // EyQ0d2w9F/aNjPbbONkuaOlnyzwtRXP7FCwdB8Qleng
      

      const s3Client = new S3({
            forcePathStyle:false, // Configures to use subdomain/virtual calling format.
            endpoint:"https://nyc3.digitaloceanspaces.com",
            region: "us-east-1",
            credentials: {
              accessKeyId: 'DO00DYVYEWTVQF8GLBZV',
              secretAccessKey:'EyQ0d2w9F/aNjPbbONkuaOlnyzwtRXP7FCwdB8Qleng'
            }
      });
      
      ////////////////////////////////////////////////////////////////////////
      console.log('20000')
      const bucketParams = {
          Bucket: "amelia",
          Key: "https://amelia.nyc3.digitaloceanspaces.com/0084b9ed57d909354838_biquiniVermelho.png"
      };
      console.log('_____________________________________________________');
      console.log('');
      try{
          s3Client.deleteObject(bucketParams,(error,data)=>{
              if(error){
                res.status(500).send(error);

              }
              res.status(200).send("file has been deleted successfully")
          })
          //const data=await s3Client.send(new DeleteObjectCommand(bucketParams));
          //console.log("Success",data);
          //return data;
        }catch(err){
           console.log("Error - 1000",err)
        }
})

router.post('/complemento_home',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1776 ]');
  console.log(' origem views :views/_cooperado/lojista/roupas/roupa_add-homefoto-homecor.handlebars');
  console.log(' origem route : route/_lojista/roupas/complemento_front/:id');
  console.log(' obs : Vai inserir as fotos left,back right e as extensões,etc...');
  console.log('');
  console.log(' destino : views/_cooperado/lojista/roupas/roupas_add-complemento-front.handlebars');
  ///.............................
  console.log(req.body);
  let idProduto=req.body.nameidProduto;
  let idCor=req.body.nameidCor;
  console.log('vr do idproduto',idProduto)
  console.log('');
  RoupaStok.findOne({_id:idProduto})
           .then((vitrine)=>{
              console.log(vitrine)
              console.log('');
              let numberCor=vitrine.produto.homenumbercor;
              let l=numberCor.length;
              console.log('comprimento :',l)
              if (l!=24){
                // res.render("_cooperado/lojista/roupas/roupa_add-homefoto-homecor",{ layout:'lojista/roupa-coloca-foto.handlebars',vitrine:vitrine});  
              }else{
                RoupaCor.findOne({_id:numberCor})
                        .then((extensao)=>{
                           console.log('vr da extensao',extensao)
                           res.render("_cooperado/lojista/roupas/roupa_add-complemento-home",{ layout:'lojista/roupa-coloca-foto.handlebars',vitrine:vitrine,extensao:extensao});  
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

router.post('/editar-produto-tamanho',async(req,res)=>{
    console.log('');
    console.log('__________________________________________________');
    console.log('  [ 1817 ]                                         ');
    console.log('  origem views : views/_cooperado/lojista/edita-produto.handlebars ');
    console.log('  origem route :route/_lojista/ediatr-produto-tamanho ')
    console.log('');
    console.log('  Obs : de "editar-produto.handlebars/->/form/action="/lojista/editar-produto-tamanho" ')
    console.log('  destino/fetch: Errado !..add-produto-nvsize')
    console.log('');
    console.log('---------------------------------------')
    let nucleo=req.body;
    console.log(req.body)
    //console.log('nucleo',nucleo);
    let idProduto=nucleo.editarDetalheIdProduto;
    let codigo=nucleo.editarDetalheCodigoProduto
    let idDetalhe=nucleo.editarDetalheIdDetalhe;
    let corBack=nucleo.editarDetalheCorBack;
    let corInput=nucleo.editarDetalheCorInput;
    let size=nucleo.editarDetalheTamanho;
    let qte=nucleo.editarDetalheQte;
    let pcusto=nucleo.editarDetalhePCusto;
    let pvista=nucleo.editarDetalhePVista;
    let pprazo=nucleo.editarDetalhePPrazo;
    let posicao=nucleo.editarDetalhePosicao;
    console.log(' [ 1630 ] idProduto : ',idProduto)
    await RoupaStok.findOne(
                         { _id:idProduto,
                           'produto.detalhes.corback':corBack,
                           'produto.detalhes.tamanho':size},
                         { 'produto.detalhes':1}
                              )
                   .then((resp)=>{
                        console.log(' [ 1639 ] resultado : ',resp)
                        let celula=resp.detalhes;
                        console.log('retorno da resp.detalhes');
                        console.log(celula)
                        let x=resp;
                        if(x==null){
                            console.log(' [ 23281623 ] a resposta é nula ')
                            //.....................................  
                            RoupaStok.updateMany(
                                      {_id:idProduto},
                                      { $addToSet:{
                                       'produto.detalhes':[
                                                  {
                                                    urlfront:"anotar",
                                                    urlleft:"anotar",
                                                    urlback:"anotar",
                                                    urlright:"anotar",
                                                    corback:corBack,  
                                                    corinput:corInput,  
                                                    tamanho:size,
                                                    qte:qte,
                                                    precocusto:pcusto,
                                                    precovista:pvista,
                                                    precoprazo:pprazo,
                                                    posicao:posicao, 
                                                  }
                                                        ]
                                               }                
                                      } ,
                                      {upsert:true}
                                     )   
                                     .then((result)=>{
                                        console.log('result cria-novacor :',result)
                                        console.log('idProduto dentro de front',idProduto)
                                        console.log('')
                                        console.log('redireciona => (/redirect/back-detalhe-temp)')
                                        res.redirect(`/redirect/back-detalhe-temp/${idProduto}`)
                                     })
                                     .catch((er)=>{
                                        console.log(er)
                                     })
                        }else{
                            console.log(' Se não é nula , então há registro : produto já cadastrado',0);
                            let letra ='0'
                            res.send(letra);
                        }
                   })
                   .catch((ERR)=>{
                      console.log(ERR)
                   })
}) 

router.post('/produt_editatemp',(req,res)=>{
   console.log("");
   console.log("_______________________________________________")
   console.log(" [ 1902 ]")
   console.log(" origem views  : --vem de lista-temporario  -------------------")
   console.log("--router:post//lojista/corFrame-1----")
   console.log("-------------------------------------------")
   console.log("")
   console.log('vr da body',req.body)
   let cnpjfornec=req.body.prodCnpjfornec;
   let cnpjloja=req.body.prodCnpjloja;
   let codigo=req.body.prodCodigo;
   let descricao=req.body.prodDescricao;
   let detalhe=req.body.prodDetalhe;
   let tecido=req.body.prodTecido;
   let cor=req.body.prodCor;
   console.log('vr de codigo',codigo,descricao,detalhe,tecido,cor)
 
   ProdTemp.updateOne(
            {'produto.cnpjfornec':`${cnpjfornec}`,'produto.cnpjloja':`${cnpjloja}`,'produto.codigo':`${codigo}`},
            { $set:{'produto.codigo':`${codigo}`,
                    'produto.descricao':`${descricao}`,
                    'produto.detalhe':`${detalhe}`,
                    'produto.tecido':`${tecido}`,
                    'produto.cor':`${cor}`,
                   },
                   
           },
           {upsert:false}
           )
          .then((resp)=>{
               res.redirect(`/redirect/back-detalhe-temp/${idProduto}`)
               
           })
           .catch((err)=>{
              console.log(err)
           })
})

router.get('/cria_header-page/:id',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1942 ]');
  console.log(' origem views : views/_cooperados/admin/admincooperados.handlebars');
  console.log(' origem route : _lojista/roupa.js/cria_header-page');
  console.log(' obs : criar logotipo para lista no site');
  console.log('       criar logotipo para cabeçalho do site');
  console.log('');
  console.log(' destino : views/_cooperados/templates/roupa-header-logo.');
  console.log('');
  console.log(' ___________________________________');
  console.log('');

  let idLoja=req.params.id;
  console.log('');
  console.log(" id lojista : ",idLoja)
  console.log('__________________________________________________');
  console.log('');
  Lojista.findOne({ _id:idLoja},{urllogolista:1,urllogomarca:1,urltitulopage:1})
         .then((r1)=>{
            console.log('......>',r1);
            res.render("_cooperado/templates/roupa-header-logo",{ layout:'lojista/admin-loja.handlebars',idLoja:idLoja,r1:r1});
         })
         .catch((er)=>{
            console.log(er) ;
         })



  
})

// monta a page para detalhar a compra
router.post('/page-roupa-detalhe',(req,res)=>{
   console.log('');
   console.log(' [ 19753 ]');
   console.log(' origem: views/_cooperado/templates/roupa-1.handlebard');
   console.log(' route : route/page_visu?al-page=>')
   console.log(' carrega a page dos detalhes do produto quantas cores,condições de pagamento ....')
   console.log(req.body)
   console.log(req.params)
   res.render("_cooperado/templates/detalhe-1",{ layout:'detalhe-1.handlebars'});
})

router.get('/img_painel/:id',async(req,res)=>{
  console.log('');
  console.log(' [ 1986 ]');
  console.log('');
  console.log(' origem views : views/_cooperado/templates/roupa-1.handlebars');
  console.log(' origem route : route/_lojista/lojista/get/img_painel/:id');
  console.log('');
  console.log(' obs : busca as imagem do painel correspondente ao produto selcionado para posicionar no site')
  console.log('')
  console.log(' destino : response ImgLoad() [ 1965 ]');
  console.log('')
  console.log('_____________________________________________')
  console.log('')
  let q=req.params;
  console.log('params :?? ',req.params)
  let s=q.id;
  console.log('params id :',q.id)
  //...............................................................................
  let pos=s.search(":=");
  let palavra=s.substring(0,pos);
  let l=s.length;
  palavra=s.substring((pos+2),l);
  //................................... 
  s=palavra;
  console.log('palavra S ::::',s)
  console.log('');
  //...................................
  let ArrayImg=[];
  let objetoImg={};
  let pacoteImg={};
  let zero=0;
  console.log('________________________________________________')
  console.log('ATENÇÃO REFAZER A CONSULTA $AND ARTIGO:HOME FALTA DEFINIR A LOJA');
  console.log('________________________________________________')
  await  RoupaStok.find( {$and:[
                               {'produto.pagename':`${s}`},
                               {'produto.pageposicao':{$gt:`${zero}`}},
                               {'produto.lojaid':`${idloja}`}
                             ]
                        },
                        {'produto.codigo':1,'produto.posicao':1,'produto.detalhes':1})
                  .then((detal)=>{
                    console.log('');
                    if( typeof(detal)==='object' || detal!='undefined'){
                       // console.log('_____________________________________');
                        console.log('');
                        console.log("Não há nada publicado : ",s)
                        console.log('____________________________________');
                        console.log('');
                    }else{
                        console.log(' [ 1538 ] produtos que já estão publicado :');
                        let P;
                        [P]=detal;
                        
                        console.log('valor de p ',P)
                        console.log('');
                        const iterator=detal.values();
                        let p=0;
                        for (const value of iterator){
                            // Aqui (iterator) pega o valor do detalhes de acordo com project=>loja.posicao.detalhes.pos':1
                            let objeto=value;
                            //console.log('value objecto',objeto);
                            let nucleo=objeto.produto;
                            //console.log('vr do núcleo',nucleo);
                            let codigo=nucleo.codigo;
                            //console.log('codigo',codigo)
                            let detalhes=nucleo.detalhes
                          // console.log('detalhes : ',detalhes[0]);
                            const X=detalhes
                            for (const value of X){
                              let obj=value;
                              // console.log('value OBj',p,' <> ' ,obj)
                              let num=obj.pos;
                              if (num>0 && obj.page=="home"){
                                console.log(obj.page)
                                ArrayImg.push(obj.urlfront + "&:&" +  obj.pos + "&:&" + codigo)
                                console.log(obj.urlfront + "-" +  obj.pos + "-" + codigo)
                              }
                            }
                            //.............................................      
                            p++;
                        }        
                    }
                    //.........................................................
                    pacoteImg={
                          imgUrl:ArrayImg,
                    }
                    res.send(ArrayImg);
                  })
                  .catch((er)=>{
                    console.log('vr de er',er)
                  }) 
})

router.get('/img_space_/:id',async(req,res)=>{
  console.log('');
  console.log('_________________________________________________');
  console.log('');
  console.log(' [ 2084 ]');
  console.log(' origem views : views/_cooperado/templates/roupa-1.handlebars');
  console.log(' origem route : route/_lojista/lojista/get/img_space_/:id');
  console.log('');
  console.log(' obs : Se há produtos publicados então peguemos as imagens correpondente. ');
  console.log('');
  console.log(' destino : ');
  console.log('');
  console.log('_________________________________________________');
  console.log('');
  let q=req.params;
  console.log(' ainda [ 2095 ]')
  console.log(' id :',q)
  q=q.id;
  console.log(" 2098 ",q)
  let pos=q.search("&&&");
  let l=q.length;
  let idloja=q.substring(0,pos);
  console.log(' idloja : ',idloja)
  console.log(' posição : ',pos,)
  console.log(' lenght :',l)
  let artigo=q.substring((pos+3),l)
  console.log(' nome artigo : ',artigo)
  console.log('');
  console.log('____________________________________________________');
  //................................................
  let ArrayImg=[];
  let objetoImg={};
  let pacoteImg={};
  let zero=0;
  await RoupaStok.find({
                        $and:[
                          {
                            'produto.lojaid':`${idloja}`,
                            'produto.artigo':`${artigo}`,
                            'produto.posicao':{$gt:`${zero}`}
                          }
                        ]
                     },
                     {'produto.codigo':1,'produto.detalhes':1}
                 )
                 .then((resp)=>{
                    //............................................................
                    if(resp!='undefined'){
                      console.log(' [ 1671 ] Não há nada publicado com : ',artigo);
                      console.log('');
                    }else{
                        let len=resp.length;
                        let J=resp.values();
                        console.log('valor de resp  : ',J);
                        //........................................
                        const iterator=resp.values();
                        let p=0;
                        for (const value of iterator){
                            // Aqui (iterator) pega o valor do detalhes de acordo com project=>loja.posicao.detalhes.pos':1
                            let objeto=value.produto;
                            let P=objeto.codigo;
                            let quadroImg=objeto.detalhes;
                            const iterat=quadroImg;
                                    for (const value of iterat){
                                        let posicao=value.pos;
                                        let uR=value.urlfront;
                                        if(typeof(uR)==undefined){
                                              console.log('Belo!')
                                        }else if(uR!=='anotar'){
                                              console.log('código : ',P);
                                              let W=value.urlfront;
                                              let urlfront;
                                              let pos=value.pos;
                                              let page=value.page;
                                              if(typeof(W)=='undefined'){
                                                console.log('Belo!')
                                              }else{
                                                urlfront=value.urlfront;
                                                console.log('')
                                                //console.log('****************************************************')
                                                console.log('URLFRONT : ',urlfront);
                                                console.log('')
                                                console.log('valor da posição : ',pos);
                                                console.log('')
                                                pos=value.pos;
                                                //console.log('valor da Value.pos',pos)
                                                console.log('')
                                                //console.log('****************************************************')
                                                if(pos>0){
                                                    pos=value.pos;
                                                    console.log('valor da page-->',value.page)
                                                    page=value.page;
                                                    objetoImg = P  + " &-& " + urlfront + " &-& " + pos + " &-& " + page;
                                                    ArrayImg.push(objetoImg)
                                                }else{
                                                  console.log(' não há posição !=zero : ',pos)
                                                }
                                              }
                                              console.log('')
                                        }
                                    }    
                            //................................................;
                            p++;
                        }
                        console.log('');
                        console.log(' [ 1768 ] ArrayImg',ArrayImg);
                        console.log('');
                        pacoteImg={
                            imgUrl:ArrayImg,
                        };
                        console.log(' valor do ArrayImg',ArrayImg);
                        res.send(ArrayImg);
                    }    
                 })
                 .catch((er)=>{
                    console.log('vr de er',er);
                }) 
})

router.post('/pesquisar-field-codigo',(req,res)=>{
   console.log('');
   console.log(' [ 2201 ] ')
   console.log('-----------------------------------------')
   console.log(' /lojista/pesquisar-field-codigo -----')
   console.log('-----------------------------------------')
   console.log('')
   let codigo=3;
   try{
          Detalhe.findOne({'produto.codigo':`${codigo}`})
                  .then((resp)=>{
                    console.log('codego',resp)
                  }) 
                  .catch((err)=>{
                    console.log('não encontrado o codigo')
                  })
      }catch(e){
         console.log('vr de e',e)
      }
})
// ligada a roupa-1 para criar page Lojista Roupa
router.post('/buscar-artigo/:id',async(req,res)=>{
  console.log('');
  console.log('_______________________________________________');
  console.log('');
  console.log(' [ 2224 ]');
  console.log(' origem views : views/_cooperado/template/roupa-1.handlebars');
  console.log(' origem route : routes/_lojista/lojista/bus?car-artigo/:id');
  console.log('');
  console.log(' obs : busca o nome dos artigos do lojista para produção da page site ');
  console.log('');
  console.log(' destino : preencher a lista lateral/menu para dividir as pages ');
  console.log('')
  console.log('_____________________________________________________');
  console.log('');
  console.log(req.params)
  console.log('');
  let lojaid=req.params.id
  //return
  //......................................................
  await  RoupaStok.distinct("produto.artigo",{'produto.lojaid':`${lojaid}`})
              .then((result)=>{
                  console.log('');
                  let l=result.length;
                  let obj=[]
                  for (let i=0;i<l;i++){
                    let N=result[i];
                    N=N.trim();
                    //.........................  
                    if (N!=="home" && N!=="anotar"){
                       obj.push(N);
                    }
                  }
                  //......................................
                  console.log(obj)
                  res.send(obj)
              })
              .catch((er)=>{
                  console.log(er)
              })
})

router.post('/busc-fornec-lojista/:id',async(req,res)=>{
    console.log('')
    console.log('____________________________________________')
    console.log('')
    console.log(' [ 2265 ] ')
    console.log(' origem views : views/_cooperado/templates/roupa-1.handlebars')
    console.log(' origem route : route/_lojista/roupa.js/busc-fornec-lojista ')
    console.log(' obs: ');
    console.log('      busca os fornecedores do lojista para serem selecionados com o objetivo de lista produtos');
    console.log('      ou seja,buscar os produtos do fornec selecionado.');
    console.log('');
    console.log(' destino : response : irá carregar o select no modal  ');
    console.log('_____________________________________________');
    console.log('');
    console.log(req.params);
    let corpo=req.params;
    let lojaid=req.params.id;
    console.log(lojaid)
     await Fornecedor.find(
                           {'lojista.lojaid':lojaid},{marca:1}
                           )
                          .then((resp)=>{
                            console.log(resp)
                            res.send(resp)
                          }) 
                          .catch((err)=>{
                            console.log(err)
                          })
})

router.post('/transfer-estoque',(req,res)=>{
    console.log('')
    console.log(' [ 2293 ] ')
    console.log(' transfere o estoque de temporario para estoque real')
    console.log('-----------------------------------------')
    console.log('')
    //...............................................................
    let dados=req.body;
    console.log('dados',dados)
    console.log(dados.caju)
    console.log(dados.pera)
    let c=dados.caju;
    let d=dados.pera;
    ProdTemp.find({cnpjfornec:`${c}`,lojaid:`${d}`})
            .then((result)=>{
                  console.log('result',result)
                  console.log(result.length)
                  if(result.length>0){
                     res.render("_cooperado/lojista/visualizar-estoque",{ layout:'loja-formata.handlebars',produto:result});
                  }else{
                    console.log('procure o administrador')
                  }
            }) 
            .catch((er)=>{
                console.log(er)
            })
})

router.post('/edita-produtovitrine',async(req,res)=>{
    console.log('');
    console.log('__________________________________________');
    console.log(' [ 2322 ]                                 ');
    console.log('');
    console.log(' origem views : views/_cooperado/lojista/edita_produto.handlebars ');
    console.log(' origem route : route/_lojista/lojista.js');
    console.log(' obs : edita dados da vitrine: descrição,detalhe,tecido,artigo');
    console.log('');
    console.log(' destino : res.redirect(`vis-detalhe-temp/${idproduto}`)       ')
    console.log('');
    //..................................
    let idproduto=req.body.idProduto;
    idproduto=idproduto.trim();
    
    let descricaoProduto=req.body.descricaoProduto;
    let completeProduto=req.body.completeProduto;
    let tecidoProduto=req.body.tecidoProduto;
    let artigoProduto=req.body.artigoProduto;
    let produto={};
    let corpo;
    //................................................................
    await RoupaStok.updateOne(
       {
         _id:idproduto, 
       },
       {$set: {
               'produto.descricao':`${descricaoProduto}`,
               'produto.complete':`${completeProduto}`,
               'produto.tecido':`${tecidoProduto}`,
               'produto.artigo':`${artigoProduto}`,
              }
       }  )
      .then((result)=>{
            console.log('');
            console.log('____________________________');
            console.log(result)
            console.log('____________________________');
            //..............................................................
            RoupaStok.findOne({_id:idproduto},{produto:1})
               .then((resp)=>{
                 // console.log('valor da linha 1633 >>>>>>>>>>>>>>>>>>>>>>>>>',resp);
                  corpo=resp;
                  console.log('');
                  console.log('corpo : ')
                  console.log(corpo);
                  let produto=corpo.produto;
                  let detalhe=produto.detalhes;
                  //..................................................................
                  let H={
                    idproduto:idproduto,
                  };
                  console.log('valor de H :')
                  console.log(H)
                  console.log('______________________________________________________');
                  console.log('');
                  console.log('redirect/vis-detalhe-temp');
                  console.log('');
                  console.log('______________________________________________________');
                  res.redirect(`/redirect/back-detalhe-temp/${idproduto}`)
                  //............................................................................
                 
            })
            .catch((er)=>{
               console.log('[ 2630 ]',er)
            })
      })
      .catch((er)=>{
        console.log(er);
      })
})

router.post('/cria-novaCor',async(req,res)=>{
    console.log('');
    console.log('____________________________________________________');
    console.log('');
    console.log('  [ 2395 ]                           ')
    console.log('  origem views : views/_cooperado/edita-produto.handlebars  ')
    console.log('  origem route : route/_lojista/lojista/cria-novaCor        ')
    console.log('  obs : Vem do fetch/cria-novaCor/edita-produto             ')
    console.log('  destino : res.redirect(/redirect/back-detalhe-temp/${idProduto}')
    console.log('')
    console.log(' ____________________________________________________________')
    console.log('')
    let nucleo=req.body;
    //console.log(req.body)
    console.log('nucleo : ',nucleo);
    console.log('')
    let idProduto=nucleo.inputNovaCor_IdProduto;
    console.log('idProduto : ',idProduto);
    console.log('')
    let codigo=nucleo.inputNovaCor_CodigoProduto;
    console.log('')
    console.log('código do produto ',codigo)
    let corBack=nucleo.inputNovaCorBack;
    console.log('corback : ',corBack);
    let corInput=nucleo.inputNovaCorInput;
    console.log(' cor Input',corInput)
    await RoupaStok.findOne({_id:idProduto,
                             'produto.detalhes.corback':corBack
                             },
                             {'produto.detalhes':1}
                   )
                   .then((resp)=>{
                        console.log('vr de resp : ',resp)
                        let x=resp;
                        if(x==null){
                            console.log(12)
                            //alert('linha 2093')// return  
                            RoupaStok.updateMany(
                                              {_id:idProduto},
                                              { $addToSet:{'produto.detalhes':
                                                  [
                                                      {
                                                          urlfront:"anotar",
                                                          urlleft:"anotar",
                                                          urlback:"anotar",
                                                          urlright:"anotar",
                                                          corback:corBack,  
                                                          corinput:corInput,  
                                                          tamanho:0,
                                                          qte:0,
                                                          precocusto:0.00,
                                                          precovista:0.00,
                                                          precoprazo:0.00,
                                                          posicao:0, 
                                                      }
                                                  ]
                                                }                
                                              } ,
                                            {upsert:true}
                                      )   
                                      .then((result)=>{
                                          console.log('result cria-novacor :',result)
                                          console.log('idProduto dentro de front',idProduto)
                                          console.log('')
                                          console.log('redireciona para 869 /back-de?talhe-temp')
                                          res.redirect(`/redirect/back-detalhe-temp/${idProduto}`)
                                      })
                                      .catch((er)=>{
                                          console.log(er)
                                      })
                            }else{
                                console.log('já cadastrada',0)
                            }
                   })
                   .catch((e)=>{
                     console.log(e)
                   })
})

router.post('/pega-as-cores/:id',async(req,res)=>{
    console.log('');
    console.log(' [ 2473 ]');
    console.log(' origem views :views/_cooperado/lojista/roupa/roupa_listar-temporario.handlebars');
    console.log(' origem route : routes/_lojista/lojista/buscar_produto_temp/:id');
    console.log(' Obs : busca os produtos relativos ao fornecedor selecionado ao');
    console.log('       lojista  ')
    console.log('');
    console.log(' destino : views/_cooperado/lojista/lista-temporario');
    console.log('');
    console.log("___________________________________");
    console.log("");
    console.log('bingo !!!',req.params)
    let idproduto=req.params.id;

    RoupaCor.find({idproduto:idproduto})
            .then((extensao)=>{
                 console.log('_____________________');
                 [extensao]=extensao;
                 console.log('1000 => ',extensao);
                 console.log('_____________________');
                 res.send(extensao)
            })
            .catch((err)=>{
               console.log(err)
            })
})

router.post('/buscarimage_page/:id',async(req,res)=>{
   console.log('');
   console.log(' ____________________________________________________');
   console.log('');
   console.log(' [ 2503 ]  ');
   console.log(' origem views : ');
   console.log(' origem route : ');
   console.log(' obs : busca imagem para publicação do produto');
   console.log('');
   console.log(' destino : ');
   console.log(' _________________________________________________');
   console.log('');
   let nucleo=req.params;
   //console.log(nucleo);
   console.log(nucleo);
   return
   //........................................................................................ 
   await RoupaStok.distinct("produto.detalhes",{'produto.detalhes._id':{"$eq":`${nucleo}`}})
                 .then((result)=>{
                     let F=[]
                     let l=result.length;
                     console.log('vr de length',l)
                     for (i=0;i<l;i++){
                         let r=result[i]._id
                         r=r.toString();
                        // console.log('console R',r)
                         console.log('');
                         ps={};
                         pg={};
                         uf={};
                         ub={};
                         ur={};
                       // console.log('EXTRA',nucleo,'<-->',r)
                         if(r===nucleo){
                            console.log('-----')
                            //console.log('bravo!',r)
                            //console.log(result[i])
                            F=[
                              ps={
                                pos:result[i].pos,
                              },
                              pg={   
                                page:result[i].page,
                              },   
                              uf={
                                urlfront:result[i].urlfront,
                              },
                              ul={
                                urlleft:result[i].urlleft,
                              },
                              ub={                               
                                urlback:result[i].urlback,
                              },
                              ur={
                                urlright:result[i].urlright,
                              }
                            ]
                         }
                     }
                     res.send(F)
                  })
                  .catch((err)=>{
                     console.log(err)
                  }) 

})

router.get('/buscaHome-lojista/:id',async(req,res)=>{
     let n=req.params;
     console.log('')
     console.log(' [ 2569] ');
     console.log('buscaHome ----')
     n=n.id;
     console.log('valor de buscaHome',n)
})

router.post('/editaGaveta/:id',async(req,res)=>{
  console.log('');
  console.log('_______________________________________________')
  console.log('');
  console.log('  [2579]');
  console.log('  origem views : views/_cooperado/lojista/edita-produto.handlebars/pegaDetalhe/:id.')
  console.log('  origem route : route/_lojista/lojista.js/pegaDetalhe/:id.')
  console.log('  obs : pega os variados tamanho e cores do produto')
  console.log('  destino : volta para edita-produto/pegaDetalhe/response')
  console.log('');
  console.log('_______________________________________________')
  console.log('');
  let idDetalhe=req.params.id;
  // ................................................................
  RoupaStok.distinct("produto.detalhes",{"produto.detalhes._id":idDetalhe})
           .then((result)=>{
               //.......................
               let c=result.length;
               console.log(' length de result : ',c)
               for (let i=0;i<c;i++){
                  let n=result[i];
                  let num=n._id
                  if(num==idDetalhe){
                    console.log(' O registro igual : ');
                    console.log(' ',n)
                    console.log('');
                    console.log('retornando response : ')
                    res.send(n)
                  }
               }
           })
           .catch((err)=>{
              console.log(err)
           })
})

router.post('/addGaveta/:id',async(req,res)=>{
  console.log('');
  console.log('_______________________________________________')
  console.log('');
  console.log('  [ 2615 ]');
  console.log('  origem views : views/_cooperado/lojista/edita-produto.handlebars/addGaveta/:id.')
  console.log('  origem route : route/_lojista/lojista.js/addgaveta/:id.')
  console.log('  obs : pega os variados tamanho e cores do produto')
  console.log('  destino : volta para edita-produto/addGaveta/response')
  console.log('');
  console.log('_______________________________________________')
  console.log('');
  let idDetalhe=req.params.id;
  // ................................................................
  RoupaStok.distinct("produto.detalhes",{"produto.detalhes._id":idDetalhe})
           .then((result)=>{
               //.......................
               let c=result.length;
               console.log(' length de result : ',c)
               for (let i=0;i<c;i++){
                  let n=result[i];
                  let num=n._id
                  if(num==idDetalhe){
                    console.log('');
                    console.log(' O registro igual : ');
                    console.log(' ',num)
                    console.log('');
                    console.log('retornando response para addGaveta: ')
                    res.send(n)
                  }
               }
           })
           .catch((err)=>{
              console.log(err)
           })
})

router.post('/cadastroproduto',(req,res)=>{
  // Essa rotina vem do cooperados/produto/menu/cadastrar-produto
  console.log("");
  console.log(' [ 2651 ]')
  console.log('-------------------------------------------') 
  console.log(' --> get/_admin/mn_fornecedores/fornec')
  console.log('vem de views/admin/admincooperado/produto/manu/cad-fornec')
  console.log('vem de admin/central/menu-cadastro-fornecedores')
  console.log('-------------------------------------------') 
  console.log("")
  res.render("_cooperado/lojista/cad-produto",{ layout:'lojista/admin-loja.handlebars'})
})

router.post('/gravaimportacao-stok',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 195 ]');
  console.log(' origem views : views/_cooperado/lojista/importando-list.handlebars  ?????');
  console.log(' origem route : routes/_lojista/roupa.js/gravaimportacao-stok')
  console.log(' obs : ');
  console.log('');
  console.log(' destino : views listar temporário');
  console.log('');
  console.log(' ___________________________________');
  console.log('');
  console.log("--------------------------------------------------")
  console.log('Rotina grava a importação do arquivo/estoque :')
  console.log("")
  let arquivo=req.body;
  let lojaId=arquivo.idloja;
  let lojaRazao=arquivo.rzloja;
  let lojaCnpj=arquivo.cnpjloja;
  let fornecCnpj=arquivo.cnpjfornec;
  let IdFornec=arquivo.nameid_fornec;
  console.log('string',typeof(IdFornec));
  let P=(IdFornec);
  /////////////////////////////////////////
  console.log('result => ',P);
  console.log(typeof(P));
  console.log('--------------------------------');
  console.log(IdFornec);
  let G=IdFornec.toString(2);
  console.log('g',G);
  console.log(typeof(G));
  ////////////////////////////////////////////////////
  console.log('');
  console.log(lojaId);
  console.log(lojaRazao);
  console.log('razão :',lojaRazao);
  console.log(lojaCnpj);
  console.log('fornecCnpj :',fornecCnpj);
  console.log('_____________________________________________________');
  let arquivoImport=arquivo.myfile;
  ///////////////////////////////////////////////////////////////////  
  console.log(lojaId,'--',lojaRazao,'--',lojaCnpj,'--',arquivoImport);
  console.log('');
  //await RoupaStok.deleteMany({})
  //        .then((r)=>{
  //           console.log('dentro de DeleteMany',123)
  //        })
  //        .catch((err)=>{
  //            console.log('alô!',err)
  //        })
  //..........................................
   
   var fs=require('fs');
   console.log('');
   console.log('_________________________________________');
   console.log('1',path.basename(arquivoImport));
   console.log('2',path.dirname(arquivoImport));
   console.log('3',path.extname(arquivoImport));
   const folderName='C:/Users/Jorge Lessa/Documents/__Lojista/' + path.basename(arquivoImport);
   //const folderName='/Users/Rotaes/Estoquetransfer/Vallas/txt';
   console.log('');
   console.log(folderName);
   console.log(arquivoImport);
   console.log('');
   console.log('__________________________________________');
   //........................................................
   const folderPath=folderName;
   let dir=path.dirname(folderPath)
   fs.readdirSync(dir)
   var copiaArquivo=fs.readFileSync(dir  + '/' + `${arquivoImport}`,'utf-8')
   const copiadoArquivo=copiaArquivo.replace( /,/g, '.');
   console.log('copiando arquivo :',copiaArquivo);
   console.log('');
   //..............................................
   await csv({
            noheader: true,
            headers: ['header1']
   })
  .fromFile(dir  + '/' + `${arquivoImport}`)
  .then(csvData =>{
        console.log('_____________________________________');
        console.log('');
        MostracsvData(csvData,lojaCnpj,fornecCnpj,lojaId,lojaRazao) 
        console.log(1)
  })     
  .catch((e)=>{
    res.send('error')
  })

  //..............................................
  async function  MostracsvData(csvData,lojaCnpj,fornecCnpj,lojaId,lojaRazao) {
          const X=csvData;
          let len1=csvData.length;
          adcionaProd(csvData,len1,lojaCnpj,fornecCnpj,lojaId,lojaRazao)
  }

  async  function adcionaProd(csvData,len1,lojaCnpj,fornecCnpj,lojaId,lojaRazao){
                console.log('comprimento csvData => :',len1)
                let palavra;
                let n;
                let codigoProd;
                let descritivo;
                let detalhe='anotações';
                let tecido;
                let artigo='anotar';
                let titulo='anotar';
                titulo=titulo.trim();
                let zero=0;
                zero=parseInt(zero);
                let corback='#cccccc';
                let corinput;
                let tamanho;
                let qtd;
                let precocusto=0.00;
                let precovista=0.00;
                let precoprazo=0.00;
                let pos=0;
                let page='default';
                for (h=1;h<(len1-1);h++){
                      let linha=csvData[h];
                      let [w]=Object.values(linha)
                      let l=w.length;
                      console.log('linha => ',linha)
                      //............................................................
                      // acha a pontoVirgula para pegar o código do produto
                      n=w.search(";")
                      codigoProd=w.substr(0,n);
                      codigoProd=codigoProd.trim();
                      //////////////////////////////////////////////////////////////
                      // Pega a palavra restante 
                      l=w.length;
                      palavra=w.slice((n+1),l);
                      palavra=palavra.trim()
                      //////////////////////////////////////////////////////////////
                      // acha a pontoVirgula para pegar descritivo
                      n=palavra.search(";")
                      descritivo=palavra.slice(0,n)
                      descritivo=descritivo.trim();
                      ////////////////////////////////////////////////////////////////
                      // Pega a palavra restante
                      l=palavra.length;
                      palavra=palavra.slice((n+1),l);
                      palavra=palavra.trim()
                      ////////////////////////////////////////////
                      // acha o pontoVirgula para pegar detalhe
                      n=palavra.search(";")
                      detalhe=palavra.slice(0,n)
                      detalhe=detalhe.trim();
                      //...............................................................
                      // Pega a palavra restante
                      l=palavra.length;
                      palavra=palavra.slice((n+1),l)
                      palavra=palavra.trim()
                      /////////////////////////////////////////////////////////////////
                      // acha o pontoVirgula para pegar tecido
                      n=palavra.search(";")
                      tecido=palavra.slice(0,n)
                      tecido=tecido.trim()
                      ///////////////////////////////////////////////////////////////
                      // Pega a palavra restante
                      l=palavra.length;
                      palavra=palavra.slice((n+1),l)
                      palavra=palavra.trim()
                      ////////////////////////////////////////////////////////////
                      // acha o pontoVirgula para pegar a cor
                      n=palavra.search(";")
                      corinput=palavra.slice(0,n);
                      corinput=corinput.trim();
                      ////////////////////////////////////////////////////////////////
                      // Pega a palavra restante
                      l=palavra.length;
                      palavra=palavra.slice((n+1),l);
                      palavra=palavra.trim();
                      //////////////////////////////////////////////////////////
                      // acha o pontoVirgula para pegar a tamanho
                      n=palavra.search(";")
                      tamanho=palavra.slice(0,n);
                      tamanho=tamanho.trim()
                      ////////////////////////////////////////////////////////////////
                      // Pega a palavra restante
                      l=palavra.length;
                      palavra=palavra.slice((n+1),l);
                      palavra=palavra.trim()
                      /////////////////////////////////////////
                      // acha o pontoVirgula para pegar a quantidade
                      n=palavra.search(";")
                      qtd=palavra.slice(0,n);
                      qtd=qtd.trim()
                      qtd=parseInt(qtd);
                      ///////////////////////////////////////////////
                      // Pega a palavra restante
                      l=palavra.length;
                      palavra=palavra.slice((n+1),l);
                      palavra=palavra.trim();
                      ////////////////////////////////////////////////////
                      // acha o pontoVirgula para pegar a preço
                      n=palavra.search(";")
                      preco=palavra.slice((n+1),l);
                      preco=parseFloat(preco);
                      //...................................................  
                      await RoupaStok.insertMany({
                                    fornec_id:IdFornec,
                                    razaofornec:'vazio',
                                    marcaloja:`${lojaCnpj}`,
                                    loja_id:`${lojaId}`,
                                    razao:`${lojaRazao}`,
                                    codigo:`${codigoProd}`,
                                    descricao:`${descritivo}`,
                                    complete:`${detalhe}`,
                                    tecido:`${tecido}`,
                                    artigo:`${artigo}`,
                                    posicao:0,
                                    page:"default",
                                    pageurl:"https://",
                                    ponto:0,
                                    titulo:[
                                            `${titulo}`
                                           ],
                                     
                                    cores:[
                                            {
                                              obj:0,
                                              fase:0
                                            },
                                          ]
                                })
                                .then((temp)=>{
                                   //.........................................................    
                                   if(h===(len1-2)){
                                    RoupaStok.find({cnpjfornec:`${fornecCnpj}`,cnpjloja:`${lojaCnpj}`})
                                             .then((produto)=>{
                                               //...........................
                                               console.log('----------------[ 396 ] - lista-temporario----------------------------')
                                               res.render("_cooperado/lojista/roupas/roupa_listar-temporario",{ layout:'lojista/roupaLista.handlebars',produto:produto});
                                             })
                                             .catch((err)=>{
                                               console.log(err)
                                             }) 
                                    }   
                                })
                                .catch((err)=>{
                                    console.log(err,'ESTÁ ERRADA! 726',h, err)
                                })
                }
  }
})
module.exports = router;