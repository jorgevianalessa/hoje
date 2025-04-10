const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config({path:'./.env'});
const { eAdmin } = require("../../../../helpers/eAdmin");

const { upload } = require('../../../libs/multer');
const { upload1 } = require('../../../libs/multer');
const { uploadFile,getFiles } = require('../../../controllers/sample.controllers');
const { uploadFoto } = require('../../../controllers/editafoto.controllers');

require('../../../models/raq_notaSaida');
const RaqNotaSaida = mongoose.model('raq_notaSaida');

require('../../../models/raq_fluxo');
const RaqFluxo = mongoose.model('raq_fluxo');

require('../../../models/raq_boleta');
const RaqContabil = mongoose.model('raq_boleta');

require('../../../models/raq_plano_titulos');
const Plano_titulo = mongoose.model('raq_plano_titulo');

require('../../../models/raq_plano_subtitulos');
const Plano_subtitulo = mongoose.model('raq_plano_subtitulo');

require('../../../models/raq_plano_conta');
const Plano_conta = mongoose.model('raq_plano_contas');

require('../../../models/raq_params');
const Plano_params = mongoose.model('plano_params');

require('../../../models/raq_clientes');
const RaqClient = mongoose.model('raq_client');

require('../../../models/lojista');
const Lojista = mongoose.model('lojista');

require('../../../models/segmentos_');
const Segmentos = mongoose.model('segmentos');

const path =require('path');
const { send, redirect } = require('express/lib/response');
const { ObjectId, Timestamp } = require('mongodb');
const { time } = require('console');

router.post('/buscrazoes',async(req,res)=>{
    // Apenas passagem do menu para page de planoCtas
    console.log('==========================');
    console.log('');
    console.log('passsando por razoes');
    console.log('');
    console.log('==========================');
    console.log(' "origem views : views/_cooperado/sample/raqsystem/contabil/handlebars"' );
    console.log(' origem route : route/_sample/raq/raq-contabil/razoes');
    console.log(' Obs : Apenas passagem do menu para page de planoCtas');
    console.log('');
    console.log('  destino : res.render(|_cooperado/sample/raqsystem/contabil/razoes.handlebars|{layout:|lojista/templete3.handlebars|,codigo:n}');
    console.log('');
    let palavra=req.body;
    console.log(' [ 50 ]   ',palavra)
    let n=req.body.id_cooperado;
    palavra=palavra.passaRazao;
    console.log('');
    console.log(' palavra ',palavra)
    console.log('_____________________________________________')
    console.log('código do lojista',n);
    //return
    if(palavra=='plano contas'){
       res.render("_cooperado/sample/raqsystem/contabil/planoctas",{layout:'lojista/templete3.handlebars',id_cooperado:n})
    }else if(palavra=='fluxo'){
       res.render("_cooperado/sample/raqsystem/contabil/fluxo",{layout:'lojista/templete3.handlebars',razao:palavra,id_cooperado:n}) 
    }else if(palavra=='bancos'){
        res.render("_cooperado/sample/raqsystem/contabil/bancos",{layout:'lojista/templete3.handlebars',razao:palavra,id_cooperado:n}) 
    }else if(palavra=='orçamento'){
       res.render("_cooperado/sample/raqsystem/contabil/orcamento",{layout:'lojista/templete3.handlebars',razao:palavra,id_cooperado:n}) 
    }else if(palavra=='home'){
       res.render("_cooperado/admin/raq-system",{layout:'lojista/templete3.handlebars',razao:palavra,id_cooperado:n}) 
    }else if(palavra=='parametros'){
        console.log('_________________________________________________');
        console.log('');
        console.log('aqui ===> ',n)
        console.log('_________________________________________________');
        res.render("_cooperado/sample/raqsystem/contabil/parametros",{layout:'lojista/templete3.handlebars',razao:palavra,id_cooperado:n}) 
    }else{
        console.log(100000)
       res.render("_cooperado/sample/raqsystem/contabil/planoctas_menu",{layout:'lojista/templete3.handlebars',razao:palavra,id_cooperado:n}) 
    }
})

router.post("/voltaHome",async(req,res)=>{
    console.log(' [ 77 ] ');
    console.log('');
    console.log(' origem views : views/_cooperado/sample/raqsystem/vendas/menu-compra_venda.handlebars');
    console.log(' origem route : route/_sample/raq/raqvendas/voltaHome/:id');
    console.log(' Obs : ');
    console.log('');
    console.log(' destino : retorna para lista pedido');
    console.log('');
    let r=req.body.codigoCliente;
    console.log(r)
    //,segmento:Seg
    Lojista.findOne({_id:r})
           .then((resp)=>{
             console.log(resp);
             let Seg=resp.segmento;
             res.render("_cooperado/admin/raq-system",{ layout:'lojista/admin-loja.handlebars',cooperado:resp,segmento:Seg}) 
           })
           .catch((er)=>{
             console.log(er)
           })
})

router.post('/razao_conta',async(req,res)=>{
    console.log(' [ 106 ]   ')
    console.log('');
    console.log('_____________________________________________')
    console.log(' "origem views : views/_cooperado/sample/raqsystem/contabil/"' + '' + "  .handlebars" );
    console.log(' origem route : route/_sample/raq/raq-contabil/razão_conta');
    console.log(' Obs : Apenas passagem do menu para page de planoCtas');
    console.log('');
    console.log('  destino : res.render(|_cooperado/sample/raqsystem/contabil/razoes.handlebars|{layout:|lojista/templete3.handlebars|,codigo:n}');
    console.log('');
    let palavra=req.body;
    console.log(palavra)
    console.log(palavra.codigoLojista)
    let numeroConta=req.body.NumConta;
    let nomeRazao=req.body.passaRazao;
    let codigoLojista=req.body.codigoLojista
    //console.log(n)
    res.render("_cooperado/sample/raqsystem/contabil/razoes",{layout:'lojista/templete3.handlebars',numConta:numeroConta,razao:nomeRazao,codigoLojista:codigoLojista}) 
})

router.post("/busca_vetor/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 135 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/planoctas.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/busca_vetor/:id');
    console.log(' Obs : cadastro do plano de contas');
    console.log('');
    console.log(' destino : views/_cooperado/sample/raqsystem/contabil/planoctas.handlebars');
    console.log('');
    let palavra=req.params.id;
    let n=0;
    console.log('___________________________');
    console.log(palavra)
    let j;
    if(palavra=='ativo'){
       j='1' 
       buscconta(j); 
    }else if(palavra=='passivo'){
        j='2'
        buscconta(j);  
    }else if(palavra=='despesas'){
        j='3'  
        buscconta(j); 
    }else if(palavra=='receitas'){
        j='4' 
        buscconta(j); 
    }else if(palavra=='orcamento'){
        res.render("_cooperado/sample/raqsystem/contabil/orcamento",{layout:'lojista/templete3.handlebars',codigo:n})
    }  

    function  buscconta(j){
        console.log('_____________________');
        console.log('vetor =>> ',j)
        j=parseInt(j);
        console.log('_____________________');
        Plano_titulo.find({'numero_vetor':j})
                .sort({'titulo.titulo_numero':1})
                .then((result)=>{
                    console.log('');
                    console.log('____________________________________')
                    console.log(result);
                    console.log('');
                    console.log('____________________________________')
                    console.log(result.length)
                    res.send(result)
                })
                .catch((err)=>{

                })
    }        
})

router.get("/grava_cta_titulo/:id",async(req,res)=>{
    // Cadastra a contas no plano de conta.
    console.log('');
    console.log(' [ 178 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/planoctas.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/grava_cta_titulo/:id');
    console.log(' Obs : cadastro do plano de contas');
    console.log('');
    console.log(' destino : volta para o mesmo plano de conta');
    console.log('');
    let palavra=req.params.id;
    console.log(' [ palavra ]   ',palavra)
    let l=palavra.length;
    let idLoja=palavra.substring(0,24);
    console.log(' codigo lojista :',idLoja);
    console.log('__________________________________')
    let pos=palavra.search(":::");
    let nomecta=palavra.substring(24,pos);
    console.log(' [titulo_nome]',nomecta);
    let cta=palavra.substring((pos+3),60);
    console.log(' [ titulo_numero ]   ',cta);
    
    let dt=new Date().getTime();
    console.log('------------------------------------------------')
    console.log('data em milisegundo :',dt);
    let v=cta.substring(0,1);
    if(v==1){
      n1='Ativo'  
    }else if(v==2){
        n1='Passivo'    
    }else if(v==3){
        n1='Despesas'    
    }else if(v==4){
        n1='Receitas'    
    }

    console.log('_____________________________________');
    new Plano_titulo(
                {
                    numberChave:100,
                    data:dt,
                    idloja:idLoja,
                    operador:'default',
                    numero_vetor:v,
                    nome_vetor:n1,
                    titulo:[{
                                titulo_numero:cta,
                                titulo_nome:nomecta
                            }
                           ]
                }
            )
            .save()
            .then((resul)=>{
                console.log(resul);
                console.log('');
                console.log('____________________________________');
                v=parseInt(v);
                console.log('vr de v',v);

                ////////////////////////////////////////////////////////////////////////////
                Plano_titulo.find({'numero_vetor':v})
                            .then((result)=>{
                                console.log('result :',result);
                                console.log('____________________________________')
                               //return
                                res.send(result);
                            })
                            .catch((er)=>{
                                console.log(er)  
                            }) 
                ///////////////////////////////////////////////////////////////////////////
            })
            .catch((er)=>{
                console.log(er);
            })
})

// Verificar
router.get("/edit_cta_titulo/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 190 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/planoctas.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/edit_cta_titulo/:id');
    console.log(' Obs : edita titulo do plano de contas');
    console.log('');
    console.log(' destino : ????');
    console.log('');
    let passe=req.params.id;
    let l=passe.length;
    let pos=passe.search(':::')
    let numero=passe.substring(0,pos);
    let nome=passe.substring((pos+3),l)
    console.log(' [ palavra ]   ',passe)
    console.log('numero',numero);
    console.log('nome',nome);
    console.log('');
    // FAZER A CONSULTA ANTES PARA EDIÇÂO DA CONTA
    RaqPlano.find({})
            .then((resp)=>{
              editConta(numero,nome)
            })
            .catch((e)=>{
              console.log(e)  
            })

    function editConta(numero,nome){        
            const query = {'titulo.titulo_numero':numero};
            const insert = { $set:{
                                   'titulo.titulo_numero':numero,
                                   'titulo.titulo_nome':nome,
                                  }
                            }
            const options = { upsert: true };
            RaqPlano.updateOne(query,insert,options)
                    .then((result)=>{
                        console.log(result);
                        if (result.modifiedCount==1){
                            let m='bingo!'
                            ////////////////////////////////////////////////////////////////////////////
                           RaqPlano.find({
                                            'titulo.titulo_numero':{$nin:["default"]},
                                            'titulo.titulo_nome':{$eq:"default"},
                                         })
                                        .then((result)=>{
                                            console.log(result)
                                            res.send(result);
                                        })
                                        .catch((er)=>{
                                            console.log(er)  
                                        }) 
                            ///////////////////////////////////////////////////////////////////////////
                        }else{
                            res.send();
                        }  
                    })
                    .catch((er)=>{
                        console.log(er)
                    })
    }                
})

router.get("/delete_cta_titulo/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 258 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/planoctas.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/delete_cta_titulo/:id');
    console.log(' Obs : edita titulo do plano de contas');
    console.log('');
    console.log(' destino : ????');
    console.log('');
    let passe=req.params.id;
    let l=passe.length;
    let pos=passe.search(':::')
    let numero=passe.substring(0,pos);
    let nome=passe.substring((pos+3),l)
    console.log(' [ palavra ]   ',passe)
    console.log('numero',numero);
    console.log('nome',nome);
    console.log('');
    const query = {'conta.numeroCta':numero,'conta.nomeCta':nome};
    RaqPlano.deleteOne(query)
            .then((result)=>{
                 console.log(result);
                 if (result.deletedCount==1){
                    let m='bingo!'
                    res.send(result);
                 }else{
                    res.send();
                 }  
            })
            .catch((er)=>{
                console.log(er)
            })
})

router.get("/buscaCtaTituloInicial",async(req,res)=>{
    // Busca a conta do ativo para starte do plano de conta.
    console.log('');
    console.log(' [ 357 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/planoctas.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/buscaCtaTituloInicial');
    console.log(' Obs : cadastro do plano de contas');
    console.log('');
    console.log(' destino : ????');
    console.log('');
    RaqPlano.find({
                   'titulo.titulo.numero':{$nin:["default"]},
                   'titulo.titulo.nome':{$eq:"default"},
                  },{conta:1})
            .then((result)=>{
               console.log(result);
               console.log('_______________________________________');
               let c=result.length;
               console.log(' c ',c)
               res.send(result);
            })
            .catch((er)=>{
              console.log(er)  
            })
})

router.get("/gravaSubCta/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 383 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/planoctas.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/gravaSubCta/:id');
    console.log(' Obs : cadastro do plano de contas');
    console.log('');
    console.log(' destino : planoctas');
    console.log('');
    
    let palavra=req.params.id;
    console.log(palavra);
    let idLoja=palavra.substring(0,24);
    console.log('id Lohja',idLoja);
     console.log('__________________________________')
    let l=palavra.length;
    let pos=palavra.search(":=:=:");
    console.log('posição ',pos)
    let subNumero=palavra.substring(29,35)
    console.log('sub_numero => ',subNumero);
    
    pos=palavra.search(":::");
    let sub_nome=palavra.substring((pos+3),l)
    console.log('______________________________')
   
    console.log('sub_nome => ',sub_nome);
    let vetor=subNumero.substring(0,1);
    console.log(' vetor',vetor)
    vetor=parseInt(vetor);
    let numero_titulo=subNumero.substring(0,3);

    let n1; 
    if(vetor==1){
       n1='ativo'
    }else if (vetor==2){
      n1="passivo"  
    }else if (vetor==3){
      n1="despesas"  
    }else if (vetor==4){
      n1="receitas"  
    }

    let dte=new Date().getTime();
    new Plano_subtitulo(
                {
                    numberChave:0,
                    data:dte,
                    idloja:idLoja,
                    operador:'default',
                    numero_vetor:vetor,
                    nome_vetor:n1,
                    numero_titulo:numero_titulo,
                    subtitulo:
                        {
                            subtitulo_numero:subNumero,
                            subtitulo_nome:sub_nome,
                        }
                }
                )
                .save()
                .then((resul)=>{
                    console.log('');
                    console.log(' [438] ',resul);
                    console.log('_______________________________');
                    ////////////////////////////////////////////////////////////////////////////
                   // console.log(contaTitulo);
                    console.log('--------------------------');
                    Plano_subtitulo.find({'numero_titulo':numero_titulo})
                            .sort({'subtitulo.subtitulo_numero':1})
                            .then((result)=>{
                                console.log(' result  [446] ',result)
                                res.send(result);
                            })
                            .catch((er)=>{
                                console.log(er)  
                            }) 
                    ///////////////////////////////////////////////////////////////////////////
                })
                .catch((er)=>{
                        console.log(er);
                })
})

router.get("/buscaSubContaTitulo/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 462 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/planoctas.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/buscaSubContaTitulo/:id');
    console.log(' Obs : cadastro do plano de contas');
    console.log('');
    console.log(' destino : volta para planoctas.handlebars');
    console.log('');
    console.log(req.params)
    let number=req.params.id;
    console.log(number)
    let v=number.substring(0,1);
    v=parseInt(v);
    console.log('vr de v',v)
    Plano_subtitulo.find({
                  'numero_titulo':number,
                  })
            .then((result)=>{
                console.log('[ 469 ]',result);
                console.log('_____________________________________________')
                console.log(result.length);
                res.send(result);
            })
            .catch((er)=>{
              console.log(er)  
            })
})

router.get("/editaSub_Titulo/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 420 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/planoctas.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/editaSub_Titulo/:id');
    console.log(' Obs : cadastro do plano de contas');
    console.log('');
    console.log(' destino : volta para plano de Contas');
    console.log('');
    let palavra=req.params.id;
    let l=palavra.length;
    //___________________________________________________
    let sub_vetor;
    let sub_numero;
    let sub_nome;
    sub_vetor=palavra.substring(0,3);
    sub_numero=palavra.substring(0,6);
    sub_nome=palavra.substring(9,l);
    /////////////////////////////////////////////////////////////////////////
    const query = {'sub_titulo.sub_numero':sub_numero};
    const insert = { $set:{
                       'sub_titulo.sub_nome':sub_nome,
                         }
                    }
    const options = { upsert: true };
    Plano_subtitulo.updateOne(query,insert,options)
            .then((resp)=>{
                console.log(' [ 470 ]',resp);
                if(resp.modifiedCount==1){
                   console.log('OK') 
                   Plano_subtitulo.find({'numero_titulo':sub_numero})
                            .then((result)=>{
                                console.log(result)
                                res.send(result)
                            })   
                            .catch((er)=>{
                               console.log(er) 
                            })
                }else{
                  console.log('No')  
                }
                
            })
            .catch((er)=>{
               console.log(er) ;
            })
   
   
})

router.get('/busca_conta/:id',async(req,res)=>{
    console.log('');
    console.log(' [ 490 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/planoctas.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/busca_conta/:id');
    console.log(' Obs : cadastro do plano de contas');
    console.log('');
    console.log(' destino : volta planoctas');
    console.log('');
    console.log(req.params)
    let cta=req.params.id;
    console.log(cta);
    console.log('__________________________________');
    console.log('__________________________________');
    Plano_conta.find({numero_subtitulo:cta})
            .sort({'contas.conta_numero':1}) 
            .then((result)=>{
               console.log(result); 
               res.send(result);
            })
            .catch((er)=>{
              console.log(er)  
            })
})

router.post("/grava_Cta/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 571 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/planoctas.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/grava_Cta/:id');
    console.log(' Obs : cadastro do plano de contas');
    console.log('');
    console.log(' destino : ????');
    console.log('');
    console.log(req.params)
    let palavra=req.params.id;
    let l=palavra.length;
    let idloja=palavra.substring(0,24);
    console.log('idLoja :',idloja)
    console.log('___________________________________')
    let pos=palavra.search("::");
    console.log('pos',pos)
    let restante=palavra.substring((pos+2),l);
    console.log('restante :',restante)

    let numero_titulo=restante.substring(0,3);
    console.log(numero_titulo);

    let numero_subtitulo=restante.substring(0,6);
    console.log(numero_subtitulo)
    let cta_numero=restante.substring(0,9);
    console.log('cta numero => ',cta_numero);
    console.log('');
    console.log('___________________________________');

    console.log('___________________________________');
    l=restante.length;
    pos=restante.search(":::");
    let cta_nome=restante.substring((pos+3),l)
    console.log(' cta_nome => ',cta_nome)
    
    console.log('___________________________________')
    let vetor=cta_numero.substring(0,1);
    //let numerotitulo=cta_numero.substring(0,6);
    console.log(vetor);

    let nome_vetor;
    if (vetor==1){
       nome_vetor="ativo"
    }else if(vetor==2){
        nome_vetor="passivo" 
    }else if(vetor==3){
        nome_vetor="despesas" 
    }else if(vetor==4){
        nome_vetor="receitas" 
    }

    let dte=new Date().getTime();
    ////////////////////////////////////////////////////////////
    //   Verificar conta repetida
    ////////////////////////////////////////////////////////////
      new Plano_conta(
            {
                numberChave:0,
                data:dte,
                idloja:idloja,
                operador:'default',
                numero_vetor:vetor,
                nome_vetor:nome_vetor,
                numero_titulo:numero_titulo,
                numero_subtitulo:numero_subtitulo,
                contas:
                    {
                      conta_numero:cta_numero,
                      conta_nome:cta_nome,
                    }
            }
            ).save()
            .then((resul)=>{
                console.log('________________________________________');
                console.log(' [ 588 ',resul);
                console.log('');
                console.log('________________________________________');
                ////////////////////////////////////////////////////////////////////////////
                Plano_conta.find({
                             numero_subtitulo:numero_subtitulo,
                            })
                            .sort({'contas.conta_numero':1})
                            .then((result)=>{
                                console.log(' [ 597 ]',result)
                                res.send(result);
                            })
                            .catch((er)=>{
                                console.log(er)  
                            }) 
                ///////////////////////////////////////////////////////////////////////////
            })
            .catch((er)=>{
               console.log(er);
            })
    //}    
})

router.post("/busca_Razaoconta/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 597 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/planoctas.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/busca_Razaoconta');
    console.log(' Obs : cadastro do plano de contas');
    console.log('');
    console.log(' destino : ????');
    console.log('');
    console.log(req.body);
    let n=1000;
    res.render("_cooperado/sample/raqsystem/contabil/razoes",{layout:'lojista/templete3.handlebars',codigo:n})
})

router.get("/titulo_params/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 612 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/parametros.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/vetores_params/:id');
    console.log(' Obs : cadastro do plano de contas');
    console.log('');
    console.log(' destino : volta para parametros');
    console.log('');
    let palavra=req.params.id;
    let vetor;
    console.log(palavra);
    if(palavra==='ativo'){
       vetor=1;
       buscSub(vetor);
    }else if(palavra==='passivo'){
        vetor=2;
        buscSub(vetor);
     }else if(palavra==='despesas'){
        vetor=3;
        buscSub(vetor);
     }else if(palavra==='receitas'){
        vetor=4;
        buscSub(vetor);
     }

     function buscSub(n){
        Plano_titulo.find({'numero_vetor':n},{'titulo':1,_id:0})
                .sort({'titulo.titulo_numero':1})
                .then((resp)=>{
                   console.log(resp);
                   res.send(resp); 
                })
                .catch((er)=>{
                   console.log(er) 
                })
     }
})

router.get("/sub_params/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 739 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/parametros.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/vetores_params/:id');
    console.log(' Obs : cadastro do plano de contas');
    console.log('');
    console.log(' destino : volta para parametros');
    console.log('');
    let palavra=req.params.id;
    let cta=palavra.substring(0,3)
    buscSub(cta);

    function buscSub(cta){
        console.log('[ 752 ]',cta)
        Plano_subtitulo.find({'numero_titulo':cta},{'subtitulo':1,_id:0})
                .sort({'subtitulo_numero':1})
                .then((resp)=>{
                   console.log(resp);
                   res.send(resp); 
                })
                .catch((er)=>{
                   console.log(er) 
                })
    }
})

router.get("/cta_params/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 680 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/parametros.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/cta_params/:id');
    console.log(' Obs : cadastro do plano de contas');
    console.log('');
    console.log(' destino : volta para parametros');
    console.log('');
    let palavra=req.params.id;
    let cta=palavra.substring(0,6)
    console.log(' 690 => ',cta)
    buscCta(cta);


    function buscCta(cta){
        console.log(cta)
        Plano_conta.find({numero_subtitulo:cta},{contas:1,_id:0})
                .sort({'conta.conta_numero':1})
                .then((resp)=>{
                   console.log(resp);
                   res.send(resp); 
                })
                .catch((er)=>{
                   console.log(er) 
                })
    }
})

router.post("/grava_params/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 798 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/parametros.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/grava_params/:id');
    console.log(' Obs : cadastro do plano de contas');
    console.log('');
    console.log(' destino : volta para parametros');
    console.log('');
    let palavra=req.params.id;  
    console.log(palavra);
    let l=palavra.length;
    console.log('_______________________________');
    
    let numero_conta=palavra.substring(0,9);
    console.log(numero_conta)

    let pos=palavra.search("-");
    let pos1=palavra.search(":::");
    console.log("");
    console.log( pos , '----', pos1)
    console.log('_______________________________');
    let nome_conta=palavra.substring((pos+1),pos1);
    console.log(nome_conta); 
    console.log('_______________________________');
    let parametro=palavra.substring((pos1+3),l)
    console.log(parametro);
    let dt=new Date();
    console.log(dt)
    let dia=dt.getDate();
    let mes=dt.getMonth();
    mes++;
    let ano=dt.getFullYear();
    let data=dia + '/' + mes + "/" + ano;
    console.log(data);
    //-----------------------------------------------------
    
   //______________________________________________________________________
    console.log(palavra)
    console.log("");
    console.log('_______________________________');
    console.log(palavra);
    console.log("");
    let dte=palavra.substring(0,10);
    console.log("");
    dt=dt.getHours();
    new Plano_params(
        {
            numberChave:100,
            data:dt,
            idloja:1,
            operador:'default',
            parametros:{
                params:1,
                params_parametro:parametro,
                params_numeroconta:numero_conta,
                params_nomeconta:nome_conta
            }
        }
    )
    .save()
    .then((result)=>{
       console.log(result);
       Plano_params.find(
        {'parametros.params':1},{'parametros':1,_id:0}
       )
       .sort({'parametros.params_nomeconta':1})
       .then((resposta)=>{
          console.log(resposta)
          res.send(resposta);
       })
       .catch((er)=>{
         console.log(er)
       })
    })
    .catch((er)=>{
       console.log(er);
    })
})

router.get("/pega_params",async(req,res)=>{
    console.log('');
    console.log(' [ 878] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/parametros.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/pega_params/:id');
    console.log(' Obs : cadastro do plano de contas');
    console.log('');
    console.log(' destino : volta para parametros');
    console.log('');
    Plano_params.find({})
       .sort({'parametros.params_nomeconta':1})
       .then((resposta)=>{
          console.log('[889]',resposta)
          res.send(resposta);
       })
       .catch((er)=>{
         console.log(er)
       })
})

router.post("/buscDadosCta/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 824 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/razoes.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/buscDadosCta/:id');
    console.log(' Obs : pega os dados da conta selecionada');
    console.log('');
    console.log(' destino : volta para razoes.handlebars');
    console.log('');
    console.log(req.params);
    let n=req.params.id;
    console.log(n)
    //RaqContabil.find({'boleta.$[].debito.conta':n},{parametros:0})
    //           .sort({data:1})
    //           .then((result)=>{
    //              ////////////////////////
    //              //[result]=result;
    //              console.log(result);
    //              res.send(result)
    //           })
    //           .catch((err)=>{
    //             console.log(err);
    //           })
    RaqContabil.find({ $or:[{'boleta.$[].debito.conta':n},{'boleta.$[].credito.conta':n}]},{parametros:0})
    .sort({data:1})
    .then((result)=>{
        ////////////////////////
        //[result]=result;
        console.log(result);
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get("/busca_fluxo/:id",async(req,res)=>{
    console.log(' [ 886 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/fluxo.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/busca_fluxo/:id');
    console.log(' Obs : pega os dados da conta selecionada');
    console.log('');
    console.log(' destino : volta para razoes.handlebars');
    console.log(' [ 893 ]');
    console.log(req.params.id);
    let f=req.params.id;
    RaqFluxo.find({
                      'fluxo.pagamento':"00/00/0000",
               })
               .sort({'fluxo.vencimento':1})
               .then((resp)=>{
                   console.log('[ 901 ]')
                   console.log(resp);
                   res.send(resp);
               })
               .catch((er)=>{
                 console.log(er)
               })
})

router.get("/busca_Apagra",async(req,res)=>{
    console.log(' [ 910 ] ');
    console.log('');
    console.log( "origem views : views/_cooperado/sample/raqsystem/contabil/fluxo.handlebars");
    console.log(' origem route : route/_sample/raq/raq-contabil/busca_Apagar/:id');
    console.log(' Obs : pega os dados da conta selecionada');
    console.log('');
    console.log(' destino : volta para razoes.handlebars');
    console.log(' [ 917 ]');
    //console.log(req.params.id);
    let f=req.params;
    console.log(f)
    RaqFluxo.find({
                      $and:[
                        {'fluxo.pagamento':"00/00/0000"},{'fluxo.debito >':0}
                      ]
                })
                .then((resp)=>{
                    console.log('[ 926 ]')
                    console.log(resp);
                    res.send(resp);
                })
                .catch((er)=>{
                    console.log(er)
                })
})
module.exports = router;
