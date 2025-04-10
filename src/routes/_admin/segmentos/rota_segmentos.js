const express = require('express')
const router = express.Router()
//const fetch = require("node-fetch");
const flash = require('connect-flash')
const mongoose = require('mongoose')
const { eAdmin } = require("../../../../helpers/eAdmin")
const { ObjectId } = require('mongodb')
require('../../../models/segmentos_')
const Segmento = mongoose.model('segmentos')

require('dotenv').config({path:'../config.env'})
require('dotenv').config({path:'../env'})


//require('../../models/segmentosubs')
//const Segmentosub = mongoose.model('segmentosub')
// -----------------------------------------------------------------------------------------------
        //   CADASTRANDO OS SEGMENTOS 
// -----------------------------------------------------------------------------------------------
//console.log({ eAdmin})
router.post('/cadastro-segmentos',async(req,res) => {
    console.log('');
    console.log('------------------------------------------')
    console.log(" [ 22 ] ");
    console.log(" views origem : views/_admin/segmentos/segmentos.handlebars')")
    console.log(" route origem : routes _admin/segmentos/rota_segmentos/cadastro-segmento')")
    let registro=req.body.nametitulosegmento;
    new Segmento( {
            segmento:`${registro}`,
         }).save().then((result)=>{
              console.log('');
              console.log('result : ',result)
              console.log('');
              req.flash("success_msg","Segmento  cadastrado com sucesso!");
              res.redirect("buscar-segmentos")
         }).catch((err)=>{
             console.log(err)
             res.send(err)
         })
})

router.post('/cadastro-setor/:id',async(req,res) => {
    console.log('------------------------------------------------------------------')
    console.log("(39)-> routes _admin/mn_segmentos/('cadastro-setor/:id')")
    let z=req.params;
    console.log('vr de z',z)
    let [registro]=Object.values(z);
    console.log('vr de ...',registro)
    const myArray = registro.split(",");
    console.log(myArray)
    let segment=myArray[0]
    console.log(myArray[0])
    let setor=myArray[1]
    console.log(myArray[1])
    console.log('');
    console.log('____________________________________');
    console.log('bravo',segment);
    console.log('');
    console.log('______________________________________________________');
     Segmento.updateOne({segmento:segment},
                {$push:{setor:{
                        name:`${setor}`,
                        }
                    }
                },
                {upsert:false} )
             .then((result)=>{
                  console.log('');
                  console.log('result => ',result);
                  console.log('');
                  Segmento.aggregate([
                    {
                      $match:{
                          segmento:segment
                      }
                    },
                    {
                      $project:{setor:1}
                    }
                    
                    ,{
                      $sort:{name:1}
                    }
                    
               ])
                .then((result)=>{
                  console.log(' a ',result)
                  let r=[]
                  for(f of result){
                      let d=f.setor;
                      for(j of d){
                          r.push(j.name)
                      }
                      console.log('_______________________________________');
                      console.log('_______________________________________');
                      console.log('');
                  }
                  //::::::::::::::::::::::::::::::::::::::::::::::::::::
                  r.sort()
                  console.log(' 1 ',r);
                  console.log('_____________________________________');
                  res.send(r)
              })
              .catch((e)=>{
              console.log(e)
              })
         })
})

router.post('/cadastro-secao/:id',async(req,res)=>{
    console.log('');
    console.log(' [ 211 ]');
    console.log(' origem views  : views/_admin/admin/segmentos/secao.handlebars');
    console.log(' origem routes : routes/_admin/segmentos/rota_segmentos/cadastro-secao');
    console.log('');
    console.log(' destino : views/_admin/admin/segmentos/secao.handlebars - volta para mesmo form -');
    console.log(req.params)
    let palavra=req.params.id;
    let pos;
    let t;
    t=palavra.length;
    let segmento;
    let setor;
    let secao;
    let restante;
    //'Material de Construção+=+Ferramentas+=+alicate pressão'
    console.log('');
    console.log(' [ 127 ]',palavra);
    console.log('');
    console.log('');
    pos=palavra.search("=:=")
    
    
    
    
    function buscaSegmento(pos,palavra,segmento){
        console.log(' [ 133 ] ',pos);
        console.log(' [ 134 ]',palavra)   
          
        segmento=palavra.substring(0,pos);
        restante=palavra.substring((pos+3),t);
        console.log('');
        console.log('segmento : ',segmento)  
        console.log('restante : ',restante);
        console.log('+++++++++++++++++++++++++++++')
        pos=restante.search("=:=");
        setor=restante.substring(0,pos);
        console.log('setor :',setor);
        secao=restante.substring((pos+3),t);
        console.log('final ==>',secao)
        return segmento,setor,secao;
    }

    const X=buscaSegmento(pos,palavra,segmento,t)

    
    for(let i=0;i<2;i++){
        if (i==0){
            //buscaSegmento()
            console.log(palavra)
        }
    }
    console.log('-----------------------------------------------------')
   
   // let palavra=req.params;
   // return
    console.log(' segmento :',segmento);
    console.log('');
    console.log(' setor :',setor);
    console.log('');
    console.log(' secao :',secao);
    Segmento.updateOne({
                      "setor.name":setor,
                       },
                       {
                         $push:{'setor.$.secao':`${secao}`}
                       },
            )
            .then((resp)=>{
                console.log('[ 139 ]',resp);
                ///////////////////////////////////////
                Segmento.aggregate(
                            [
                                {
                                $match:{
                                            "setor.name":setor,
                                            }
                                },
                               {
                                $project:{"setor":1}
                               }
                            ]
                         )    
                        .then((result)=>{
                            //let W=[];
                            console.log('result =>[ 151 ] ',result)
                            /////////////////////////////////////////
                            console.log('_________________________________');
                            console.log('[BBBB]');
                            for(y of result){
                               console.log(''); 
                               let c=y._id;
                               console.log('valor de c',c)
                               console.log('________________________________________');
                            }
                            console.log('$$$$$')
                            /////////////////////////////////////////
                            console.log(typeof(result))
                            let G=result;
                            console.log('_________________________________');
                            for(f of G){
                               let n=f.setor;
                               for(x of n){
                                  let p=x.name;
                                  //........................................................
                                  console.log('=>',p,'---------------',setor)
                                  if(p==setor){
                                    resposta=x.secao;
                                  }
                               }
                            }
                            /////////////////////////////////////////////////////
                            console.log('++++++++++++++++++++++++++++++++++++++++++++++')
                            resposta=resposta.sort();
                            console.log('[180]',resposta)
                            res.send(resposta)
                        })
                        .catch((e)=>{
                             console.log(e)
                        })
            })
            .catch((e)=>{
                console.log(e); 
            })
})

router.get('/buscar-segmentos',async(req,res)=>{
     Segmento.find({},{segmento:1,_id:0}).sort({"segmento":1})
     .then ((segmento)=>{
        console.log('TTTTTTTTTTTTTTTTTTTTTTTTTT');
        res.render("_admin/admin/segmentos/segmentos", {layout:'central/segmentos/segmentos.handlebars',segmentos:segmento})
     })
     .catch((err)=>{

     })
})

// busca segmentos a para que seja selecionado o segmento e o setor para cadastrar uma nova seção 30/08/2024
router.get('/buscar-segmentos/:id',async (req,res) => {
    console.log('----------------------------------------------')
    console.log(' views origem ; views/admin/admincentral.handlebars=> menu Segemntos _ Secção');
    console.log(' routes origem : routes/_admin/segmentos/rota_segmentos/(/buscar-segmentos/:id');
    // recebe a letra que representa o segmento A:segmento,B segmento 01, ....
    let R=req.params;
    console.log('valor de params',R)
    let [F]=Object.values(R)
    Segmento.find({},{segmento:1,_id:0}).sort({"segmento":1})
            .then((segmento)=>{
                //--------------------------------------------
                console.log(' [ 115 ] /buscar-segmentos/:id ',segmento)
                if(!segmento){
                    console.log('??? Error');
                    res.render("_admin/admin/main_segmentos", {layout:'_participe.handlebars'})
                    console.log('');
                    req.flash("error_msg","error_msg","Não foi encontrado o segemnto !")
                }else{
                   if(F ==='A') {
                        // CADASTRO DE SEGMENTO
                        res.render("_admin/admin/segmentos/segmentos", {layout:'central/segmentos/segmentos.handlebars',segmentos:segmento})
                   } else if(F==='B'){
                        // CADASTRO DE SETOR
                        console.log('valores dos segmentos',segmento)
                        try{
                            const R=process.env.BaseApiUrl;// ??????????????????
                            res.render("_admin/admin/segmentos/segmento_sub", {layout:'central/segmentos/segmentos.handlebars',segmentos:segmento,base:R})
                        }catch(e){
                            console.log(e)
                        }    
                   }else if(F=='C'){
                        // CADASTRO DE SEÇÃO
                        console.log('C')
                        res.render("_admin/admin/segmentos/seccao", {layout:'central/segmentos/segmentos.handlebars',segmentos:segmento})
                   }
                }
            })
            .catch((e)=>{
                req.flash("error_msg","error_msg","Usuário não encontrado!")
                console.log('_admin/admin/segmentos.js->',e)
            })
})

// busca o array correspondente ao sub-segmento para novo cadastro 30/08/2024
router.get('/busca-setores/:id',async(req,res)=>{
    let t=req.params
    console.log('');
    console.log(' [ 150 ] => /busca-setores/:id');
    console.log(' origem: views/segmento_sub.handlebars ');
    console.log(" origem: routes/_admin/mn_segmentos/rota_segmentos/buscar-segmentos/:id')")
    console.log('');
    t=t.id;
    console.log('___________________________________________________');
    console.log('');
    let s=[];
    try{
        Segmento.aggregate([
                      {
                        $match:{
                            segmento:t
                        }
                      },
                        {
                          $project:{setor:1}
                        }
                      ,{
                          $sort:{name:1}
                      }
                 ])
                  .then((result)=>{
                    console.log(' a ',result)
                    let r=[]
                    for(f of result){
                        let d=f.setor;
                        for(j of d){
                            r.push(j.name)
                        }
                    }
                    //::::::::::::::::::::::::::::::::::::::::::::::::::::
                    r.sort()
                    console.log(' 1 ',r);
                    console.log('_____________________________________');
                    res.send(r)
                })
                .catch((e)=>{
                console.log(e)
                })
    }catch(e){
       console.log(e)
    }
})

// busca-secao é para preencher a caixa lista de seções a partir do setor 30/08/2024
router.get('/busca-secao/:id',async(req,res)=>{
    console.log('');
    console.log(' [ 234 ] /busca-secao/:id');
    console.log(' origem views  : views/_admin/segmentos/secao.handlebars');
    console.log(' origem routes : routes/_admin/segmentos/rota_segmentos.js/busca-secao/:id');
    console.log('');
    console.log(' destino : volta para mesmo form ');
    let segmento="Material de Construção"
    let setores=req.params.id;
    setores=setores.trim();
    console.log('');
    console.log(setores)
    console.log('___________________________________________');
    let resposta;
    Segmento.aggregate(
                [
                    {
                      $match:{
                                "setor.name":setores,
                                }
                    },
                    {
                      $project:{"setor":1}
                    }
                ]
            )
            .then((result)=>{
                let W=[];
                console.log('result => ',result)
                /////////////////////////////////////////
                console.log('_________________________________');
                console.log('');
                for(y of result){
                   console.log(''); 
                   let c=y._id;
                   console.log('valor de c',c)
                   console.log('________________________________________');
                }
                /////////////////////////////////////////
                console.log(typeof(result))
                let G=result;
                console.log('_________________________________');
                for(f of G){
                   console.log(f) 
                   let n=f.setor;
                   for(x of n){
                      let p=x.name;
                      console.log(setores,'----',p)
                      //........................................................
                      if(p==setores){
                        resposta=x.secao;
                      }
                   }
                }
                /////////////////////////////////////////////////////
                resposta=resposta.sort();
                res.send(resposta)
            })
            .catch((er)=>{
                console.log(er)
            })
})
module.exports = router;