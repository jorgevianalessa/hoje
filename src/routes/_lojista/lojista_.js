const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
////////////////////////////////////////////////
const aws=require('@aws-sdk/client-s3')
const { S3 } =require('@aws-sdk/client-s3')
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config({path:'./.env'})
////////////////////////////////////////////////
const { eAdmin } = require("../../../helpers/eAdmin");
require('../../models/lojista');
////////////////////////////////////////////////
const { upload } = require('../../libs/multer');
const { uploadFile,getFiles } = require('../../controllers/index.controllers');

require('../../models/lojista');
const Lojista = mongoose.model('lojista');

require('../../models/fornecedor');
const Fornecedor = mongoose.model('fornec');

require('../../models/sample_roupa');
const Roupa = mongoose.model('sample_roupa');

const csv=require('csvtojson');
const path =require('path');

router.post('/cooperados',(req,res)=>{
    ////////////////////////////////////////////////////////////////////////
    // Confere o login do cooperado
    ////////////////////////////////////////////////////////////////////////
    console.log('');
    console.log('___________________________________________');
    console.log('');
    console.log(" [ 37 ]");
    console.log(' origem views : _cooperado/usuario/loginloja');
    console.log(' origem route : /_lojista/lojista.js/cooperados');
    console.log(' obs : ');
    console.log('');
    console.log(' destino : _cooperado/admin/admincooperados');
    console.log('____________________________________________');
    console.log('');
    let emae=req.body.email;
    let senha=req.body.senha;
    let errors = []
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        errors.push({ error : "Erro: Necessário preencher o email!"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        errors.push({ error : "Erro: Necessário colocar a senha!"})
      }

      if(req.body.senha.length>6 || req.body.senha.length<6){
        errors.push({ error : "Erro: A senha não pode ser de comprimento diferente de 6!"})
      }
      
    if(errors.length>0){
        console.log('os erros',errors)
        res.render("usuario/loginloja",{ layout:'admin.handlebars',errors:errors})
   }else{
       try{
            // vai conferir se senha está correta
            password=req.body.senha;
            const salt = bcrypt.genSaltSync(10)
            password= bcrypt.hashSync(password,salt)
                  bcrypt.genSalt(10,(erro,salt)=>{
                    bcrypt.hash(senha,salt,(erro,hash)=>{
                      return senha
                    })
                  })
                  // Se não tiver error então segue em frente
                  console.log(' [ 75 ]',senha)
                  Lojista.findOne({email:emae})
                            .then((r)=>{
                                 console.log('resultado pesquisa para ',emae,' : ',r)
                                 console.log(typeof(r))
                                 if (r==="null"){
                                    console.log('Não foi encontrado o lojista')
                                    return
                                 }else{
                                    let Sub={};
                                    let L={};
                                    let Seg={};
                                    let [segmento]=r.segmento;
                                    L=segmento.titulo;
                                    let template=r.template;
                                    Seg=segmento;
                                    let W=segmento.sub_titulo
                                    let n=W.length;
                                    for (d=0;d<n;d++){
                                        Sub={
                                            sub:W[d],
                                        }
                                    }
                                    bcrypt.compare(senha,r.senha,(erro,correta) => {
                                            if(correta){
                                                console.log('')
                                                console.log('_______________________________________________________')
                                                console.log('')
                                                console.log('a senha estando correta ,então')
                                                console.log('vai para: view/_cooperado/admin/admincooperados/participe')
                                                console.log('')
                                                console.log('_______________________________________________________')
                                                console.log('')
                                                if (template==0){
                                                   res.render("_cooperado/admin/admincooperados",{ layout:'lojista/admin-loja.handlebars',cooperado:r,segmento:Seg}) 
                                                }else if(template==1){
                                                   res.render("_cooperado/admin/sample-roupas",{ layout:'lojista/admin-loja.handlebars',cooperado:r,segmento:Seg}) 
                                                }else if(template==2){
                                                   res.render("_cooperado/admin/sample-mconstrucao",{ layout:'lojista/admin-loja.handlebars',cooperado:r,segmento:Seg})    
                                                }else if(template==4){
                                                  res.render("_cooperado/admin/raq-system",{ layout:'lojista/admin-loja.handlebars',cooperado:r,segmento:Seg})    
                                               }    
                                            }else{
                                                console.log("Senha não confere?")
                                                if(!r || r==undefined){
                                                    console.log("Senha não confere?")
                                                    console.log("algo está errado")
                                                    res.render("usuario/loginloja",{ layout:'admin.handlebars',errors:r})
                                                }else{

                                                }
                                            }
                                    })
                                }
                            })   
                            .catch((e)=>{
                                console.log(e)
                            })
        }
        catch(err){
          console.log(err)
        }
    }
})

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
  console.log('');
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  console.log('');
  console.log(req.params)
  console.log('');
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  let fabricante=Object.values(req.params);
  fabricante=fabricante[0];
  //................................................
  let pos=fabricante.search(":=");
  let IdEmpresa=fabricante.substr(pos+2);
  console.log('id loja ==> ',IdEmpresa);

  fabricante=fabricante.substring(0,pos);
  console.log('fabricante : ',  fabricante)
  
  
  let idex=IdEmpresa;
  let letra=fabricante;
  let trocaletra=letra.replace("A",".")
  let result = trocaletra.replace("A", ".");
  result=result.replace("B","/");
  result=result.replace("C","-");
  console.log('');
  console.log(' result => ',result)
  //.........................................
  let id;
  let cnpj;
  let w={}
  await Fornecedor.findOne(
                        {
                          'dados.cnpj':result,
                          'Q_lojistas.$.lojaid':idex
                        },
                        {'Q_lojistas.lojaid':1,'dados.cnpj':1}
                       )
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

router.post('/produt_import-produto-lojista',async(req,res)=>{
  console.log('');
  console.log('atualizado 13/01/24');
  console.log('____________________________________________________________');
  console.log(' [ 166 ] ');
  console.log(' origem views : views/_cooperado/admin/admincooperados.handlebars');
  console.log(' origem route : routes/_lojista/lojista/post:produt_import-produto-lojista ');
  console.log('                layout:"lojista/admin-loja.handlebars" ');
  console.log(' obs : busca a partir do menu:_cooperados => importação de itens ');
  console.log('       pega dados do lojista e seus fornecedores para importar produtos ')
  console.log('');
  console.log(' destino : views/_cooperado/lojista/importando-lista');
  console.log('____________________________________________________________');
  console.log('');
  let razao;
  let cnpjloja;
  let dadosClient;
  let idx=req.body.idd;
  idx=idx.trim();
  Lojista.findOne({_id:idx})
         .then((response)=>{
             console.log('[ dados do lojista ]');
             razao=response.razao;
             cnpjloja=response.cnpj;
             dadosClient=response
             buscaFornec(idx);
         })
         .catch((err)=>{
           console.log(err)
         })
    ////////////////////////////////////////////////////////////////////          
    //..................................................................
    function buscaFornec(idx){
      console.log('');
      console.log('razao do lojista : ',razao)
      console.log('razao do idx : ',idx)
      console.log('');
      //////////////////////////////////////////////////////////////////
      Fornecedor.find({'lojista.lojaid':`${idx}`},{razao:1,cnpj:1,marca:1,_id:1})
            .then((resp)=>{
                 console.log('número de fornecedores:',resp.length)
                 console.log('______________________________________________')
                 console.log('resultado da busca de fornecedores',resp);
                 console.log('');
                 console.log('fornecedors pertencente ao lojista : ' + `${razao}` )
                 console.log('');
                 res.render("_cooperado/lojista/roupas/roupa_importando-lista",{ layout:'lojista/admin-loja.handlebars',fornecedor:resp,client:dadosClient});
            })
            .catch((er)=>{
                 console.log(er)
            })
    }

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
                        await Roupa.insertMany({
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
                                          Roupa.find({cnpjfornec:`${fornecCnpj}`,cnpjloja:`${lojaCnpj}`})
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

router.post('/buscar-fornecedores',async(req,res)=>{
    // Essa rotina passa os fornecedores para a caixa select e o título da page
    console.log('');
    console.log('_________________________________________________________');
    console.log('');
    console.log('   (    revisado : 24/09/23    )                     ');
    console.log('   [ 432]                                    ');
    console.log('  origem views: views/_cooperados/admin/admincooperados.handlebars');
    console.log('  origem : route/_lojista/roupa_/buscar-fornecedores.handlebars ');
    console.log('');
    console.log('   Essa rotina pega todos os fornecedores vinculados a client lojista ');
    console.log('   ');
    console.log('');
    console.log('   destino : views/partials/roupa/_sidebar-lista-fornec.handlebars');
    console.log('   Faz conjunto com "roupa_listar-temporario ')
    console.log('___________________________________________________________');
    console.log('');
    console.log(' retorno do req.body : ',req.body);
    console.log('');
    let ClientId=req.body.idlistaTemporario;
    ClientId=ClientId.trim();
    let fornecCnpj;
    let razao;
    ///////////////////////////////////////////////////////////////////////////////////////
    Lojista.findOne({_id:`${ClientId}`})
          .then((resposta)=>{
                if (!resposta || resposta===undefined || resposta==='[]' || resposta===null){
                    console.log("Não cadastro deste lojista!")
                    res.render("_cooperado/lojista/roupas/roupa_listar-temporarioVazio",{ layout:'roupaLista.handlebars',idx:lojaId,fornc:fornecCnpj,razao:razao});
                }else{
                   razao=resposta.razao;
                   console.log('');
                   console.log('razao social da  consulta : ',razao);
                   console.log('id da lojista :',ClientId);
                   console.log('');
                   Fornecedor.find({'lojista.lojaid':ClientId},{marca:1,cnpj:1})
                             .then((resp)=>{
                                console.log('relação  de fornecedores',resp)
                                console.log('');
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
  //////////////////////////////////////////////////////////////////
})

router.post('/buscar_produtos_fornecSelect/:id',async(req,res)=>{
    console.log('');
    console.log('______________________________________');
    console.log('');
    console.log(' [ 483 ]');
    console.log(' origem views :views/_cooperado/lojista/roupa_/roupa_listar-temporario.handlebars');
    console.log(' origem route : routes/_lojista/lojista/buscar_produto_temp/:id');
    console.log(' Obs : busca os produtos relativos ao fornecedor selecionado ao');
    console.log('       lojista  ')
    console.log('');
    console.log(' destino : views/_cooperado/lojista/lista-temporario');
    console.log('');
    console.log("___________________________________");
    console.log("");
    let nucleo;
    nucleo=req.params;
    console.log("formata o id do fornecedor e do lojista");
    console.log("___________________________________");
    nucleo=nucleo.id;
    let pos=nucleo.search(":=");
    let idFornec=nucleo.substring(0,pos);
    idFornec=idFornec.toString();
    let restante=nucleo.substring(pos+2);
    let idLoja=restante.toString();
    //........................................................
    console.log(' id do fornec : ',idFornec);
    console.log(' id do loja : ',idLoja)
    console.log("______________________________________");
    ////////////////////////////////////////////////////////// 
        Roupa.find(
                {
                  $and:[
                        { fornec_id:{$eq:idFornec}},{lojaid_id:{$eq:idLoja}},
                        ]
                })
               .then((result)=>{
                    if(!result  ||  result===null || result==='[]' || result===undefined){
                        console.log("Não há estoque disponível!")
                        let vr={};
                        vr={ vr:0 };
                        res.send(vr)
                    }else{
                        console.log('');
                        console.log('_________________________________');
                        console.log(' [ 526 ] ');
                        let l=result.length;
                        let vitrine=[];
                        let cor;
                        let cores=[];
                        console.log('l : ',l)
                        for (let i=0;i<l;i++){
                            console.log('');
                            console.log('resultado',result[i])
                            console.log( ' I = ',i)
                            console.log('_______________________________________________')
                            cor=result[i].cores;
                            console.log('cores  ',cor)
                            console.log('_______________________________________________')
                            vitrine.push(result[i],cor);
                            cores.push(cor)
                        }
                        ///////////////////////////////////////////////////
                        console.log('_______________________________________________')
                        console.log(vitrine)
                        console.log('_______________________________________________')
                       // return
                        res.send(result)                 
                    }
               })
               .catch((err)=>{
                    console.log(err)
               })
               //////////////////////////////////////////////////////////
})

router.get('/visualizar-vitrine/:id',async(req,res)=>{
  console.log('');
  console.log('req params [ 560 ]',req.params);
  console.log('______________________________________________________________________');
  console.log('');
  console.log('  [ 563 ]                            ')      ;
  console.log('  origem view  : views/_cooperado/lojista/lista-temporario.handlebars ');
  console.log('')
  console.log('  origem route : route/_lojista/roupa_/visualizar-vitrine-temp');
  console.log('  obs : Vem da lista de produto temporário ');
  console.log('');
  console.log('  Essa rotina publica as cores ,os tamanho e a qte do produto');
  console.log('  selecionado em lista de produto temporários.        ');
  console.log('  destino : views/_cooperado/lojista/produto_visualizar ');
  console.log('______________________________________________________________________');
  console.log('');
  //...........................................
  let nucleo=req.params;
  console.log('__________________________________');
  console.log(nucleo);
  console.log('___________________________________');
  let idProduto;
  idProduto=nucleo.id;
  console.log('');
  console.log('____________________________________');
  console.log('linha 581 ====> ',idProduto);
  //....................................................................
  // Tenho o código do produto
    await Roupa.findOne({_id:`${idProduto}`})
                  .then((vitrine)=>{
                        console.log('');
                       // produto=vitrine;
                        console.log('',vitrine);
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

router.post('/editandoVitrine-novo',async(req,res)=>{
  console.log('');
  console.log('______________________________________');
  console.log('');
  console.log(' [ 585 ]');
  console.log(' origem views :views/_cooperado/lojista/roupa_visualizar_');
  console.log(' origem route : routes/_lojista/roupa/editandoVitrine-novo');
  console.log(' Obs : edita os elementos da nova vitrine');
  console.log('        ')
  console.log('');
  console.log(' destino : views/_cooperado/lojista/roupa_visualizar_');
  console.log('');
  console.log("___________________________________");
  console.log("");
  let nucleo;
  nucleo=req.body;
  console.log('nucleo : ',nucleo);
  let idproduto=nucleo.idproduto
  let descricao=nucleo.nameDescricao;
  let detalhe=nucleo.nameDetalhe;
  let tecido=nucleo.nameTecido;
  let artigo=nucleo.nameArtigo;
  await Roupa.updateMany(
               {_id:idproduto},
               { $set:
                      {
                         'descricao':`${descricao}`,
                         'complete':`${detalhe}`,
                         'tecido':`${tecido}`,
                         'artigo':`${artigo}`,
                      }
               }
              )
              .then((resp)=>{
                         Roupa.findOne({_id:`${idproduto}`})
                                  .then((vitrine)=>{
                                    console.log('');
                                    console.log('',vitrine);
                                    //produto=resp;
                                    console.log('');
                                    /////////////////////////////////////////////////////////////////
                                    //console.log('valor do produto : ',produto) 
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
              .catch((e)=>{
                 console.log(e)
              })
})

router.post('/upload/',upload,uploadFile);

router.post('/files',getFiles);

router.post('/tabelacores-home',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 686 ]');
  console.log(' origem views :views/_cooperado/lojista/roupa/roupa_add-homefoto-homecor.handlebars');
  console.log('');
  console.log(' ___________________________________');
  console.log('');
  let nucleo=req.body;
  console.log('');
  console.log(' [ nucleo ] ',nucleo);
  console.log('');
  let idproduto=nucleo.idVitrine;
  let idcor=nucleo.idExtensao;
  let nameCor=nucleo.CodigoCor
  //console.log('id_vitrine',idproduto)
  Roupa.findOne({_id:idproduto})
           .then((vitrine)=>{
               //console.log('vitrine : ',vitrine);
               console.log('') ;
               let cor=vitrine.cores;
               [cor]=cor;
               console.log('valor de url',cor)
               let corUrl=cor.urlfront;
               console.log('valor url =>',corUrl)
               let corId=cor._id;
               console.log('vr de J',corId)
               res.render("_cooperado/lojista/roupas/roupa_insere-cores-home",{ layout:'lojista/roupa-table-cor-home.handlebars',vitrine:vitrine,corUrl:corUrl,corId:corId});
             
           })   
           .catch((err)=>{
             console.log(err)
           })
})

router.post('/gravando-cor-home',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 722 ]');
  console.log(' origem views :views/partials/roupa/_header-table-cor');
  console.log(' origem route : route/_lojista/roupa/gravando-cor-home => action="/roupa/editando-cor-home');
  console.log(' obs : Atualiza a extensao com a cor');
  console.log('');
  console.log(' destino : ??????');
  console.log(' ___________________________________');
  console.log('');
  let corpo;
  corpo=req.body;
  console.log('cor Home',req.body)
  let cor=corpo.nameCorSelected;
  let nameCor=corpo.nameIdCorSelected;
  console.log(nameCor)
  //return
  let idProduto=corpo.nameIdProdutoSelected;
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  let rgb=cor.substr(4);
  let l=rgb.length;
  rgb=rgb.slice(0,(l-1))
  // Agora pegamos o primeiro valor da cor "RED"
  let p=rgb.search(',');
  let R=rgb.slice(0,p);
  let r=R.toString(16);
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::
  // Em seguida eliminamos os parametros da cor "RED"
  rgb=rgb.substr(p+1);
  // Agora buscamos os valores "GREEN"
  p=rgb.search(',');
  let G=rgb.slice(0,p);
  let g=G.toString(16);
  // Depois eleiminamos os parametros da cor "GREEN"
  rgb=rgb.substr(p)
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
  // E por fim pagamos os valores da cor "BLUE"
  p=rgb.length;
  let B=rgb.slice(1,p)
  let b=B.toString(16);
  ////////////////////////////////////
  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
          const hex = x.toString(16)
          return hex.length === 1 ? '0' + hex : hex
  }).join('');
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const A= rgbToHex(parseInt(r),parseInt(g),parseInt(b))
  console.log('number cor nova',A)
  console.log('');
  console.log(' idCor :',nameCor);
  console.log('');
  console.log(' idProduto : ',idProduto);
  // 
  console.log('');
  console.log('________________________________________________________');
  console.log('');
  Roupa.updateOne(
                     {'cores.corback':`${nameCor}`},
                     {$set:
                            {'cores.$[].corback':A,
                             'cores.$[].corfront':A,
                             'cores.$[].corinput':A,
                             'cores.$[].fase':3,
                            }
                    
                    },
                    {upsert:false}
              )
              .then((result)=>{
                   console.log('');
                   console.log('______________________________');
                   console.log('result : ',result);
                   console.log('_______________________________');
                   //////////////////////////////////////////////////////////
                   Roupa.updateOne(
                                   {_id:idProduto},
                                   {$set:{
                                       ponto:3
                                   }
                                  } )
                         .then((result)=>{
                            console.log(result)
                            buscaEspecificacao()
                         })         
                         .catch((error)=>{
                           console.log(error)
                         })
                      })
                   ////////////////////////////////////////////////////////   
              .catch((err)=>{
                console.log(err)
              })
              /////////////////////////////////////////////////////
              function buscaEspecificacao(){
                         Roupa.findOne({_id:idProduto}
                              )
                              .then((vitrine)=>{
                                  console.log('vr vitrine',vitrine);
                                  let cores=vitrine.cores;
                                  [cores]=cores;
                                  console.log('cores : ', cores)
                                  /////////////////////////////////////////////
                                  let especificacao=cores.especificacao;
                                  [especificacao]=especificacao;
                                  console.log("especificacao :",especificacao);
                                  res.render("_cooperado/lojista/roupas/roupa_insere-especificacao",{ layout:'lojista/roupa-coloca-foto.handlebars',vitrine:vitrine,cores:cores,especificacao:especificacao});  
                                  
                              })             
                              .catch((er)=>{
                                console.log(er)
                              })
                            }                  
})

router.post('/editando-especificacao',async(req,res)=>{
  console.log('');
  console.log('__________________________________________');
  console.log('');
  console.log(' [ 815 ] ');
  console.log(' origem views : views/_cooperado/lojista/roupa-editando-size.handlebars');
  console.log(' origem route : route/_lojista/roupa/finalizando-extensao');
  console.log(' Obs : ');
  console.log('');
  console.log(' destino : ');
  console.log('');
  let nucleo=req.body;
  console.log('nucleo',nucleo)
  let idproduto=nucleo.nameIdProduto;
  let idcorfoto=nucleo.nameIdCor;
  console.log(idproduto);
  let tamanho=nucleo.nameTamanho;
  console.log('t',tamanho);
  let qte=nucleo.nameQte;
  console.log(qte);
  let custo=nucleo.nameCusto;
  let vista=nucleo.nameVista;
  let prazo=nucleo.namePrazo;
  let page=nucleo.namePage;
  //............................................
  ////////////////////////////////////////////////////////
  await Roupa.updateMany(
                         {
                       'cores._id':idcorfoto
                       },
             
                      { $set:{ 'cores.$.especificacao':[
                              {
                                    tamanho:`${tamanho}`,
                                    qte:parseInt(`${qte}`),
                                    precocusto:parseFloat(`${custo}`),
                                    precovista:parseFloat(`${vista}`),
                                    precoprazo:parseFloat(`${prazo}`),
                                    posicao:0,
                                    page:"default",
                              }
                           ],
                      },
                      },
                      {upsert:false}
                  )
         .then((result)=>{
              console.log('');
              console.log('resultado da alteração result  ',result);
              console.log('',result.modifiedCount);
              let n2=extensao.modifiedCount;
              console.log('vr de n2',n2)
              if (n2===1){
                  console.log('dentrooooo')
                  Roupa.updateOne(
                             {
                               'cores._id':idcorfoto
                            },
                            { $set:{ 'cores.fase':4,
                                  },
                             },
                             {upsert:false}
                             )
                             .then((result_fase)=>{
                                 console.log(result_fase)
                                 //////////////////////////////////////////////////////////
                                  Roupa.updateOne(
                                            {_id:idProduto},
                                            {$set:{
                                                    ponto:4
                                                  }
                                             }
                                        )
                                        .then((result)=>{
                                          console.log(result)
                                        })         
                                        .catch((error)=>{
                                          console.log(error)
                                        })
       //})
    ////////////////////////////////////////////////////////   
                                
                             })
                             .catch((e)=>{

                             })
              }               
              //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
              console.log('');
              console.log('___________________________________________________');
              console.log('');
              Roupa.findOne({_id:idproduto})
                       .then((vitrine)=>{
                                   // ................................................................
                                   console.log('');
                                   console.log('vitrine => ',vitrine)
                                   let cores=vitrine.cores;
                                   console.log('');
                                   console.log('_____________________________________________');
                                   console.log('Cores',cores);
                                   console.log('');
                                   [cores]=cores;
                                   console.log('');
                                   console.log('cores => ',cores);
                                   console.log('');
                                   let especificacao=cores.especificacao;
                                   [especificacao]=especificacao;
                                   res.render("_cooperado/lojista/roupas/roupa_insere-finalizado",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine,cores:cores,especificacao:especificacao});
                         })
                         .catch((e)=>{
                           console.log(e);
                         })
               /////////////////////////////////////////////////////
         })
         .catch((errr)=>{
            console.log(errr);
         }) 
         
         
});

router.post('/vis-detalhe-temp',async(req,res)=>{
  console.log('');
  console.log('req params [ 883 ] ',req.body)
  console.log('______________________________________________________________________')
  console.log('')
  console.log('  [ 886 ]                            ')      
  console.log('  origem view  : views/_cooperado/lojista/lista-temporario.handlebars ')               
  console.log('  origem route : route/_lojista/lojista/vis-detalhe-temp')
  console.log('  obs : Vem da lista de produto temporário ')
  console.log('');
  console.log('  Essa rotina publica as cores ,os tamanho e a qte do produto')
  console.log('  selecionado em lista de produto temporários.        ')
  console.log('  destino : views/_cooperado/lojista/produto_visualizar ');
  console.log('______________________________________________________________________')
  console.log('');
  //...........................................
  let nucleo=req.body;
  let idProduto;
  //......................................................................................
  if(nucleo==[] || nucleo==undefined || nucleo =='null'){
     console.log('gool!')
     idProduto=nucleo.idProduto
     console.log(idProduto)
  }else{
     idProduto=nucleo.idProduto;
  }
  console.log(' idProduto : ',idProduto)
  console.log('');
  console.log('____________________________________');
  console.log('');
  //.......................................
  let H={
     idproduto:idProduto
  };
  let NomeRazao;
  //....................................................................
  await Roupa.findOne({_id:`${idProduto}`}).sort({'produto.detalhes.corback':1})
                .then((vitrine)=>{
                   console.log(' vitrine : ',vitrine)
                   let loja_id=vitrine.loja_id;
                   console.log('[ 865 ]',loja_id)
                   //......................................................
                   Lojista.findOne({_id:loja_id},{'razao':1})
                          .then((resultado)=>{
                             console.log('mostra resultado',resultado)
                             NomeRazao=resultado.razao;
                             mostratudo(vitrine)
                          })
                          .catch((err)=>{
                              console.log(err)
                          })
                   //.....................................................
                   function  mostratudo(vitrine){
                       //let {produto}=resp;
                       let cores=vitrine.cores;
                       cores.sort(cores);
                       [cores]=cores;
                       /////////////////////////////////////////////////////////////////
                       console.log(' cores: ',cores) ;
                       let especificacao=cores.especificacao;
                       [especificacao]=especificacao
                       console.log('');
                       console.log('__________________________________________');
                       console.log('');
                       console.log('  Ainda dentro da rotina [ 943 ]');
                       console.log('  Pega os dados do produto selecionado');
                       console.log('  Pega os detalhes das cores e tamnho correspondente ao produto');
                       console.log('');
                       console.log('___________________________________________');
                       res.render("_cooperado/lojista/roupas/roupa_visualizar",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine,cores:cores,h:H,razao:NomeRazao,especificacao:especificacao});
                   }    
                   //................................................................................................                
          }) 
          .catch((er)=>{
            console.log(er)
          })
})

router.get('/visualizar/:id',async(req,res)=>{
  console.log('');
  console.log('______________________________________________________________________')
  console.log('')
  console.log('  [ 963 ]                            ')      
  console.log('  origem view  : views/partials/roupa/...')               
  console.log('  origem route : route/_lojista/lojista/roupa/visualizar')
  console.log('  obs : Vem de vários menus para visualizar o produto.')
  console.log('');
  console.log('  Essa rotina publica as cores ,os tamanho e a qte do produto')
  console.log('  selecionado em lista de produto temporários.        ')
  console.log('  destino : views/_cooperado/lojista/produto_visualizar ');
  console.log('______________________________________________________________________')
  console.log('');
  console.log('params : ',req.params)
  let produto_id=req.params.id;

  Roupa.findOne({_id:produto_id})
        .then((vitrine)=>{
          console.log('....................');
          console.log(' vitrine : ',vitrine);
          //return
          let cores=vitrine.cores;
          [cores]=cores;
          let especificacao=cores.especificacao;
          [especificacao]=especificacao;
          res.render("_cooperado/lojista/roupas/roupa_visualizar",{ layout:'lojista/roupa-coloca-foto.handlebars',vitrine:vitrine,cores:cores,especificacao:especificacao});  
        })
        .catch((err)=>{
           console.log(err);
        })
})

router.get('/adminloja_container/:id',async(req,res)=>{
  console.log('');
  console.log('______________________________________________________________________')
  console.log('')
  console.log('  [ 1063 ]                            ')      
  console.log('  origem view  : views/partials/roupa/...')               
  console.log('  origem route : route/_lojista/roupa/adminloja/:id')
  console.log('  obs : Vem de vários menus para visualizar o produto.')
  console.log('');
  console.log('  Essa rotina traz a tela para administração da loja')
  console.log('          ')
  console.log('  destino : views/_cooperado/templates/roupa-1.handlebars ');
  console.log('______________________________________________________________________')
  console.log('');
  console.log('params : ',req.params)
  let lojaId=req.params.id;
  
  Lojista.findOne({_id:lojaId})
                  .then((lojist)=>{
                    console.log('');
                    console.log('------------------------------------------');
                    let segment=lojist.segmento;
                    console.log(segment);
                    console.log('');
                    console.log(segment);
                    res.render("_cooperado/admin/admincooperados",{ layout:'lojista/admin-loja.handlebars',cooperado:lojist,segmento:segment}) 
                  })
                  .catch((error)=>{
                     console.log(error)
                  })

})

router.get('/adminloja/:id',async(req,res)=>{
  console.log('');
  console.log('______________________________________________________________________')
  console.log('')
  console.log('  [ 1096 ]                            ')      
  console.log('  origem view  : views/partials/roupa/...')               
  console.log('  origem route : route/_lojista/roupa/adminloja/:id')
  console.log('  obs : Vem de vários menus para visualizar o produto.')
  console.log('');
  console.log('  Essa rotina traz a tela para administração da loja')
  console.log('          ')
  console.log('  destino : views/_cooperado/templates/roupa-1.handlebars ');
  console.log('______________________________________________________________________')
  console.log('');
  console.log('params : ',req.params)
  let produto_id=req.params.id;
  let lojaId;
  Roupa.findOne({_id:produto_id},{loja_id:1})
        .then((vitrine)=>{
          console.log('vitrine',vitrine)
          lojaId=vitrine.loja_id
           Lojista.findOne({_id:lojaId})
                  .then((lojist)=>{
                    console.log('');
                    console.log('------------------------------------------');
                    let segment=lojist.segmento;
                    console.log(segment);
                    console.log('');
                    console.log(segment);
                    res.render("_cooperado/admin/admincooperados",{ layout:'lojista/admin-loja.handlebars',cooperado:lojist,segmento:segment}) 
                  })
                  .catch((error)=>{
                     console.log(error)
                  })
        })
        .catch((err)=>{
           console.log(err);
        })
})

router.get('/listatemporaria/:id',async(req,res)=>{
  console.log('');
  console.log('______________________________________________________________________')
  console.log('')
  console.log('  [ 1006 ]                            ')      
  console.log('  origem view  : views/partials/roupa/...')               
  console.log('  origem route : route/_lojista/lojista/roupa/visualizar')
  console.log('  obs : Vem de vários menus para visualizar o produto.')
  console.log('');
  console.log('  Essa rotina publica as cores ,os tamanho e a qte do produto')
  console.log('  selecionado em lista de produto temporários.        ')
  console.log('  destino : views/_cooperado/lojista/produto_visualizar ');
  console.log('______________________________________________________________________')
  console.log('');
  console.log('params : ',req.params)
  let produto_id=req.params.id;

  Roupa.findOne({_id:produto_id})
        .then((vitrine)=>{
          let cores=vitrine.cores;
          [cores]=cores;
          let especificacao=cores.especificacao;
          [especificacao]=especificacao;
          res.render("_cooperado/lojista/roupas/roupa_listar-temporario",{ layout:'lojista/roupaLista.handlebars',vitrine:vitrine,cores:cores,especificacao:especificacao});  
        })
        .catch((err)=>{
           console.log(err);
        })
})

router.post('/roupa-especificacao/:id',(req,res)=>{
  console.log('');
  console.log('____________________________________________________');
  console.log('');
  console.log('  [ 1088 ]                                            ');
  console.log('  origem views : views/_cooperado/lojista/roupas/produto_visualizar ');
  console.log('');
  console.log('  origem route : route/_lojista/lojista/buscacores/:id......');
  console.log('');
  console.log('  sub-origem   : function(carregar)fetch/buscacores "  ');
  console.log('  obs : completa a page edita-produto (vis-detalhe-temp =>[ 1537 ] ');
  console.log('');
  console.log('  destino : retorna valores para response/fetch/buscacores      ');
  console.log('');
  console.log('____________________________________________________');
  console.log('');
  let idProduto=req.params.id;
  console.log('');
  console.log(req.params);
  console.log('------------------------------------------------');
  console.log('idProduto :',idProduto)
  console.log('valor :',idProduto)
  //.........................................................
  Roupa.findOne({_id:idProduto},{cores:1})
          .then((vitrine)=>{
             //console.log(' vitrine ',vitrine)
             let cores=vitrine.cores;
             console.log('cores',cores)
             res.send(cores)
          })
          .catch((err)=>{
              console.log(err)
          })
})

router.post('/buscando_adicionar_size',async(req,res)=>{
  console.log('');
  console.log('____________________________________________________');
  console.log('');
  console.log('  [ 1097 ]                                            ');
  console.log('  origem views : views/_cooperado/lojista/roupas/produto_visualizar ');
  console.log('');
  console.log('  origem route : route/_lojista/lojista/buscacores/:id......');
  console.log('');
  console.log('  sub-origem   : function(carregar)fetch/buscacores "  ');
  console.log('  obs : completa a page edita-produto (vis-detalhe-temp =>[ 1537 ] ');
  console.log('');
  console.log('  destino :views/_cooperado/lojista/roupas/roupa-adiciona-size');
  console.log('');
  console.log('____________________________________________________');
  console.log('');
  console.log(req.body);
  let form=req.body;
  let id_cor=form.nameidcores;
  let passe;
  let especificacao;
  Roupa.findOne({'cores._id':id_cor})
       .then((vitrine)=>{
           //console.log('[1120]',vitrine)
           let cores=vitrine.cores;
           console.log('');
           //console.log('com array',cores);
           console.log('');
           let l=cores.length;
           console.log('',l);
           console.log('');
           //console.log('seem array',cores);
           for (let i=0;i<l;i++){
               //console.log('bigo!') 
               let b=cores[i]._id;
               if(b==id_cor){
                 console.log('');
                 //console.log('massa!',b);
                 console.log('______________________________________________');
                 //console.log(cores[i])
                 passe=cores[i]
                 especificacao=cores[i].especificacao;
               }
           }
           console.log('');
           console.log('_________________________________________');
           console.log(' 1145 passe ',passe)
           console.log('');
           console.log('_______________________________________');
           console.log(' 1145 passe ',especificacao)
           console.log('');
           console.log('______________________________________');
           ///////////////////////////////////////////////////////
           //............................................
          // return
           res.render("_cooperado/lojista/roupas/roupa_adiciona-size",{ layout:'lojista/roupa-adicionaSize.handlebars',vitrine:vitrine,cores:passe,especificacao:especificacao});  
           //............................................
       })
       .catch((err)=>{
           console.log(err);
       })
})

router.post('/nova-cor',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1101 ]');
  console.log(' origem views :views/_cooperado/lojista/roupa/roupa_visualizar');
  console.log(' origem route : action="/roupa/nova-cor' );
  console.log(' ___________________________________');
  console.log(' destino :views/_cooperado/lojista/roupa/roupa-tabela-cores ');
  let nucleo=req.body;
  console.log('');
  console.log(' [ nucleo ] ',nucleo);
  console.log('');
  let idproduto=nucleo.codigo;
  console.log(idproduto);
  console.log('_____d____________________________')
  ////////////////////////////////???????????????????????????????
  await Roupa.findOne({_id:idproduto})
           .then((vitrine)=>{
               ///////////////////////////////////////////////////
               console.log('_____e____________________________')
               //Roupa.distinct('cores',{_id:idproduto})
                //////////////////////////////////////////////////////
                let cores;
                cores=vitrine.cores;
                console.log('');
                console.log('---------------------------------------');
                console.log('cores ',cores)
                let j=cores.length;
                let last_cor=cores[j-1];
                console.log('');
                console.log('---------------------------------------');
                console.log('last_cor',last_cor);
                let p1=last_cor.fase;
                let ponto=last_cor.obj;
                if(p1===4){
                   ponto++;
                   console.log('Finalizado ,vamos emitir uma nova cor !')
                   res.render("_cooperado/lojista/roupas/roupa_insere-foto",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine,ponto:ponto});
                }else{
                  console.log(' Continuamos _______________________________________');
                  res.render("_cooperado/lojista/roupas/roupa_insere-foto",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine,cores:last_cor,ponto:ponto});
                }
            })   
           .catch((err)=>{
             console.log(err)
           })
})
    
router.post('/grava-nova-cor',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 1268 ]');
  console.log(' origem views :views/_cooperado/lojista/produto_visualizar');
  console.log(' origem route : route/_lojista/roupas.js/grava-nova-cor');
  console.log(' obs : Colocando uma nova cor');
  console.log('');
  console.log(' destino : /');
  console.log(' ___________________________________');
  console.log('');
  let corpo;
  corpo=req.body;
  console.log('grava-nova-cor',req.body)
  let cor=corpo.nameCorSelected;
  let nameCor=corpo.nameIdCorSelected;
  console.log(nameCor)
  //let nameCor=corpo.NameCor;
  let idProduto=corpo.nameIdVitrine;
  
  console.log('_id da vitrine ',idProduto);
  console.log('_____________________________');
  console.log('_____________ ________________');
  //..................................................
  // A cor vem em RGB para ser traduzida para sistema 'HEX'
  // Retira-se os 4 primeiros elementos - "rgb(" - e em seguida o ultimo elemento ")"
  let rgb=cor.substr(4);
  let l=rgb.length;
  rgb=rgb.slice(0,(l-1))
  // Agora pegamos o primeiro valor da cor "RED"
  let p=rgb.search(',');
  let R=rgb.slice(0,p);
  let r=R.toString(16);
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::
  // Em seguida eliminamos os parametros da cor "RED"
  rgb=rgb.substr(p+1);
  // Agora buscamos os valores "GREEN"
  p=rgb.search(',');
  let G=rgb.slice(0,p);
  let g=G.toString(16);
  // Depois eliminamos os parametros da cor "GREEN"
  rgb=rgb.substr(p)
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
  // E por fim pagamos os valores da cor "BLUE"
  p=rgb.length;
  let B=rgb.slice(1,p)
  let b=B.toString(16);
  ////////////////////////////////////
  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
          const hex = x.toString(16)
          return hex.length === 1 ? '0' + hex : hex
  }).join('');
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const A= rgbToHex(parseInt(r),parseInt(g),parseInt(b))
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  console.log('');
  console.log('_________________________________');
  //let p1="65a81120c975b0467f7cf41e";
  console.log('cor para ser gravada',A)
  console.log('');
  console.log('__________________________________');
  //return
  ////////////////////////////////////////////////////////////     
  Roupa.updateOne({'cores.corback':`${nameCor}`},
                   {$set:{
                           'cores.$.corback':`${A}`,
                           'cores.$.corfront':`${A}`,
                           'cores.$.corinput':`${A}`,
                           'cores.$.fase':3,
                          },
       })
       .then((result)=>{
            console.log('');
            console.log('________________________________________________________');
            //////////////////////////////////////////////////////////

            Roupa.updateOne(
                        {_id:`${idProduto}`},
                        {$set:{
                               ponto:3
                              }
                        }
                  )
                  .then((result)=>{
                    console.log(result)
                  })         
                  .catch((error)=>{
                    console.log(error)
                  })

          ////////////////////////////////////////////////////////   
          console.log('',result);
          let f=result.modifiedCount;
          if (f==1){
            Roupa.findOne({_id:idProduto})
                 .then((vitrine)=>{
                    console.log('vitrine : ',vitrine);
                    let Arr=[];
                    Arr=vitrine.cores;  
                    let l=Arr.length;
                    console.log('');
                    //console.log(Arr[l-1]) 
                    let cores= Arr[l-1];
                    console.log('');
                    console.log('',cores);
                    console.log('_________________________');
                    let especificacao=cores.especificacao;
                    [especificacao]=especificacao;
                    console.log('');
                    console.log('',especificacao);
                    console.log('_________________________');
                    //////////////////////////////////////////////////////
                    //return
                    res.render("_cooperado/lojista/roupas/roupa_insere-especificacao",{ layout:'lojista/roupa-coloca-foto.handlebars',vitrine:vitrine,cores:cores,especificacao:especificacao});  
                 }) 
                 .catch((er)=>{
                  console.log(er)
                 })
          }
          console.log('');
       })
       .catch((e)=>{
         console.log(e)
       })
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //////////////////////////////////////////////////////
})

router.post('/tabelacores',async(req,res)=>{
    console.log('');
    console.log('___________________________________');
    console.log('');
    console.log(' [ 1401 ]');
    console.log(' origem views :views/_cooperado/lojista/roupa/roupa_add-homefoto-homecor.handlebars');
    console.log('');
    console.log(' ___________________________________');
    console.log('');
    let nucleo=req.body;
    console.log('');
    console.log(' [ nucleo ] ',nucleo);
    console.log('');
    let idproduto=nucleo.codigo;
    let idcor=nucleo.idExtensao;
    let nameCor=nucleo.CodigoCor
    //console.log('idproduto',idproduto)
    Roupa.findOne({_id:idproduto},{cores:0})
             .then((vitrine)=>{
              Roupa.distinct('cores',{_id:idproduto})
              .then((cores)=>{
  
                  console.log('array de cores : ',cores)
                  
                  let j=cores.length;
                  console.log('');
                  console.log('',j);
                  console.log('------------------------------------');
                  //return
                  if (j==1){
                     let cor1=cores[0];
                     console.log('IGUAL A 1 ...',cor1)
                     let urlcor1=cor1.urlfront;
                     let corback=cor1.corback;
                     console.log('');
                     console.log('',cor1);
                     console.log('');
                     res.render("_cooperado/lojista/roupas/roupa_insere-cores-home",{ layout:'lojista/roupa-table-cor-home.handlebars',cores:cor1,vitrine:vitrine});
                  }else if(j>1){
                     ///////////////////////////////////////////////////
                     console.log('');
                     console.log('MAIOR QUE 1))))))');
                    let cor2=cores[j-1];
                    let urlcor2=cor2.urlfront;
                    let corback=cor2.corback;
                    ////////////////////////////////////////////////////
                    let cor1=cores[0];
                    console.log('vr .....',cor1)
                    let urlcor1=cor1.urlfront;
                    //////////////////////////////////////////////////// 
                    console.log('');
                    console.log('',urlcor1);
                    console.log('',urlcor2);
                    console.log('');
                    console.log('');
                    console.log('________________________________');
                    res.render("_cooperado/lojista/roupas/roupa_insere-cores",{ layout:'lojista/roupa-table-cor.handlebars',corUrlfront:urlcor1,corUrlfront2:urlcor2,vitrine:vitrine,corback:corback});
                  }  
              })
              .catch((er)=>{
                  console.log(er)
              })
             })   
             .catch((err)=>{
               console.log(err)
             })
   
   
})

router.post('/insere_especificacao',async(req,res)=>{
  console.log('');
  console.log('__________________________________________');
  console.log('');
  console.log(' [ 1414 ] ');
  console.log(' origem views : views/_cooperado/lojista/roupa-editando-size.handlebars');
  console.log(' origem route : route/_lojista/roupa/finalizando_extensao');
  console.log(' Obs : ');
  console.log('');
  console.log(' destino : ');
  console.log('');
  //...............................................
  let nucleo=req.body;
  //console.log(nucleo)
  let idproduto=nucleo.nameIdProduto;
  let idcorfoto=nucleo.nameIdCor
  console.log(idproduto);
  //................................................
  let tamanho=nucleo.nameTamanho;
  let qte=parseInt(nucleo.nameQte);
  let custo=parseFloat(nucleo.nameCusto);
  let vista=parseFloat(nucleo.nameVista);
  let prazo=parseFloat(nucleo.namePrazo);
  let page=nucleo.namePage;
  //............................................
  //console.log(' [ 3159 ]...',tamanho,qte,custo,vista);
  ////////////////////////////////////////////////////////
  await Roupa.updateMany(
             {'cores._id':idcorfoto},
             { $set:{ 'cores.$.especificacao':[
                        {
                          tamanho:`${tamanho}`,
                          qte:parseInt(`${qte}`),
                          precocusto:parseFloat(`${custo}`),
                          precovista:parseFloat(`${vista}`),
                          precoprazo:parseFloat(`${prazo}`),
                        }
                      ],
                      
                     },
             },
             {upsert:false}
         )
         .then((result)=>{
              console.log('');
              console.log('resultado da alteração : ',result);
              console.log('');
              console.log('',result.modifiedCount);
              console.log('_______________________________________________');
              console.log('');
              let n2=result.modifiedCount;
              console.log('vr de n2',n2)
              
              if (n2===1){
                  console.log('dentrooooo')
                  let r=0;
                  alterafase(idcorfoto,r)
                  
               }else{
                 console.log('problema!')
               } 
               //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
               async function alterafase(idcorfoto,r){
                      console.log(idcorfoto)
                      console.log(r);
                      r++;
                      await   Roupa.updateMany(
                                  {
                                    'cores._id':idcorfoto
                                },
                                { $set:{'cores.$.fase':4,
                                      },
                                  },
                                  {upsert:false}
                                  )
                                  .then((result)=>{
                                      console.log('result_fase 1',result)
                                      console.log('vr de r',r)
                                      //////////////////////////////////////////////////////////
                                      Roupa.updateOne(
                                                      {_id:idProduto},
                                                      {
                                                        $set:{ponto:4}
                                                       }
                                                     )
                                           .then((result)=>{
                                                 console.log(result)
                                            })         
                                           .catch((error)=>{
                                                console.log(error)
                                           })
                         // })
                                   ////////////////////////////////////////////////////////             
                                  })
                                  .catch((e)=>{

                                  })
              }                    
              //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
              Roupa.findOne({_id:idproduto})
                       .then((vitrine)=>{
                                   // ................................................................
                                   console.log('');
                                   //console.log('vitrine 100 => ',vitrine)
                                   console.log('');
                                   let cores=vitrine.cores;
                                   let l=cores.length;
                                   cores=cores[l-1];
                                   console.log('');
                                   console.log('___________________________________________');
                                   console.log('',cores);
                                   let especificacao=cores.especificacao;
                                   [especificacao]=especificacao;
                                   console.log('');
                                   //console.log('',especificacao);
                                   console.log('___________________________________________');
                                   //return
                                   res.render("_cooperado/lojista/roupas/roupa_insere-finalizado",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine,cores:cores,especificacao:especificacao});
                                   /////////////////////////////////////////////////
                         })
                         .catch((e)=>{
                           console.log(e)
                         })
               /////////////////////////////////////////////////////
         })
         .catch((errr)=>{
            console.log(errr)
         }) 
});

router.post("/edita-especificacao",async(req,res)=>{
  console.log('');
  console.log('______________________________________________');
  console.log('');
  console.log(' [ 1529 ]');
  console.log('');
  console.log(' origem views : views/_cooperado/lojista/roupa_vizualizar_.handlebars ');
  console.log(' origem route : routes/_lojista/roupa.js/edita-especificacao');
  console.log(' obs : Objetivo editar completar o cadastro de fotos,cores,tamanho....');
  console.log('');
  console.log(' destino : views/_admin/admin/admincentral.handlebars');
  console.log('');
  console.log(req.body);
  console.log('');
  console.log('___________________________________________');
  
  let idProduto=req.body.name_codigoProduto;
  let idCores=req.body.name_codigoCor;
  let idTamanho=req.body.name_codigoTamanho
  let cores;
  let especificacao=[];
  let c;
  let result=[];
  let W=[];
  
  console.log(' id ',idCores)
  
  Roupa.findOne({
                  'cores.especificacao._id':idTamanho
                },{'cores.especificacao':1})
          .then((cores)=>{
             // Pega as cores e a derivação=> especificação
             let G=Object.values(cores.cores)
             let j=G.length;
     
             //return
             for (let h=0;h<j;h++){
                 let S=G[h];
                 // determina a especificação dentro de cores
                 let Q=S.especificacao;
                 //console.log('20',Q)
                 let a=Q.length;
                 // determina quantas tamanhos há dentro da cor selecionada;
                 for (let z=0;z<a;z++){
                     // localiza o id da especificacao
                     let b=Q[z]._id;
                     b=b.toString();
                     // Se o id selecionado na page é igual ao id dentro do array ,então..
                     if(idTamanho==b){
                        // pega os objetos dentro do array
                        W.push(Q[z])
                        // Pega a especificação a ser modificada.
                        //especificacao.push(S)
                        showpage(W);
                     }
                 }
             }
           //////////////////////////////////////////////////////////////////////////////////////
          })
         .catch((er)=>{
             console.log(er);
          });
             
          ///////////////////////////////////////////////////////////////
          function showpage(especificacao){
                 console.log('');
                 //////////////////////////////////////////////////////////////
                 Roupa.findOne({
                                  _id:idProduto
                               },{cores:1})
                     .then((cores)=>{
                         let h=Object.values(cores.cores);
                         console.log('valor separado :',h)
                         let t=h.length;
                         console.log('vr de t ',t)
                         for (let i=0;i<t;i++){
                            let r2=h[i]._id;
                            r2=r2.toString();
                            if (r2==idCores){
                              console.log('');
                              console.log('Louco!',h[i])
                              console.log('');
                              cores=h[i];
                              pegaX(cores,especificacao)
                            }
                         }
                     })
                     .catch((e)=>{
                       console.log(e)
                     })
              
                 //////////////////////////////////////////////////////////////
                 console.log('',cores);
                 function pegaX(cores,especificacao){
                      Roupa.findOne({_id:idProduto},{cores:0})
                            .then((vitrine)=>{
                              console.log('');
                              console.log('______________________________________');
                              console.log('');
                              console.log(vitrine);
                              console.log('________________________________________');
                            // return
                              res.render("_cooperado/lojista/roupas/roupa_edita-especificacao",{ layout:'lojista/roupa-edita-temp.handlebars',vitrine:vitrine,cores:cores,especificacao:especificacao}); 
                            })
                            .catch((e)=>{
                              console.log(e)
                            })
                      }
                    }
})

router.post('/inserir-size',async(req,res)=>{
  console.log('');
  console.log(' [ 1638 ]');
  console.log('');
  console.log(' origem views : views/_cooperado/roupas/roupa-adicionaSize.handlebars ');
  console.log(' origem route : routes/_lojista/roupa_/inserir-size');
  console.log(' obs : Está inserindo um novo tamanho');
  console.log(' Volta para a mesma página');
  console.log(' destino : views/_cooperado/roupas/roupa-adicionaSize.handlebars');
  console.log('');
  console.log(req.body);
  let nucleo=req.body;
  console.log('');
  let idProduto=nucleo.nameIdProduto;
  let id_cor=nucleo.namedaCorSelected;
  let tamanho=nucleo.nameTamanho;
  let qte=nucleo.nameQte;
  let custo=nucleo.nameCusto;
  let vista=nucleo.nameVista;
  let prazo=nucleo.namePrazo;
  let page=nucleo.namePage;
  page="default" 
  console.log('');
  console.log(1000,id_cor);
  console.log('');
  console.log('__________________________________________');
  //return
  /////////////////////////////////
  Roupa.updateMany(
                    {'cores._id':id_cor},
                    { $push :{
                                  'cores.$.especificacao':                   
                                       { tamanho:`${tamanho}`,
                                         qte:`${qte}`,
                                         precocusto:`${custo}`,
                                         precovista:`${vista}`,
                                         precoprazo:`${prazo}`,
                                         page:`${tamanho}`
                                       }
                           }
                    },
          )
          .then((result)=>{
               console.log('');
               console.log('...................',result);
               console.log('');
               
               console.log('___________________________________');
               //return
               Roupa.findOne({_id:idProduto},{'cores.especificacao':1})
                       .then((vitrine)=>{
                        console.log('2-',vitrine);
                        console.log('1000');
                        let cores=vitrine.cores;
                        res.render("_cooperado/lojista/roupas/roupa_adiciona-size",{ layout:'lojista/roupa-adicionaSize.handlebars',vitrine:vitrine,cores:cores});  
                       })
                       .catch((err)=>{
                           console.log(err)
                       })
          })
          .catch((er)=>{
             console.log(er)
          })
})

router.post('/editar-especificacao',async(req,res)=>{
  console.log('');
  console.log(' [ 1809 ]');
  console.log('');
  console.log(' origem views : views/_cooperado/roupas/roupa-edita-especificacao.handlebars ');
  console.log(' origem route : routes/_lojista/roupa_/editar-especificacao');
  console.log(' obs : Edita a especificação');
  console.log('       Vai para finalizado');
  console.log(' destino : views/_cooperado/roupas/roupa_insere-finalizado.handlebars');
  console.log('');
  console.log(req.body);
  let nucleo=req.body;
  console.log('');
  let idProduto=nucleo.nameIdProduto;
  let id_cor=nucleo.namedaCorSelected;
  let tamanho=nucleo.nameTamanho;
  let qte=nucleo.nameQte;
  let custo=nucleo.nameCusto;
  let vista=nucleo.nameVista;
  let prazo=nucleo.namePrazo;
  let page=nucleo.namePage;
  page="default" 
  console.log('');
  console.log(1000,id_cor);
  console.log('');
  console.log('__________________________________________');
  //return
  /////////////////////////////////
  Roupa.updateMany(
                    {'cores._id':id_cor},
                    { $set:{
                                  'cores.$.especificacao':                   
                                       { tamanho:`${tamanho}`,
                                         qte:`${qte}`,
                                         precocusto:`${custo}`,
                                         precovista:`${vista}`,
                                         precoprazo:`${prazo}`,
                                         page:`${tamanho}`
                                       }
                           }
                    },
          )
          .then((result)=>{
               console.log('');
               console.log('...................',result);
               console.log('');
               
               console.log('___________________________________');
               //return
               Roupa.findOne({_id:idProduto},{'cores.especificacao':1})
                       .then((vitrine)=>{
                        console.log('2-',vitrine);
                        console.log('1000');
                        let cores=vitrine.cores;
                        res.render("_cooperado/lojista/roupas/roupa_insere-finalizado",{ layout:'lojista/roupa-adicionaSize.handlebars',vitrine:vitrine,cores:cores});  
                       })
                       .catch((err)=>{
                           console.log(err)
                       })
          })
          .catch((er)=>{
             console.log(er)
          })
})

router.get('/page_visual-page/:id',(req,res)=>{
  console.log('');
  console.log('_____________________________________________');
  console.log('');
  console.log(' [ 1705 ]');
  console.log(' origem views : views/_cooperados/admin/admincooperados.handlebars');
  console.log(' origem route : route/_lojista/lojista/page-visual-page/:id');
  console.log(' obs : _cooperado/lojista/visual-page",{ layout:"loja-formata.handlebars"');
  console.log('');
  console.log(' destino : carrega templeta da page para ser montada');
  console.log('           _cooperado/templates/roupa-1  ');
  console.log('');
  console.log('___________________________________________________');
  console.log('');
  console.log('requisição _id',req.params);
  console.log('');
  let idCooperado=req.params.id;
  //....................................................
  try{
      Lojista.findOne({'_id':idCooperado},{razao:1})
            .then((container)=>{
                  console.log('-------------------------------------')
                  console.log('')
                  console.log('container : ',container.id)
                  //:::::::::::::::::::::::::::::::::::::::::::::::::::::
                  res.render("_cooperado/templates/roupa-1",{ layout:'lojista/roupa-loja-formata.handlebars',container:container});
            })
            .catch((e)=>{
                console.log(e)
            })
     }catch(e){
          console.log(e)
     }
})

// ligada a roupa-1 para criar page Lojista Roupa
router.post('/buscar-artigo/:id',async(req,res)=>{
  console.log('');
  console.log('_______________________________________________');
  console.log('');
  console.log(' [ 1778 ]');
  console.log(' origem views : views/_cooperado/template/roupa-1.handlebars');
  console.log(' origem route : routes/_lojista/roupa_/buscar-artigo/:id');
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
  //......................................................
  await  Roupa.distinct("artigo",{lojaid:`${lojaid}`})
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

router.get('/buscar-artigos_publicados/:id',async(req,res)=>{
  console.log('')
  console.log('____________________________________________')
  console.log('')
  console.log(' [ 1818 ] lojista/buscar-registros')
  console.log(' origem views : views/_cooperado/templates/roupa-1.handlebars/produto_publicado()')
  console.log(' origem route : route/_lojista/lojista.js/buscar-registros_publicados ')
  console.log(' obs: ');
  console.log('      busca os registro que são de acordo com o artigo escolhido porém a posição é zero,');
  console.log('      ou seja, não está vinculado a nenhuma página.');
  console.log('');
  console.log(' destino : response : irá carregar a page nomeada conforme o artigo selecionado');
  console.log('_____________________________________________');
  console.log('');
  
  let palavra=req.params.id;
  let pos;
  pos=palavra.search("=:");
  let artigo=palavra.substring(0,pos);
  palavra=palavra.slice((pos+2),(palavra.length));
  let lojaid=palavra.trim();
  console.log(' artigo   : ',artigo);
  console.log(' lojista  : ',lojaid);
  let zero=0;
  zero=parseInt(zero);
  console.log(' zero :',zero)
  let retorno=1;
  //page="home";
  await  Roupa.find({
                          $and: [
                                  {lojaid:lojaid},
                                  {posicao:{$gt:zero}},
                                  {artigo:artigo},
                                ]
                      })
                      .then((result)=>{
                          console.log('');
                          console.log('RESULT de [ 1850 ] : ',result)
                          //console.log(typeof(result))
                          if(result=='undefined'){
                              console.log('_______________________________________________')
                              console.log('');
                              console.log(' [ 1855 ] Não há nada publicado com : ',artigo)
                              console.log('_______________________________________________')
                              let zero=0;
                              result={
                                retorno:zero,
                              };
                              res.send(result)
                          }else{
                              console.log('');
                              console.log('________________________________________________');
                              console.log(result)
                              console.log('');
                              res.send(result)
                              //........................................................................
                        }
                      })
                      .catch((er)=>{
                          console.log(er)
                      })
})

router.get('/home_publicado/:id',async(req,res)=>{
  //console.log('_____________________________________________');
  console.log('');
  console.log(' [ 1951 ]');
  console.log('');
  console.log(' origem views : views/_cooperado/templates/roupa-1.handlebars');
  console.log(' origem route : route/_lojista/roupa_/get/home_publicado/:id');
  console.log('');
  console.log(' obs : busca através do path a image e a posição se já tem publicado')
  console.log('')
  console.log(' destino : response ImgLoad() [ 1886 ]');
  console.log('')
  console.log('_____________________________________________')
  console.log('')
  let q=req.params;
  console.log('params : ',req.params)
  let idloja=q.id;
  let page;
  page="home";
  //...................................................
  console.log('______________________________________________________')
  page=page.trim();
  console.log('');
  console.log(page,'-',idloja)
  console.log('');
  //........................................
   await Roupa.find({
                      $and: [ 
                               {loja_id:{$eq:idloja}},  
                               { posicao:{$gt:0}},
                               { page:{$eq:page}},

                           ]
               })
               .then((result)=>{
                  console.log(result)
                  res.send(result)
               })
               .catch((er)=>{
                 console.log(er)
               })
})

router.post('/buscar_produto-vinculados/:id',async(req,res)=>{
  console.log('');
  console.log('_________________________________________');
  console.log("");
  console.log(' [ 2061 ]');
  console.log(' origem views : _cooperado/templates/roupa-1.handlebars');
  console.log(' origem route : /_lojista/roupa_/buscar-produto_vinculados');
  console.log(' obs : Pega os produto vinculados ao artigo selecionado no botão/id-artigoSelected');
  console.log('       Os produtos são referência=> artigo');
  console.log('');
  console.log(' destino : views/_cooperado/templates/roupa-1.handlebars');
  console.log('');
  console.log('__________________________________________');
  console.log('');
  let palavra=req.params.id;
  console.log('valor id :',palavra)
  let pos;
  pos=palavra.search(":");
  let page=palavra.substring(0,pos);
  console.log("page : ",page)
  let idloja=palavra.substr((pos+2))
  console.log("idloja : ",idloja)
  console.log('_________________________');
  let zero=0;
  zero=parseInt(zero);
  if(page=='home'){
    console.log('dentro de home');
                 await Roupa.find(
                                {
                                      $and:[
                                            {
                                              loja_id:idloja,
                                              posicao:{$eq:0},
                                              ponto:{$gt:1},
                                            }
                                          ],
                                }
                                )
                                .then((resp)=>{
                                    console.log('resultado da pesquisa/produtos vinculados :');
                                    console.log('');
                                    console.log('________________________________________');
                                    ////////////////////////////////////////////////////////////
                                    ///////////////////////////////////////////////////////////
                                    console.log('100 => ',resp);
                                    console.log('');
                                    console.log('________________________________________');
                                    let corpo=resp;
                                    let l=corpo.length;
                                    console.log('corpo  l => ',l)
                                   // [resp]=resp;
                                    let produto=corpo;
                                    console.log('');
                                    console.log('________________________________________');
                                    console.log('1000 => ',corpo);
                                    console.log('_________________________________________');
                                    //console.log('',Object.values(resp.cores));
                                    console.log('');
                                    res.send(resp)
                                })
                                .catch((er)=>{
                                  console.log(er)
                                })
  }else{
          //..........................................
          console.log('fora de home');
          console.log(idloja)
          console.log(zero)
          console.log(page)
          await Roupa.find(
                            {
                                  $and:[
                                        {
                                          lojaid:idloja,
                                          artigo:page,
                                         'cores.posicao':zero,
                                        }
                                      ],
                            },
                            {codigo:1,descricao:1,tecido:1,cores:1}
                          )
                         .then((resp)=>{
                            console.log('resultado da pesquisa/produtos vinculados :');
                            console.log(resp);
                            [resp]=resp;
                            console.log('');
                            console.log('',resp);
                            console.log('_____________________________________');
                            let produto=resp;
                            console.log(produto)
                            console.log('');
                            res.send(resp)
                          })
                         .catch((er)=>{
                            console.log(er)
                         })
        }                        
})

router.post('/busca_itensfotos/:id',async(req,res)=>{
  console.log('');
  console.log('__________________________________________');
  console.log('');
  console.log(' [ 2051 ]');
  console.log('');
  console.log(' origem views : views/_cooperado/template/roupa-1.handlebars');
  console.log(' origem route : route/_lojista/roupa/buscar_itensfotos/:id');
  console.log(' obs :  busca as foto do produto selecionado');
  console.log('');
  console.log(' destino : views/_cooperado/templates/roupa-1.handlebars');
  console.log('___________________________________________');
  console.log('');
  //let param=req.params;
  let n=req.params.id;
  console.log('')
  console.log('__________________________________________')
  console.log(req.params.id)
  console.log('')
  console.log(' idProduto : ',n)
  console.log('')
  console.log('__________________________________________')
  n=n.trim();
  console.log('')
         //..........................................................................
          await Roupa.findOne({
                         _id:{$eq:n}
                       },{cores:1}
                 )
                .then((cores)=>{
                   console.log('cores pertencetes ao produto >',cores);
                  // let cores=resp.cores;
                   console.log('________________________________');
                  // busca_Cores(cores)


                  // function busca_Cores(n){
                  // }
                   //return
                   res.send(cores);
                })
                .catch((err)=>{
                   console.log('Ocorreu um erro!',err)
                })
      //..................................................................................          
})

router.post('/pega_foto/:id',async(req,res)=>{
  console.log('');
  console.log('___________________________________');
  console.log('');
  console.log(' [ 2098 ]');
  console.log(' origem views :views/_cooperado/templates/roupa-1.handlebars');
  console.log(' origem route : route/_lojista/roupas.js');
  console.log(' obs : Pega as foto para Busca a page para editar o dados de vitrine');
  console.log('');
  console.log(' destino : views/_cooperado/templetes/roupas-1.handlebars');
  console.log(' ___________________________________');
  console.log('');
  let idCor;
  idCor=req.params.id;
  console.log(idCor);
  console.log('');
  Roupa.findOne({'cores._id':idCor},{cores:1})
          .then((resp)=>{
              console.log('fotos escolhida 100',resp)
              //return
              res.send(resp);
          })
          .catch((e)=>{
            console.log(e)
          })
})

router.post('/busc-fornec-lojista/:id',async(req,res)=>{
  console.log('')
  console.log('____________________________________________')
  console.log('')
  console.log(' [ 2125 ] ')
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

router.post('/fixaposicaoimg',async(req,res)=>{
  console.log('');
  console.log('______________________________________________');
  console.log('');
  console.log(' [ 2155 ]');
  console.log(' origem views : views/_cooperado/templates/roupa-1.handlebars ');
  console.log(' origem route : route/_lojista/roupa/fixaposicaoimg');
  console.log(' obs : edita a posição e a page que ficará o determinado produto --');
  console.log('');
  console.log(' destino : res.redirect(`redirect/voltapage_v?isual-page/${id}`)');
  console.log('');
  console.log('______________________________________________');
  console.log('');
  let nucleo=req.body;
  console.log('vr do núcleo :')
  console.log(nucleo);
  console.log('');
  let idProduto=req.body.idProduto;
  let numberCor=req.body.numberCor;
  let posicaoImagem=req.body.posicaoImagem;
  let urlImagem=req.body.urlImagem;
  let namePage=req.body.namepage;
  console.log(namePage);
  console.log(posicaoImagem);
  posicaoImagem=parseInt(posicaoImagem);   
  console.log('');
  console.log('____________________________________');
  console.log('')
  if(namePage=="home"){
    console.log("name page 1 : ",namePage);  
    //return
    await Roupa.updateMany({
                             $and:[
                                    {_id:idProduto},
                                  ]                              
                          }  
                          ,{
                              $set: {
                                        posicao:posicaoImagem,
                                        page:`${namePage}`,
                                        pageurl:urlImagem,
                                    }
                          },
                          {upsert:false}
                  )
                 .then((resp)=>{
                    console.log(' [ 2197 ] resposta  => ',resp)
                    Roupa.findOne({_id:idProduto})
                             .then((vitrine)=>{
                                console.log(vitrine);
                                let idloja=vitrine.loja_id;
                                console.log('_____________________________');
                                console.log(idloja);
                                console.log('');
                                res.redirect(`/redirect/page_visual-page/${idloja}`);
                             })
                             .catch((e)=>{
                                console.log(e);
                             }) 

                 })
                 .catch((err)=>{
                   console.log("error",err)
                 })
  }else{
    console.log(' namePage : ',namePage)
    //return
    await RoupaStok.updateOne({
                              _id:idProduto, 
                        },
                        {$set: {
                                'produto.pagename':namePage,
                                'produto.pageposicao':posicaoImagem,
                                'produto.pagenumbercor':`${numberCor}`,
                                'produto.pageurl':urlImagem,
                              }
                          }
                      )
                 .then((resp)=>{
                    console.log(' [ 2230 ] resposta  => ',resp)
                      RoupaStok.findOne({_id:idProduto})
                          .then((result)=>{
                            console.log(result);
                            let idloja=result.produto.lojaid;
                            console.log(idloja)
                            //reredicionar(idloja)
                            res.redirect(`/redirect/page_visual-page/${idloja}`);
                          })
                          .catch((e)=>{
                            console.log(e);
                          }) 
                  })
                 .catch((err)=>{
                    console.log("error",err)
                  })
  }              
   function  reredicionar(n){
     
   }
  
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

 module.exports = router;