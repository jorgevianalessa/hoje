const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config({path:'./.env'});
const { eAdmin } = require("../../../../helpers/eAdmin");

const { upload } = require('../../../libs/multer');
const { upload1 } = require('../../../libs/multer');
const { uploadFile,getFiles } = require('../../../controllers/sample.controllers');
const { uploadFoto } = require('../../../controllers/editafoto.controllers');

require('../../../models/raq_pedidos');
const Pedido = mongoose.model('raq_pedido');

require('../../../models/raq_boleta');
const RaqBoleta = mongoose.model('raq_boleta');

require('../../../models/raq_fluxo');
const RaqFluxo = mongoose.model('raq_fluxo');

//require('../../../models/raq_planocontas');
//const RaqPlano = mongoose.model('raq_planoctas');

require('../../../models/raq_clientes');
const RaqClient = mongoose.model('raq_client');

require('../../../models/lojista');
const Lojista = mongoose.model('lojista');

require('../../../models/fornecedor');
const Fornecedor = mongoose.model('fornec');

require('../../../models/segmentos_');
const Segmentos = mongoose.model('segmentos');

require('../../../models/sample_mconstrucao')
const Mconstrucao=mongoose.model('sample_mconstrucao');

require('../../../models/sample_mconstrucao');
const Sample = mongoose.model('sample_mconstrucao');

require('../../../models/raq_materialFornec');
const FornecMaterial = mongoose.model('material_fornec');

const path =require('path');
const { send } = require('express/lib/response');
const { ObjectId } = require('mongodb');

router.post('/upload/',upload,uploadFile);
router.post('/upload_edita/',upload,uploadFoto);
router.post('/files',getFiles);

router.get('/menu-compra_venda/:id',(req,res)=>{
    console.log('');
    console.log('_______________________________________________');
    console.log(' [ 18 ] ');
    console.log(' origem views : views/_cooperado/admin/raq-system.handlebars')
    console.log(" origem route : roues/_sample/raq-rotinas")
    console.log(' obs : Sai do Menu Admin do RaqSystem e vai abrir o menu Compra & Venda');
    console.log('');
    console.log(' destino :_cooperado/sample/raqsystem/menu-compra_venda');
    console.log('')
    let n=req.params.id
    console.log(' [ 26 ]',n)
    try{
        res.render("_cooperado/sample/raqsystem/vendas/menu-compra_venda",{layout:'lojista/templete3.handlebars',codigo:n})
    }catch(e){
      console.log("AHHH")
    }
})

router.get("/voltaHome/:id",async(req,res)=>{
    console.log(' [ 70 ] ');
    console.log('');
    console.log(' origem views : views/_cooperado/sample/raqsystem/vendas/menu-compra_venda.handlebars');
    console.log(' origem route : route/_sample/raq/raqvendas/voltaHome/:id');
    console.log(' Obs : ');
    console.log('');
    console.log(' destino : retorna para lista pedido');
    console.log('');
    let r=req.params.id;
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

router.get('/menuVendas',(req,res)=>{
    //////////////////////////////////////////////////////////
    try{
       res.render("_cooperado/sample/raqsystem/vendas",{layout:'lojista/admin-loja.handlebars'})
    }catch(e){
      console.log("AHHH")
    }
  })

router.post('/grava-cadastro-cliente',(req,res)=>{
    console.log('');
    console.log('_______________________________________________');
    console.log(' [ 72 ] ');
    console.log(' origem views : views/_cooperado/sample/raqsystem/clientes.handlebars')
    console.log(" origem route : direto da view")
    console.log(' obs : ');
    console.log('');
    console.log(' destino : ');
    console.log('')
    console.log('__________________________________________________');
    console.log('');
    let dados_business = req.body
    let errors = []
    console.log('-------------------------------------------')
    console.log(' Cadastrando Cliente T3  ->',dados_business);
    console.log('-------------------------------------------')
    if (!req.body.rzsocialNome || typeof req.body.rzsocialNome == undefined || req.body.rzsocialNome == null) {
        errors.push ({ error:"Necessário preencher a razão social!"})
    }
  
    if (!req.body.cpfCnpj || typeof req.body.cpfCnpj == undefined || req.body.cpfCnpj == null) {
        errors.push ({ error:"Necessário preencher o cpf 1!"})
    }

    if (!req.body.SelectPessoa || typeof req.body.SelectPessoa == undefined || req.body.SelectPessoa == null) {
      errors.push ({ error:"Necessário preencher o SelectPessoa!"})
  }
  
    if (!req.body.inscricao || typeof req.body.inscricao == undefined || req.body.inscricao == null) {
        errors.push ({ error:"Necessário preencher a inscrição estadual!"})
    }
  
    if (!req.body.inputSite || typeof req.body.inputSite == undefined || req.body.inputSite == null) {
      errors.push ({ error:"Necessário colocar o nome do site!"})
    }
  
    if (!req.body.celular || typeof req.body.celular == undefined || req.body.celular == null) {
        errors.push ({ error:"Necessário preencher o campo do celular!"})
    }
  
    if (!req.body.telefixo || typeof req.body.telefixo == undefined || req.body.telefixo == null) {
        errors.push ({ error:"Necessário preencher o campo do telefone fixo!"})
    }

    if (!req.body.boxEmail || typeof req.body.boxEmail == undefined || req.body.boxEmail == null) {
        errors.push ({ error:"Necessário preencher o campo do dono e-mail!"})
    }

    if (!req.body.inputCep || typeof req.body.inputCep == undefined || req.body.inputCep == null) {
      errors.push ({ error:"Necessário preencher o campo do código postal!"})
    }
  
    if (!req.body.inputAvenida || typeof req.body.inputAvenida == undefined || req.body.inputAvenida == null) {
        errors.push ({ error:"Necessário preencher o nome da rua !"})
    }
  
    if (!req.body.inputNumero || typeof req.body.inputNumero == undefined || req.body.inputNumero == null) {
        errors.push ({ error:"Necessário preencher o número do estabelecimento!"})
    }

    if (!req.body.inputNomeEdificio || typeof req.body.inputNomeEdificio == undefined || req.body.inputNomeEdificio == null) {
      errors.push ({ error:"Necessário preencher o nome do Edifício!"})
    }

    if (!req.body.inputNumberBloco || typeof req.body.inputNumberBloco == undefined || req.body.inputNumberBloco == null) {
      errors.push ({ error:"Necessário preencher o nome/nome  do bloco!"})
    }

    if (!req.body.inputNumberApto || typeof req.body.inputNumberApto == undefined || req.body.inputNumberApto == null) {
      errors.push ({ error:"Necessário preencher o número do apto!"})
    }
  
    if (!req.body.inputCidade || typeof req.body.inputCidade == undefined || req.body.inputCidade == null) {
        errors.push ({ error:"Necessário preencher o nome da cidade!"})
    }
  
    if (!req.body.inputBairro || typeof req.body.inputBairro == undefined || req.body.inputBairro == null) {
        errors.push ({ error:"Necessário preencher o nome do bairro!"})
    }
    if (!req.body.inputEstado || typeof req.body.inputEstado == undefined || req.body.inputEstado == null) {
        errors.push ({ error:"Necessário preencher o nome do estado!"})
    }
    let n=req.body.idLoja;
    if(errors.length>0) {
        console.log('/cadastronegocio--Errors')
        console.log(errors)
        req.flash("error_msg","Error: Não foi possivel cadastrar a sua empresa!",errors)
                       console.log(dados_business)
           //            res.render("participe/cadastro",{errors:errors,contato:dados_business})
    }else{
        let site;
        site =req.body.nomeSite ;
        msgEmail=req.body.boxEmail;
        let situacao='default'; 
        let assinante=0;
        //let ativo=0;
        console.log(req.body.SelectPessoa,)
        const addContato = {
            razaoNome:req.body.rzsocialNome,
            assinante:assinante,
            situacao:'ativo',
            ativo:3,
            cpfCnpj:req.body.cpfCnpj,
            pessoa:req.body.SelectPessoa,
            inscricao:req.body.inscricao,
            site:site,
            celular:req.body.celular,
            telefone:req.body.telefixo,
            cep:req.body.inputCep,
            email:msgEmail,
            logradouro:req.body.inputAvenida,
            numero:req.body.inputNumero,
            cidade:req.body.inputCidade,
            bairro:req.body.inputBairro,
            estado:req.body.inputEstado,
            raq:{
                edificio:[
                  {
                   nome:req.body.inputNomeEdificio,
                   bloco:req.body.inputNumberBloco,
                   apto:req.body.inputNumberApto,
                   qte:0,
                   chave:0,
                  }
                 ],
            },
            contabil:[
                  {

                  }  
            ]
        }
          
      //  const addEnd = {
      //    cep:req.body.inputCep,
      //    complemento:req.body.inputComplemento,
      //    logradouro:req.body.inputAvenida,
      //    numero:req.body.inputNumero,
      //    cidade:req.body.inputCidade,
      //    bairro:req.body.inputBairro,
      //    estado:req.body.inputEstado,
      //  }
       // new endLojista(addEnd)
       //           .save()    
       //           .then((end)=>{
       //               console.log(end)
                      gravaCliente()
       //           })
       //           .catch((err)=>{
       //               console.log(err)
                      
       //           })
  
        function gravaCliente(){
          console.log(' [ 149 ] gravando loja')  
          new RaqClient(addContato)
                      .save()
                      .then((r)=>{
                         console.log('___________________________________')
                          console.log('resultado : ', r)
                          console.log('____________________________________')
                          req.flash("success_msg","Mensagem enviada com sucesso!")
                          //var originalHex = objectId.toHexString(r._id)
                          //console.log('valor da id',originalHex);
                          console.log('');
                          console.log('[ 159 ] transferindo para menuCliente');
                          console.log('____________________________________');
                          //res.redirect('lista-cliente');
                          res.render("_cooperado/sample/raqsystem/vendas/menu-compra_venda",{layout:'lojista/templete3.handlebars',codigo:n})
                      })
                      .catch((err)=>{
                          console.log(err)
                          req.flash("error_msg","Error: Mensagem de contato não foi enviada com sucesso!",err);
                          //res.redirect('cadastro-lojista');
                      })
        }          
     }
  })

router.get('/lista-cliente',async(req,res)=>{
    console.log('');
    console.log('___________________________________');
    console.log('');
    console.log(' [ 207 ]');
    console.log(' origem views : views/partials/_acentra_sidebar.handlebars/href"centrallj/lista-lojista');
    console.log(' origem route : routes/_admin/mn_lojista_.js/lista-lojista');
    console.log(' obs : ');
    console.log('');
    console.log(' destino :');
    console.log('');
    console.log(' ___________________________________');
    console.log('---------------------------TESTE--------------------------')
    RaqClient.find({}).sort({'razao':1})
            .then((r)=>{
                console.log(r)
                // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                console.log('');
                res.send(r)
          })
           .catch((e)=>{
            console.log(e)
           })
})

router.get("/BuscaDados-cliente/:id",async(req,res)=>{
  console.log('');
  console.log(' [ 255 ]');
  console.log(' origem views : views/partials/_acentra_sidebar.handlebars/href"centrallj/lista-lojista');
  console.log(' origem route : routes/_admin/mn_lojista_.js/lista-lojista');
  console.log(' obs : ');
  console.log('');
  console.log(' destino :');
  console.log('');
  console.log(' ___________________________________');
  //console.log(req.params)
  let e_=req.params.id;
  console.log("BRAVO",e_)
  RaqClient.find({email:`${e_}`},{raq:1,email:1}).sort({'razao':1})
        .then((resposta)=>{
              //console.log(resposta)
              console.log('-----------------------------')
              let [f]=resposta;
              console.log(f.raq)
              res.send(f.raq)
        })
        .catch((e)=>{
           console.log(e)
        })

})

router.get('/cadfornec/:id',async(req,res)=>{
  console.log('');
  console.log('_______________________________');
  console.log('');
  let id=req.params.id;
  console.log('[ 267 ]',id)
  res.render("_modelos/raq-fornecedor",{layout:'lojista/templete3.handlebars',codClient:id})
})

router.get('/compras/:id',async(req,res)=>{
      console.log(' { 343 ]')
      console.log('raq/compras')
      console.log('------------------------')
      let codigoLojista=req.params.id;
      console.log(codigoLojista)
      console.log('------------------------')
      res.render("_cooperado/sample/raqsystem/compras/compras-head",{layout:'lojista/templete3.handlebars',codigoLojista:codigoLojista})
})

router.get('/produto/:id',async(req,res)=>{
  console.log('');
  console.log('_______________________________________________');
  console.log(' [ 284 ] ');
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
            res.render("_cooperado/sample/raqsystem/cad_produto",{layout:'lojista/templete3.handlebars',lojista:resp,segmento:segmento})
         })
         .catch((err)=>{
            console.log(err)
         })
  
})

// busca todos os segmentos para indicar qual o produto pertence                                            // Cadastro de ???? 
router.get("/buscarSetor-CadProduct/:id",async(req,res)=>{
  console.log('');
  console.log('__________________________________________');
  console.log('');
  console.log(' [ 358 ] ');
  console.log('');
  console.log(' origem views : views/_cooperado/lojista/cadastro_produto.handlebars');
  console.log(' origem route : route/_sample/raq-rotinas//buscarSetor-CadProduct/:id');
  console.log(' Obs : ');
  console.log('');
  console.log(' destino : retorna para lista os2 produtos');
  console.log('');
  let p1=req.params.id;
  console.log(p1)
  console.log('____________________________________________________');
  Segmentos.find({segmento:p1})
           .then((result)=>{
              console.log('');
              console.log('');
              let S1=result[0].setor;
              console.log('');
              let l=S1.length;
              let setor=[]
              for (let i=0;i<l;i++){
                setor.push(S1[i].name)
              }
              setor.sort();
              console.log('');
              console.log(setor)
              res.send(setor);
           })
           .catch((e)=>{
                 console.log(e)
           }) 
           
})

router.get("/Setor-EditaProduct/:id",async(req,res)=>{
  console.log('');
  console.log('__________________________________________');
  console.log(' [ 394 ] ');
 // send.res(23232323)
 // return
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
  console.log(' [ 442 ] ');
  console.log('');
  console.log(' origem views : views/_cooperado/lojista/cadastro_produto.handlebars');
  console.log(' origem route : route/_sample/rotas/buscar_subseg/:id');
  console.log(' Obs : ');
  console.log('');
  console.log(' destino : retorna para lista os produtos');
  console.log('');
  let p1=req.params.id;
  console.log(' [ 421 ] =>',p1)
  console.log('____________________________________________________');
  //return
  Segmentos.find({
             $and:[
               {segmento:"Material de Construção"},
               {'setor.name':p1}
             ]
          },{setor:1})
          .then((result)=>{
               console.log('[ 431 ] ',result)
               result=result[0]
               let S1=result.setor
               console.log('---------------------------------')
               console.log(' [ 435 ] ==> ',S1[0].name);
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

router.get('/buscaSecoes-CadProduct/:id',async(req,res)=>{
  console.log('');
  console.log('[ 499 ]');
  console.log(' origem views : views/_cooperado/sample/raqsystem/cad_produto.handlebars');
  console.log(' origem route : routes/_sample/rotas.js/buscaSecoes-CadProduct/:id');
  console.log(' destino : retorna para preencher o cbo SelectSecoes');
  console.log('');
  console.log(req.params)
  let setor=req.params.id;
  console.log(setor)
   Segmentos.find({
    //$and:{
      'segmento':"Material de Construção",
      'setor.name':setor
     //},
   },{'setor':1})
   .then((result)=>{
      console.log(' 362 ')
    
      console.log('')
       let l=result.length;
       console.log(' lenght ',l)
       let objeto=Object.values(result)
       console.log('-----------------------------')
       objeto=objeto[0];
      
       let f=objeto.setor;
    
       let j=f.length;
       console.log('length [ 515 ]',j)
       console.log('-----------------------------')
       console.log('');
       for (q=0;q<j;q++){
         let group=f[q];
         console.log(group.name)
         if(group.name==setor){
           let P=f[q]
           console.log(' [ 388 ]    ',P)
           console.log(typeof(P))
           res.send(P)
           break;
         }
       }
       console.log('')
       const obj=objeto;
       let h=0;
       return
       console.log('_______________________________')
      
       let arr=[];
       //let r={};
       for (const [key,value] of Object.entries(f)){
          console.log(`${key}: ${value}`)
          let nome=`${value.name}`;
          let g;
          console.log('[ 391 ]',nome , '<==>',setor)  
          if (nome==setor){
              g=`${value}`
             // for (const [key, value] of Object.entries(g)) {
             //   console.log(`${value}`);
             // }
             // return
             // console.log('[ 394 ]',Object.values(g.secao));
              console.log('==========================')
             // console.log(g);
              //typeof(g)
              console.log(typeof(g))
              //const X=g;
              //const t=X.filter((g)=>secao)
              //console.log(t)
              console.log('>>>>>>>>>>><<<<<<<<<<,')
             // pula()
              res.send(g);
              break;
              //arr.push(`${value.secao}`)
          }
       }
       //console.log('_______________________________')
       //console.log(arr)

       //console.log(r)
       function pula(){
          console.log('99999999999999999999999999999')
       }
      
   })
   .catch((err)=>{
     console.log(err);
   })

})

router.get('/buscarfornec-CadProduct/:id',async(req,res)=>{
  console.log('');
  console.log('[ 591 ]');
  console.log(' origem views : views/_cooperado/sample/raqsystem/cad_produto.handlebars');
  console.log(' origem route : routes/_sample/rotas.js/buscaSecoes-CadProduct/:id');
  console.log(' destino : retorna para preencher o cbo SelectSecoes');
  console.log('');
  console.log(req.params)
  let id=req.params.id;
  console.log(' 572 ',id)
  Fornecedor.find({'lojista.lojaid':id},{razao:1})
                      .then((result)=>{
                         // console.log( result)
                          console.log('------------------------')
                          //console.log(result)
                          let r=result.length;
                          console.log(r)
                          console.log('resposta => ',result)
                          res.send(result)
                      })
                      .catch((err)=>{
                        console.log(err)
                      })

})

router.get('/buscarfornec-EditaProduct/:id',async(req,res)=>{
  console.log('');
  console.log('[ 617 ]');
  console.log(' origem views : views/_cooperado/sample/raqsystem/cad_produto.handlebars');
  console.log(' origem route : routes/_sample/rotas.js/buscaSecoes-CadProduct/:id');
  console.log(' destino : retorna para preencher o cbo SelectSecoes');
  console.log('');
  console.log(req.params)
  let id=req.params.id;
  Fornecedor.find({'lojista.lojaid':id},{razao:1})
                      .then((result)=>{
                         // console.log( result)
                          console.log('------------------------')
                         // console.log(result)
                          let r=result.length;
                          console.log(r)
                          console.log('resposta => ',result)
                          res.send(result)
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
  let lojista="default";
  Mconstrucao.find({loja_id:id})
             .then((result)=>{
              res.render("_cooperado/sample/raqsystem/lista-produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result:result});
             })
             .catch((err)=>{
                console.log(err)
             })
})

router.get('/editaproduto/:id',async(req,res)=>{
  console.log('');
  console.log('__________________________________________');
  console.log('');
  console.log(' [ 638 ] ');
  console.log('');
  console.log(' origem views : views/_cooperado/sample/materialconstrucao/cad_construção_produto.handlebars');
  console.log(' origem route : route/_sample/rotas/editaproduto');
  console.log(' Obs : ');
  console.log('');
  console.log(' destino : retorna para lista os produtos');
  console.log('');
  //...............................................
  let nucleo=req.params;
  let corpo=[];
  let sub={};
  let nameSegmento;
  let nameSetor;
  let nameSecao;
  let opcao=0;
  let idProduto=nucleo.id;
        Sample.findOne({_id:idProduto})
                  .then((produto)=>{
                    console.log('')
                    console.log('_________________________________')
                    console.log(' 660 ',produto)
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
                             console.log(' [ 693 ]',palavra)
                             console.log('segmento :',nameSegmento)
                             console.log('<><><><><><><><><><><>');
                             let [setor]=palavra.setor;
                             console.log(' 697  ',setor)
                             console.log('_____________________________')
                             //obj.I
                             if( setor="undefined"){
                                console.log("Não há setor cadastrado.")
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
                                fornecedor:produto.fornecedor,
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
                                console.log(' não há setor cadastrado!!!')
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

router.get('/visualizar/:id',async(req,res)=>{
  console.log('');
  console.log('[ 478 ]');
  console.log(' origem views : views/_cooperado/sample/raqsystem/menu-comp´ra_venda');
  console.log(' origem route : routes/_sample/raqsystem/listaProduto/:id');
  console.log(' destino : retorna para preencher o cbo SelectSecoes');
  console.log('');
  console.log(req.params)
  let id=req.params.id;
  console.log("VISUALIZAR RAQ!",id)
  // mostra um form com o produto somente para observação dos dados
})

router.post('/grava_edicao',async(req,res)=>{
  console.log('');
  console.log('__________________________________________');
  console.log('');
  console.log(' [ 777 ] ');
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
  let fornec=nucleo.nameFornec;
  let codigo=nucleo.nameCodigo;
  let descricao=nucleo.nameDescricao;
  let complete=nucleo.nameComplete;
  let material=nucleo.nameMaterial;
  let pcusto=nucleo.namePcusto;
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
                                 fornecedor:`${fornec}`,
                                 descricao:`${descricao}`,
                                 complete:`${complete}`,
                                 referencia:`${material}`,
                                 precocusto:`${pcusto}`,
                                 precovista:`${pvista}`,
                                 precoprazo:`${pprazo}`,
                                 localizacao:[
                                     {segmento:segmento,
                                      setor:[
                                            {
                                            nameSetor:setor,
                                            secao:[
                                                  {nameSecao:secao},
                                                 ]
                                              }
                                          ]
                                   }
                                  ]
                             }
                      },
             )
             .then((produto)=>{
                console.log("=> ",produto)    
                Lojista.findOne({_id:`${lojaId}`})
                       .then((lojista)=>{
                             Sample.find({loja_id:lojaId}).sort({pageposicao:1})
                                 .then((result)=>{
                                      res.render("_cooperado/sample/raqsystem/lista-produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result:result});
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

router.get('/editarfoto/:id',async(req,res)=>{
  console.log('');
  console.log('__________________________________________');
  console.log('');
  console.log(' [ 321 ] ');
  console.log('');
  console.log(' origem views : views/_cooperado/lojista/cadastro_produto.handlebars');
  console.log(' origem route : route/_sample/raq-rotinas/editarfoto');
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
          res.render("_cooperado/sample/raqsystem/edita-foto",{ layout:'sample/formata-produto.handlebars',result:result,setor:setor});
        })
        .catch((e)=>{
           console.log(e)
        })
})

router.get('/listaFornecCompras/:id',async(req,res)=>{
  console.log('__________________________________________');
  console.log('');
  console.log(' [ 948 ] ');
  console.log('');
  console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
  console.log(' origem route : route/_sample/raq-vendas/listaFornecCompras/:id');
  console.log(' Obs : ');
  console.log('');
  console.log(' destino : retorna uma lista de clientes para seleção');
  console.log('');
  let palavra=req.params.id;
  console.log(palavra);
  let l=palavra.length;
  let cliente=palavra.substring(0,24);
  let Idpessoa=palavra.substring(27,l)
  console.log(Idpessoa);
  Idpessoa="Pessoa " + Idpessoa;
  console.log(Idpessoa)
  console.log('____________________________________')
  /////////////////////////////////////////////////////////////////////
  //return
  try{
            Fornecedor.find({'lojista.lojaid':"66eeedee4def99cd4232a400"})
                  .then((result)=>{
                      console.log(result)
                    //  let l=result.length;
                    //  rArray=[];
                    //  rArray.push(result)
                    //  rArray.push(l)
                    //  console.log(rArray)
                      res.send(result)
                  })
                  .catch((er)=>{
                      console.log(er)
                  })
      }catch(e){
          console.log(e)
      }
})

router.get("/fornec_Headrs/:id",async(req,res)=>{
  //  Só está servindo de passagem sem muita função
  console.log('__________________________________________');
  console.log('');
  console.log(' [ 956 ] ');
  console.log('');
  console.log(' origem views : views/_cooperado/sample/raqsystem/compras-head.handlebars');
  console.log(' origem route : route/_sample/raq-rotinas/fornec_Headrs/:id');
  console.log(' Obs : AQUI PODE_SE GRAVAR O NÚMERO DA NOTA ');
  console.log('');
  console.log(' destino : retorna para views/_cooperado/sample/raqsystem/compras-head.handlebars');
  console.log('');
  let palavra=req.params.id;
  console.log(palavra)
  let l=palavra.length;
  console.log('vr de l',l)
  let codigoLojista=palavra.substring(0,24);
  let codigoFornec=palavra.substring(27,l);
  console.log('__________________________________');
  console.log(codigoLojista);
  console.log('');
  console.log(codigoFornec);
  console.log('');
  console.log('__________________________________');
  Fornecedor.find({
                     //$and:{
                           _id:codigoFornec,
                     //}
                  })
            .then((result)=>{
                console.log(' dados do fornecedor para preencher o cabeçalho  :',result)
                res.send(result)
            })
            .catch((er)=>{
                console.log(er)
            })
})

router.get('/Pega_produtosParaSelect/:id',async(req,res)=>{
  console.log('__________________________________________');
  console.log('');
  console.log(' [ 981 ] ');
  console.log('');
  console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
  console.log(' origem route : route/_sample/raq-compras/Pega_produtosParaSelect/:id');
  console.log(' Obs : ');
  console.log('');
  console.log(' destino : retorna para lista os produtos');
  console.log('');
  let id=req.params.id;
  console.log(' id ' , id)
  Sample.find({$and:[
                     {loja_id:id},
                     //{notafiscal:0}
                    ]
           }
          )
        .sort()
        .then((result)=>{
           console.log(result)
           let l=result.length;
           let Obj=[];
           Obj.push(result,l)
           console.log(' [ 996 ]');
           console.log(result)
           res.send(Obj)
        })
        .catch((er)=>{
          console.log(er)
        })
})

router.post("/gravaPedido/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 1014 ] ');
    console.log('');
    console.log(' origem views : views/_cooperado/sample/raqsystem/compras/compras-head.handlebars');
    console.log(' origem route : route/_sample/raq-rotinas/gravaPedido/:id');
    console.log(' Obs : ');
    console.log('');
    console.log(' destino : retorna para lista pedido [1013]');
    console.log('');
    let corpo=req.params.id;
    let l=corpo.length;
    console.log(' palavra chave   ',corpo);
    console.log('l=>',l)
    let numberFornec=corpo.substring(0,24);
    let rest=corpo.substring(26,l);
    let pos=rest.search(":::");
    let nomeComprador=rest.substring(0,pos);
    let nomeFornec=rest.substring((pos+3),l)
    console.log(nomeFornec);
    console.log(nomeComprador);
    console.log(numberFornec);
    let numberPedido=0;
    
    let posicao;
    let condicaoPg;
    let endlocal;
    let nomelocal;
    let bloco;
    let apto;
    let qte;
    let chave;
  
    numberPedido=parseInt(numberPedido)
    if (numberPedido===0){
        gravaNota(numberPedido,numberFornec,nomeFornec,nomeComprador);
    }else{ 
        console.log(numberPedido)
        //editaNota();
    }

    function gravaNota(numberPedido,numberFornec,nomeFornec,nomeComprador){
          try{
            console.log('passando')
            Pedido.insertMany(
                                    {
                                      numberPedido:0,
                                      numberFornec:numberFornec,
                                      nomeFornec:nomeFornec,
                                      comprador:nomeComprador,
                                      posicao:'P',
                                    }
                                //  ]
                                )
                                .then((result)=>{
                                      console.log('===>',result)
                                      res.send(result);
                                  })
                                .catch((er)=>{
                                      console.log(er)
                                }); 
          }catch(e){
            console.log(e)
          }                      
     }
})

router.get('/produtoLetras/:id',async(req,res)=>{
  console.log('');
  console.log(' [ 1121 ] ');
  console.log('');
  console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
  console.log(' origem route : route/_sample/raq-rotinas/produtoLetras/:id');
  console.log(' Obs : ');
  console.log('');
  console.log(' destino : retorna para lista pedido');
  console.log('');
  let letras=req.params.id;
  let numberLojista=letras.substring(0,24);
  letras=letras.substring(24,28);
  console.log(letras);
  console.log('--------------');
  
  Sample.find({"descricao":{"$regex": `${letras}`, "$options": "i"}})
        .then((resp)=>{
           let corpoArray=[];
           let l=resp.length;
           for (let i=0;i<l;i++){
               let n=resp[i].loja_id;
               if(n==numberLojista){
                 corpoArray.push(resp[i])
               }
           }
           res.send(corpoArray)
        })
        .catch((err)=>{
           console.log(resp)
        })
})

router.get('/clienteLetras/:id',async(req,res)=>{
  console.log('');
  console.log(' [ 1149 ] ');
  console.log('');
  console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
  console.log(' origem route : route/_sample/raq-rotinas/clienteLetras/:id');
  console.log(' Obs : ');
  console.log('');
  console.log(' destino : retorna para lista pedido');
  console.log('');
  let letras=req.params.id;
  console.log(letras)
  function minha(letras){
    const result= RaqClient.find({"razaoNome":{"$regex": `${letras}`, "$options": "i"}})
                           .then((r)=>{
                             res.send(r)
                             return r;
                           })
                           .catch((err)=>{
                             console.log(err)
                           });
  }
  minha(letras);
})

router.get("/selectProdut/:id",async(req,res)=>{
  console.log('');
  console.log(' [ 1194 ] ');
  console.log('');
  console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
  console.log(' origem route : route/_sample/raq-rotinas/selectProdut/:id');
  console.log(' Obs : Vem pegar o complemento do item para registar em X12 ');
  console.log('');
  console.log(' destino : retorna para lista pedido');
  console.log('');
  let corpo=req.params.id
  console.log('vr do corpo',corpo)
  let numberProduto=corpo.substring(0,24);
  console.log('nr do produto',numberProduto);
  let l=corpo.length;
  let restante1=corpo.substring(27,l);
  let pos=restante1.search(":<>:");
  console.log(' pos ', restante1,'-',pos)
  let notaPedido=restante1.substring(0,pos);
  let comprador=restante1.substring((pos+4),l)
  console.log(notaPedido);
  console.log(comprador)
  //return
        ///////////////////////////////////////////
        Sample.findOne({_id:numberProduto})
              .then((resp)=>{
                 console.log(resp)
                 //////////////////////////////////////
                 let codigoProduto=resp.codigo;
                 let descricao=resp.descricao;
                 let complete=resp.complete;
                 let qte=res.qte;
                 let custo=resp.precovista;
                 let venda=resp.precoprazo
                 console.log(typeof(notaPedido))
                 const query_nota={
                                   $and:[
                                    {numberPedido:notaPedido},
                                    {comprador:comprador},
                                   ]
                 }
                 const options_nota = { upsert: true }; 
                 const insert_Itemnota={$addToSet :{itens:[
                                                      {
                                                        IdProduto:numberProduto,
                                                        codigoProduto:codigoProduto,
                                                        qte:0,
                                                        descricao:descricao  + " " + complete ,
                                                        custo:custo,
                                                        venda:venda,
                                                      }
                                                     ]
                                               }                         
                                        }      
                 ////////////////////////////////////////////////////////////    
                 Pedido.updateMany(query_nota,insert_Itemnota,options_nota)
                             .then((resultado)=>{
                                console.log('_______&_________________________')
                                console.log('inserido item',resultado)
                                if (resultado.modifiedCount=== 1){
                                  console.log('dentro')
                                  Pedido.findOne({
                                                          $and:[
                                                            {numberPedido:notaPedido},
                                                            {comprador:comprador},
                                                          ]
                                                       },{itens:1}
                                                      )
                                              .then((result)=>{
                                                 console.log(result)
                                                 res.send(result)
                                              })
                                              .catch((er)=>{
                                                console.log(er)
                                              })        
                                }
                                console.log('')
                               // res.send(resultado); 
                              })
                              .catch((er)=>{
                                console.log(er)
                              })    
                 ////////////////////////////////////   
              })
              .catch((e)=>{
                console.log(e);
              })
        //////////////////////////////////////////
})

router.get('/pegaPedidoPendente/:id',async(req,res)=>{
  console.log('');
  console.log(' [ 1264 ] ');
  console.log('');
  console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
  console.log(' origem route : route/_sample/raq-rotinas/pegaPedidoPendente/:id');
  console.log(' Obs : Vem verificar se há nota faltando complementação.');
  console.log('');
  console.log(' destino : retorna para views/_cooperado/sample/raqsystem/vendas.handlebars');
  console.log('');
  console.log(req.params);
  let palavra=req.params.id;
  let pos=palavra.search("::-::");
  let l=palavra.length;
  let nomeComprador=palavra.substring(0,pos);
  let nNota=palavra.substring((pos+5),l);
  console.log('================> ', nNota)
  console.log('----------------------------------------------')
  let objet=[];
  Pedido.findOne(
                {
                  $and:
                  {
                    numberNota: 0,
                    comprador:nomeComprador,
                    posicao:"P",
                  }
                }
                
              )
              .then((result)=>{
                console.log('------------------------')
                console.log('dados da nota fiscal',result)
                if(result===null){
                   let p={};
                   p={
                       a:1000
                     }
                   res.send(p)
                }else{
                  console.log('')
                  nNota=result.numberNota;
                  objet.push(result)
                  //console.log(nNota)
                  let nClient=result.numberClient;
                  //console.log(nClient)
                  //////////////////////////////////////////////////
                  RaqClient.findOne({_id:nClient})
                           .then((resp)=>{
                              console.log(resp)
                              objet.push(resp)
                              console.log('------------------------')
                              res.send(objet)
                           })
                          .catch((err)=>{
                              console.log(err)
                          })
                        }
              })
              .catch((e)=>{
                console.log(e)
              })
})

router.get("/acesso_relatorio_vendas",async(req,res)=>{
  console.log('');
  console.log(' [ 1312 ] ');
  console.log('');
  console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
  console.log(' origem route : route/_sample/raq-rotinas/acesso_relatorio_vendas/:id');
  console.log(' Obs : acessar relatórios de vendas.');
  console.log('');
  console.log(' destino : abre a views de relatórios de vendas');
  console.log('');
  
  try{
      res.render("_cooperado/sample/raqsystem/vendas-menu-relatorios",{layout:'lojista/templete3.handlebars'})
    }catch(e){
      console.log(e)
  }
})

router.get("/acesso_cadastro_cliente",async(req,res)=>{
  console.log('');
  console.log(' [ 1333 ] ');
  console.log('');
  console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
  console.log(' origem route : route/_sample/raq-rotinas/acesso_cadastro_cliente');
  console.log(' Obs : acessar o cadastro de clientes.');
  console.log('');
  console.log(' destino : abre a views de relatórios de vendas');
  console.log('');
  console.log(req.params)
})

router.post("/acesso_delete_vendas/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 1343 ] ');
    console.log('');
    console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
    console.log(' origem route : route/_sample/raq-rotinas/acesso_delete_vendas/:id');
    console.log(' Obs : acessar relatórios de vendas.');
    console.log('');
    console.log(' destino : abre a views de relatórios de vendas');
    console.log('');
    let palavra=req.params.id;
    let numberProduto=palavra.substring(0,24);
    console.log('nproduto' ,numberProduto);
    console.log('____________________________');
    let pos=palavra.search(":::");
    let l=palavra.length;
    let vendedor=palavra.substring((pos+3),l);
    let numberNota=0;
    console.log(' n Nota ',vendedor);
    Pedido.find({ $and:[
                            numberNota=0,
                            vendedor=vendedor,
                            posica="P",
                             ]
               
                },{itens:1})
                .then((e)=>{
                   console.log(e)
                })
                .catch((er)=>{
                  console.log(er)
                })
})

router.post("/fechamentoNota",async(req,res)=>{
      console.log('');
      console.log(' [ 1370 ] ');
      console.log('');
      console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
      console.log(' origem route : route/_sample/raq-rotinas/fechamentoNota/:id');
      console.log(' Obs : acessar relatórios de vendas.');
      console.log('');
      console.log(' destino : abre a views de relatórios de vendas');
      console.log('');
      let palavra=req.body;
      console.log(palavra)
      ////////////////////////////////////////////////////////
      let n_Id=palavra._idClient;
      console.log('_id do cliente ==>  ',n_Id);

      let nomeVendedor=palavra.NomeVendedor;
      console.log('nome vendedor ',nomeVendedor);

      let NomeCliente=palavra.NomeClient_;
      console.log('nome cliente :',NomeCliente)
      
      let pessoaContabil=palavra.nomeContabil;
      console.log('pessoa Física ou Jurídica : ',pessoaContabil)
      let numeroContabil=parseInt(palavra.numeroContabil);
      console.log('numero contabil :',numeroContabil);

      let condicao=palavra.Nomecondpago;
      console.log(' condição de pagamento :',condicao);

      let data=palavra.DataEntrega;
      console.log(' data :',data);
      //console.log(data.getDate())
      let dataSaida=new Date(data)
     // console.log(dataSaida.getDate())
      console.log('');
      console.log('____________________________________');
      console.log(' 1431 ',dataSaida);
      console.log('');
      dataSaida.setDate(30);
      console.log('');
      console.log(' 1435 ',dataSaida)
      console.log('');
      console.log('___________________________________________________');
      let NumeroLoja=palavra.NumeroLoja;
      console.log('Id da loja',NumeroLoja);
      let valormax=1;
     // return
      let nNota;
      let valorTotal;
      console.log('________________________________________');
      console.log('________________________________________');
      ////////////////////////////////////////////////////
      // Contas pra edição das BOLETAS
      let numeroBol;
      let NumeroCtaCliente;
      let NumeroCtaReceita;
      let NumeroCtaEstoque;
      let NumeroCtaDespesasEstoque;
      ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      // Verificação se já é cliente ou não. Se já é cliente então  já se tem o número contabil, caso contrario vamos seguir
      if(numeroContabil==0){
         // Como não há registro do cliente no plano de conta então vamos atravez do parametro localizar qual o último
         busc_ParametroCtaCliente(pessoaContabil);
      }   

      // LANÇANDO AS CONTAS NAS BOLETAS
      busc_ParametroReceita();
      busc_ParametroEstoque();
      busc_ParametroDespesaEstoque();
      busc_NumeroNota();
      
      /////////////////////////////////////////////////////////
      findUltimaChave();
          function  findUltimaChave(){
                RaqBoleta.findOne({'numberChave>':0},{numberChave:1})
                        .sort({numberChave:-1})
                        .then((result)=>{
                            console.log(' 1745 numeroBol');
                            console.log('________________________________________')
                            console.log(result);
                            if(result==null){
                                numeroBol=1
                            }else{
                               numeroBol=result.numberChave;
                               numeroBol++
                            }
                            console.log('');
                            console.log('________________________________________')
                        })
                        .catch((er)=>{
                           console.log(er)
                        })
                  }        
      // registro para ao acrescentar r++ podemos incluir no plano de conta a cliente novo.
      async function busc_ParametroCtaCliente(pessoaContabil){
            //////////////////////////////////////////////////////////
            console.log('[ 1434 ]',pessoaContabil)
            let  palavraChave;
            if (pessoaContabil==='Fabricante'){
              palavraChave="fornecedorFabricante";
            }else if(pessoaContabil==='Revenda'){
              palavraChave='fornecedorrevenda'
            } 
            ///////////////////////////////
            console.log('pessoa => ',palavraChave)
            // Pega o parametro e em seguida busca o último número para acrescentar mais 1.
            await RaqPlano.find({'parametros.params_parametro':palavraChave})
                    .then((result)=>{
                      console.log('_______________________________');
                      [result]=result;
                      let vetor=result.parametros;
                      vetor=vetor.params_numeroconta;
                      console.log('1450',result);
                      console.log('');
                      console.log(vetor)
                      console.log('___________33__________________');
                      // Com o parametro na mão acha o último registro e acrescenta + 1
                      RaqPlano.find({'conta.cta_vetor':vetor})
                              .sort({'conta.cta_numero':-1})
                              .limit(1)
                              .then((resp)=>{
                                  console.log(resp)
                                  let W=resp[0]
                                  W=W.conta;
                                  let n=parseInt(W.cta_numero);
                                  n++;
                                  NumeroCtaCliente=n;
                                  console.log('Cliente ==> ',NumeroCtaCliente);
                                  console.log('_id Cliente => ',n_Id);
                                  ////////////////////////////////////////////////
                                  RaqClient.updateOne(
                                                    {_id:n_Id},
                                                    {
                                                      $set:{
                                                             "contabil.numeroLoja":NumeroLoja,
                                                             "contabil.cta":NumeroCtaCliente,
                                                            }
                                                    },
                                                    { upsert: true }
                                            )
                                            .then((result)=>{
                                                console.log(' 1475',result);
                                                console.log('_______________________________');
                                                let texto=NumeroCtaCliente.toString();
                                                let vetor=texto.substring(0,6);
                                                ////////////////////////////////////////////
                                                RaqPlano.insertMany({
                                                              numberChave:numeroBol,
                                                              data:data,
                                                              idloja:NumeroLoja,
                                                              operador:"default",
                                                               conta:{
                                                                    cta_vetor:vetor,
                                                                    cta_nome:NomeCliente,
                                                                    cta_numero:NumeroCtaCliente
                                                                }   
                                                        })
                                                        .then((result)=>{
                                                           console.log(' [ 1494 ]',result)
                                                        })
                                                        .catch((er)=>{
                                                          console.log(er)
                                                        })
                                            })
                                            .catch((er)=>{
                                                 console.log(er)
                                            })
                              })
                              .catch((err)=>{
                                  console.log(err)
                              })
                    })
                    .catch((er)=>{
                      console.log(er)
                    })
      } 
    
      async function busc_ParametroReceita(){
          console.log('{ parametro receita }')
          let f=1;
          let palavraChave;
          if (f==1){
            palavraChave='vendaVista'
          }else if(f==2){
            palavraChave='vendaPrazo'
          }   
          console.log(' ==> ', palavraChave);
          console.log('');
          await RaqPlano.find({'parametros.params_parametro':palavraChave})
                        .then((result)=>{
                            console.log("");
                            [result]=result;
                            let vetor=result.parametros;
                            vetor=vetor.params_numeroconta;
                            console.log('_____________________________');
                            ////////////////////////////////////
                            RaqPlano.find({'conta.cta_vetor':vetor})
                                    .sort({'conta.cta_numero':-1})
                                    .limit(1)
                                    .then((resp)=>{
                                        let W=resp[0];
                                        console.log('------------------------------')
                                        W=W.conta;
                                        let n=parseInt(W.cta_numero);
                                        n++;
                                        NumeroCtaReceita=n;
                                        console.log('_____________________________________');
                                        console.log(' Receitas =>  ',NumeroCtaReceita);
                                        console.log('');
                                    })
                                    .catch((err)=>{
                                        console.log(err)
                                    })
                        })
                        .catch((er)=>{
                           console.log(er)
                        })
      }

      async function busc_ParametroEstoque(){
            let   palavraChave='estoqueRevenda'
            //////////////////////////////////////////////////////////   
            await RaqPlano.find({'parametros.params_parametro':palavraChave})
                        .then((result)=>{
                          console.log('_______________________________');
                          [result]=result;
                          let vetor=result.parametros;
                          vetor=vetor.params_numeroconta;
                          console.log('_____________________________');
                          RaqPlano.find({'conta.cta_vetor':vetor})
                                  .sort({'conta.cta_numero':-1})
                                  .limit(1)
                                  .then((resp)=>{
                                      console.log(resp)
                                      let W=resp[0]
                                      console.log('------------------------------')
                                      W=W.conta;
                                      let n=parseInt(W.cta_numero);
                                      n++;
                                      NumeroCtaEstoque=n;
                                      console.log('_______________________________________');
                                      console.log(' estoque =>  ',NumeroCtaEstoque);
                                      console.log('');
                                  })
                                  .catch((err)=>{
                                      console.log(err)
                                  })
                        })
                        .catch((er)=>{
                          console.log(er)
                        })
      }

      async function busc_ParametroDespesaEstoque(){
            let   palavraChave='estoqueDespesa';
            console.log(' [ paramentro Despesas Estoque  ]')
            //////////////////////////////////////////////////////////   
            await  RaqPlano.find({'parametros.params_parametro':palavraChave})
                        .then((result)=>{
                          console.log('_______________________________');
                          [result]=result;
                          let vetor=result.parametros;
                          vetor=vetor.params_numeroconta;
                          console.log('_____________________________');
                          RaqPlano.find({'conta.cta_vetor':vetor})
                                  .sort({'conta.cta_numero':-1})
                                  .limit(1)
                                  .then((resp)=>{
                                      let W=resp[0]
                                      console.log('------------------------------')
                                      W=W.conta;
                                      let n=parseInt(W.cta_numero);
                                      n++;
                                      NumeroCtaDespesasEstoque=n;
                                      console.log(' Despesas Estoque =>  ',NumeroCtaDespesasEstoque)
                                  })
                                  .catch((err)=>{
                                      console.log(err)
                                  })
                        })
                        .catch((er)=>{
                          console.log(er)
                        })
      }

      async function busc_NumeroNota(){
            console.log('');
            console.log('buscUltimoNumero');
            console.log('');
            await  Pedido.aggregate(
                                  [        
                                    {
                                      $group : {
                                        _id :  null ,
                                        max :{ $max: "$numberNota" }
                                                }
                                    }
                                  ]
                                )
                    .then((g)=>{
                        // COM NÚMERO NA MÃO FAREMOS A EDIÇÃO DA NOTA
                        valormax=g[0].max;
                        valormax++;
                        fecha_nota(valormax)
                    })
                    .catch((err)=>{
                      console.log(err);
                    })
      }

     async function fecha_nota(valormax){
              console.log('')
              console.log('fecha_nota');
              console.log('');
              await  Pedido.updateMany({
                            numberNota:0,
                            vendedor:nomeVendedor,
                            },
                            {
                              numberNota:valormax,
                              posicao:"F",
                            }
                          )
                          .then((result)=>{
                              console.log(' 1661 ',result);
                              console.log('');
                              console.log(result.modifiedCount)
                              result.modifiedCount=1;
                              if (result.modifiedCount==1){
                                  nNota=valormax;
                                  // AGORA QUE JÁ EDITOU A NOTA VAMOS GRAVAR A BOLETA CONTABIL => CRÉDITO/DÉBITO
                                  Calc_ValordosItens(nNota);
                              }
                          })
                          .catch((err)=>{
                            console.log(err);
                          })
      }

      function Calc_ValordosItens(nNota){
            console.log('');
            console.log('calcula valor dos itens');
            Pedido.findOne(
                             {numberNota:nNota}
                        )
                        .then((result)=>{
                            console.log('');
                            console.log(' [ 1674 ]',result);
                            console.log('');
                            let Itens=result.itens;
                            let c=Itens.length;
                            valorTotal=0;
                            for(let j=0;j<c;j++){
                                  let q=Itens[j].qte;
                                  console.log(q);
                                  q=2;
                                  let v=Itens[j].venda;
                                  console.log(v)
                                  let SomaItem=(q*v);
                                  console.log(' [ 1694 ]________')
                                  console.log('');
                                  console.log(SomaItem)
                                  valorTotal=valorTotal + SomaItem
                                  console.log('_____________________________________');
                                  console.log('1674',valorTotal)
                            }
                            gravaBoleta(valorTotal)
                        })
                        .catch((er)=>{
                            console.log(' [ 1700 ]',er)
                        })
      }
           
      function gravaBoleta(n){
          let valorTot=n
          console.log('inicia gravaBoleta',n)
          
          /////////////////////////////////////////////////////////////////////////          
          grava_cliente_vendas();
          ///////////////////////////////////////////////////////
          function grava_cliente_vendas(valorTotal){
                  RaqBoleta.insertMany
                  (
                    {
                      numberChave:numeroBol,
                      data:data,
                      parametros:[
                          {conta:'receita'},
                          {conta:'ativo'}
                      ],
                      boleta:{
                                    credito:
                                          {
                                            conta:NumeroCtaReceita,
                                            nomeConta:'vendas vista',
                                            historico:"nota fiscal : " + valormax,
                                            valor: - valorTot,
                                          }                                                       
                                    ,
                                    debito:
                                          {
                                            conta:NumeroCtaCliente,
                                            nomeConta:NomeCliente,
                                            historico:"nota fiscal => " + valormax,
                                            valor:valorTot,
                                          }  
                                    ,
                                 },
                      operacao:[
                        'vendas'
                      ],
                      chaClose:100,      
                    }
                  )
                  .then((result)=>{
                      console.log(result);
                      add_fluxo()
                      
                  })
                  .catch((er)=>{
                    console.log(er)
                  })
                } 
      }  
     
      function add_fluxo(){
        console.log('');
        console.log('passando no fluxo'); 
        let dataAtual=data;
        console.log('++++++++++++++++++++++++++++++++++++++');
        console.log(dataSaida)
        console.log('++++++++++++++++++++++++++++++++++++++')
        console.log('');
        console.log('______________________________________');
        console.log('');
        console.log('');
        console.log('______________________________________');
        let nrParcelas=condicao;
        let vrParcela;
        let nrdia=0;    
        for (let j=0;j<nrParcelas;j++){
            vrParcela=(valorTotal/nrParcelas);
             nrdia=nrdia +30
             ////////////////////////////////////////////////////////////
             async function addDays(date, days) {
                const novaDate = new Date(date);
                novaDate.setDate(date.getDate() + days);
                console.log('');
                console.log(' 1838 ==> ',novaDate);
                console.log('');
                let novDate=novaDate.toISOString();
                console.log(novDate.substring(0,10))
                await gravaParcela(vrParcela,novDate)
                return novDate;
            }
          
            // Get the current date
            const todayDate = new Date();
          
            // Number of days that we want to add to the current date
            const days = nrdia;
          
            // Function call to add days
            const newDate = addDays(todayDate, days);    
        }

       async function gravaParcela(vrParcela,novaDate){
              await   RaqFluxo.insertMany
                          (
                            {
                              numberChave:numeroBol,
                              parametros:[
                                  {conta:'receita'},
                                  {conta:'ativo'}
                              ],
                              fluxo:
                                      { 
                                          chave:numeroBol,
                                          data:data,
                                          historico:'nota fiscal  :' + nNota + " - " + NomeCliente,
                                          posicao:5,
                                          numero_conta:NumeroCtaCliente,
                                          nome_conta:NomeCliente,
                                          numero_cpartida:'1001',
                                          nome_cpartida:'1001',
                                          vencimento:novaDate,
                                          valor:vrParcela.substring(0,5),
                                          pagamento:'00/00/0000',
                                          observacao:'nenhuma'
                                      }                                                       
                            })
                            .then((result)=>{
                              console.log('1811',result);
                              console.log('');
                              let nNota=1000;
                              
                            }) 
                            .catch((er)=>{
                              console.log(er)
                            }) 
        }
        
      }
     // res.render("_cooperado/sample/raqsystem/vendas/vendas-notafiscal_impress",{layout:'lojista/templete3.handlebars',codigo:nNota})
})

router.get("/buscaPendente/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 1905 ] ');
    console.log('');
    console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
    console.log(' origem route : route/_sample/raq/raq-rotinas/buscaPendente/:id');
    console.log(' Obs : acessar relatórios de vendas.');
    console.log('');
    console.log(' destino : abre a views de relatórios de vendas');
    console.log('');
    let corpo=req.params.id;
    let l=corpo.length;
    console.log(corpo)
    let pos=corpo.search(":::");
    let comprador=corpo.substring(0,pos);
    let pedido=corpo.substring((pos+3),l);
    console.log('___________________________________________');
    console.log(' comprador :', comprador)
    console.log(' pedido :', pedido);
    console.log('');
    try{
        //return
        Pedido.findOne({
                        comprador:comprador,
                        numberPedido:pedido,
                        posicao:"P",
                    })
                    .then((result)=>{
                      console.log('_____________________________________');
                      console.log(result);
                      console.log('result => ',result)
                      let Passa=[];
                      if (result==null){
                           Passa.push(null) 
                           res.send(Passa);
                      }else{
                          console.log('');
                          Passa.push(result);
                          console.log(result.numberFornec);
                          Fornecedor.findOne({_id:result.numberFornec})
                                  .then((resposta)=>{
                                    Passa.push(resposta)
                                    res.send(Passa)
                                  })
                                  .catch((er)=>{
                                    console.log(er)
                                  })
                          console.log('_____________________________________');
                   }
                    })
                    .catch((e)=>{
                      console.log(e)
                    })           
      }catch(e){
        console.log(e);
      }
})

router.get("/buscaImg/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 1469 ] ');
    console.log('');
    console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
    console.log(' origem route : route/_sample/raq/raq-rotinas/buscaImg/:id');
    console.log(' Obs : acessar relatórios de vendas.');
    console.log('');
    console.log(' destino : abre a views de relatórios de vendas');
    console.log('');
    let idProduto=req.params.id;
    Sample.findOne({_id:idProduto},{pageurl:1})
          .then((result)=>{
            console.log('1479 => ',result)
            res.send(result);
          })
          .catch((err)=>{
            console.log(err)
          })

})

router.get("/addField/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 1817 ] ');
    console.log('');
    console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
    console.log(' origem route : route/_sample/raq/raq-rotinas/addField/:id');
    console.log(' Obs : editar os campos dos produto mconstrução.');
    console.log('');
    console.log(' destino : permanece em vendas-head.handlebars');
    console.log('');
    console.log(req.params)
    let idlojista=req.params.id;
    console.log(idlojista);
   // return
    Sample.updateMany(
              {loja_id:idlojista},
              {
                $set:{
                 qte_negativa:0,
                 qte_reservada:0,
                }
              },{ upsert: true }
          )
          .then((result)=>{
             console.log('lengh ==> ',result.length)
             console.log(result)
          })
          .catch((er)=>{
             console.log(er)
          })
})

router.get("/chekaStoque/:id",async(req,res)=>{
    console.log('');
    console.log(' [ 1523 ] ');
    console.log('');
    console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
    console.log(' origem route : route/_sample/raq/raq-rotinas/chekaStoque/:id');
    console.log(' Obs : editar os campos dos produto mconstrução.');
    console.log('');
    console.log(' destino : permanece em vendas-head.handlebars');
    console.log('');
    console.log(req.params)
    let idproduto=req.params.id;
    console.log(idproduto);
    Sample.findOne({_id:idproduto},{qte:1,_id:0})
          .then((resp)=>{
             console.log(resp);
             res.send(resp)
          })
          .catch((er)=>{
             console.log(er)
          })
})

router.get("/buscNumeroContaNova/:id",async(req,res)=>{
  console.log(' [ 1979 ] ');
  console.log('');
  console.log(' origem views : views/_cooperado/sample/raqsystem/vendas.handlebars');
  console.log(' origem route : route/_sample/raq/raq-rotinas/buscNumeroContaNova/:id');
  console.log(' Obs : editar os campos dos produto mconstrução.');
  console.log('');
  console.log(' destino : permanece em vendas-head.handlebars');
  console.log('');
  let palavra=req.params.id;
  console.log(palavra)
  RaqPlano.find({'conta.cta_vetor':'401'}
                    
                  )
                .then((g)=>{
                  console.log(g.length)
                  let l=g.length;
                  g=g.sort();
                  let valormax;
                  for (let i=0;i<l;i++){
                    g=g[0];
                    valormax=g.conta.cta_numero;
                  }
                  // COM NÚMERO NA MÃO FEREMOS A EDIÇÃO DA NOTA
                   
                  valormax++;
                   
                  //  console.log('valormax',valormax)
                    let npalavra={};
                    npalavra={
                              n:valormax 
                    }
                    res.send(npalavra);
                })
                .catch((err)=>{
                     console.log(err);
                })
})

module.exports = router;

//function insertNota(result){
//  //Com os dados do produto vamos inserir o primeiro iten da nota
//  [result]=result
//  let a=result.codigo;
//  let b=result.descricao;
//  let c=result.precocusto;
//  let idex=result._id
//  if(c==undefined){
//    c=0;
//  }
//  let d=result.precoprazo;
//  const query = { numberNota: 0};
//  const insert = { $set:{
//                        itens:[
//                                  {
//                                  codigoProduto:a,
//                                  qte: 0,
//                                  descricao:b,
//                                  custo:c,
//                                  venda:d,  
//                                  }
//                              ],
//                        numberNota:1,      
//                        numberClient:numberClient,
//                        nomeClient:'pedro', 
//                        cpfCnpj:'23456',
//                        estado:'Espírito Santo',
//                        cidadeClient:"Vila Velha",
//                        bairroClient:"Itapoan",
//                        condicaoPg:88,
//                        posicao:2,
//                        idProduto:idex
//                        }
//                  }
//  const options = { upsert: true };
//  try{
//  // Inserindo o primeiro item
// 
//  RaqNotaSaida.updateOne(query, insert, options)
//            .then((result)=>{
//              // buscando o item gravado para passar para tela
//              RaqNotaSaida.find({numberNota:1})
//                          .then((resp)=>{
//                              res.send(resp)
//                          })
//                          .catch((error)=>{
//                              console.log(error)
//                          })
//            })
//            .catch((err)=>{
//                console.log(' [ 1088 ] ',err)
//            })   ;
//  }catch(e){
//    console.log(e)
//  }
//}