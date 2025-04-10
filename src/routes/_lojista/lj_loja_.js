const express = require('express')
const bcrypt = require('bcryptjs')
//const bcryptjs = require('bcryptjs')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
//const path =require('path')
//const fs = require('fs')
const { eAdmin } = require("../../../helpers/eAdmin")
const { eAdminLoja } = require('../../../helpers/eAdminLoja')
const { ObjectId } = require('mongodb')
const { response } = require('express')
//const { render } = require('express/lib/response')
require('../../models/lojista')
const Lojista = mongoose.model('lojista')
require('../../models/fornecedor')
const Fornec = mongoose.model('fornec')
require('../../models/fornecedor')
const Fornecedor = mongoose.model('fornec')

//const { ObjectId } = require('mongodb')
require('../../models/prod_lojista')
const LojistaNew = mongoose.model('prod_lojista')
require('../../models/endereco-lojista')
//const endLojista = mongoose.model('../../enderecolojista')
require('../../models/segmentos')
const Segmento = mongoose.model('segmento')
require('../../models/segmentosubs')
const SubSegmento = mongoose.model('segmentosub')
require('../../models/prod_temp')
const ProdTemp = mongoose.model('prod_temp')
// vem [views/_cooperado/admin/admincooperados ] <--> vai [ _cooperado/produto/list-produto ]
// O produto ????? -Está errado - Na realidade passa o nome do cooperado
router.get('/cooperado/:id',(req,res)=>{
      // 'vem de:views/_cooperado/admin/admincooperados <--> vai para :_cooperado/produto/list-produto'
      console.log('------------------------------------------------')
      console.log("linha 103 --> routes /_lojista/lj_loja/ get('????produtos/:id")
      console.log('vem de:views/_cooperado/admin/admincooperados <--> vai para :_cooperado/lojista/list-produto')
      let rz=req.params;
      console.log('--> cooperado/:rz.params',rz)
      //res.render("_cooperado/produto/update-produto",{layout:'produto.handlebars',razao:rz})
      //res.render("_cooperado/produto/edicao-produto", {layout:'produto.handlebars',razao:rz})
      //_cooperado/produto/cadastro-produto
      //return
      try{
        let [c]=Object.values(rz)
        console.log('valor de c :',c)
        let y=c;
        // -----------------------------------------------------------------------------------------------
        LojistaNew.findOne({"lojista.rzao":c},{lojista_rzao:1})
                .then((produto)=>{
                  console.log('linha 117 :',produto)
                  if(produto == null){
                      console.log('linha 119',produto)
                      res.render('_cooperado/lojista/lj-list-produto',{ layout:'participe.handlebars',razao:c})
                  }else{
                    console.log('linha 122',produto)
                     res.render('_cooperado/lojista/lj-list-produto',{ layout:'participe.handlebars',razao:c,produtos:produto})
                    
                  }
              })
              .catch((err)=>{
                console.log(err)
              })
      }
      catch(e){
        console.log(e)
      }
})

// CONSULTA FECTH : FAZ AVERIGAÇÃO SE JÀ ESTÁ CADASTRADO O FORNECEDOR ATRAVÉS DO CNPJ
// vem de [] <--> [ _cooperado/lojista/lj-lista-fornecedor.handlebars ]
// A lista de fornecedor é para importação de lista de produtos do lojista selecionado.
router.get('/busca_cnpj/:id',(req,res)=>{
    // Faz uma busca para averiguação se o fabricante já consta no cadastro GERAL
    console.log('-----------------------------------------------')
    console.log("linha 141 --> routes /_lojista/lj_loja/  get(busca_cnpj/:id')")
    console.log('vem do views/(_cooperados/produto/import-produto')
    let fabricante=Object.values(req.params)
    console.log('valor do fabricante',fabricante)
    let letra=fabricante[0];
    let trocaletra=letra.replace("A",".")
    let result = trocaletra.replace("A", ".");
    result=result.replace("B","/");
    result=result.replace("C","-")
    let w={};
    Lojista.findOne({cnpj:result})
           .then((fornec)=>{
             console.log('valor do fornec',fornec)
             w=fornec;
             console.log('valor de w',w)
             if(!fornec  ||  undefined ){
                let s={vr:0};
                console.log(s)
                res.send(s)
             }else{
                let n=[{vr:1}];
                w=[
                  w=w,
                ]
                console.log(w)
                res.send(w)
             }
           })
           .catch((err)=>{
                  console.log(err)
           })
})

// FECTH :::: ATENÇÃO AS ROTINAS A SEGUIR SERÂO MODIFICADAS DE : [ produto/import-produto ] para --> [ lojista/lj-importando-lista.handlebars ]
// ESSA ROTINA BUSCA OS SEGMENTO DO LOJISTA CUJA IMPORTAÇÃO DE PRODUTOS ESTÁ SENDO FEITA.
router.get('/buscar-segmento',(req,res)=>{
    console.log('-----------------------------------------------')
    console.log('(178) --> get/_lojista/loja/busca_-segmento')
    console.log('vem do views/(_cooperados/produto/import-produto')
    Segmento.find({},{_id:0})
            .then((prod)=>{
                res.send(prod)
            })
            .catch((e)=>{
                console.log(e)
            })
})

//FECTH
// ESSA ROTINA BUSCA O SEGMENTO 01 DO LOJISTA PARA IMPORTAÇÃO DE PRODUTOS
// É UMA SEQUÊNCIA DA ROTINA ANTERIOR
router.get('/buscar-segmento_01/:id',(req,res)=>{
    console.log('-----------------------------------------------')
    console.log('(196) --> get/_lojista/loja/busca_-segmento')
    console.log('vem do views/(_cooperados/produto/import-produto')
    console.log(req.params)
    let x=req.params;
    let z=Object.values(x)
    Segmento.find({segmento:z},{_id:0})
            .then((segment)=>{
                let [y]=segment
                console.log(y)
                const m=y.segmento_01.sort()
                res.send(m)
            })
            .catch((e)=>{
                console.log(e)
            })
})

//FECTH
// ESSA ROTINA COMPLEMENTA AS DUAS ANTERIORES
router.get('/buscar-segmento_02/:id',(req,res)=>{
    console.log('-----------------------------------------------')
    console.log('(217) --> get/_lojista/loja/busca_-segmento')
    console.log('vem do views/(_cooperados/produto/import-produto')
   // console.log(req.params)
    let x=req.params;
    let [z]=Object.values(x)
    console.log('lj_loja:get/buscar-segmento_02 -- z(248)',z)
    SubSegmento.find({segmentos_01:z},{_id:0})
            .then((seg02)=>{
               // console.log('valor 02',seg02)
                let [y]=seg02
                console.log('valor de y',y)
                const m=y.segmentos_02.sort()
                res.send(m)
            })
            .catch((e)=>{
                console.log(e)
            })
})

//FETCH
// ESSA ROTINA É A SEQUÊNCIA DAS ANTERIORES.
// PEGA OS PRODUTOS QUE ESTÃO NA TABELA TEMPORÁRIO E PARA PARA A TABELA { prod_lojista }
// VEM DA HDBS [ _cooperados/produto/import-produto ]
router.post('/transfeProduto',eAdmin,async(req,res)=>{
    // Essa rotina vem de [_cooperados/produto/import-produto ] com o objetivo de transferir o % arquivo temporário % para [ prod_Lojista ]
    console.log('-----------------------------------------------')
    console.log('(243) --> post/_lojista/loja/transfeProduto')
    console.log('vem do views/(_cooperados/produto/import-produto')
    let registro=req.body;
    chave1=registro.palavrachv1;
    chave2=registro.palavrachv2;
    chave3=registro.palavrachv3;
    chave4=registro.palavrachv4;
    await ProdTemp.find({},{_id:0})
            .then((temp)=>{
                // :::::::::::::::::::::::::::::::::::::::::::::              
                let c=temp.length;
                //console.log('valor de c',c)
                for(i=0;i<c;i++){
                   let codigo=temp[i].codigo;
                   let descricao=temp[i].descritivo;
                   //console.log('código :',codigo ,'     descritivo:    ',descricao)
                   LojistaNew.find({descritivo:descricao})
                             .then((produt)=>{
                                if(Object.keys(produt).length === 0){
                                    console.log('1',produt)
                                    const newProduto={
                                        codigo:codigo,
                                        descritivo:descricao,
                                        foto:'url',
                                        //------------------------------------------------
                                        palavrachaves:chave1,chave2,chave3,chave4,
                                       
                                        //------------------------------------------------
                                        segmento:registro.segmento,
                                        segmento01:registro.segmento01,
                                        segmento02:registro.segmento02,
                                        //------------------------------------------------
                                        fornecedores:[
                                            {
                                               cnpjfornec:registro.cnpjfornec,
                                               marcafornec:registro.marcafornec,
                                               produt:[
                                                       {
                                                        cbarra:1,
                                                        preco:'12.50'
                                                       }
                                               ]
                                             }
                                         ]
                                        ,
                                        //------------------------------------------------
                                        lojista:[
                                            {
                                                rzaoloja:registro.rzaolojista,
                                                cnpjloja:registro.cnpjlojista,
                                                fornex:{
                                                        cnpj1:registro.cnpjfornec,
                                                        marca1:registro.marcafornec 
                                                },
                                                cbarra:1,
                                                preco:12.50,
                                            }    
                                        ] 
                                    }
                                    new LojistaNew(newProduto)
                                    .save()
                                    .then((r)=>{
                                       // console.log('valor do registro?',r)
                                        req.flash("success_msg","Mensagem enviada com sucesso!")
                                        deletetpm(c)
                                    })
                                    .catch((err)=>{
                                        console.log(err)
                                        req.flash("error_msg","Error: Mensagem de contato não foi enviada com sucesso!",err)
                                    }) 
                                    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
                                }else{
                                   console.log('ainda estou pensando!')
                                }
                             })
                             .catch((e)=>{
                                console.log()
                             })
                }
            })
            .catch((e)=>{
                console.log(e)
            })

            function  deletetpm(c){
                ProdTemp.deleteMany({})
                .then((tpm)=>{
                  console.log('deletados ',c ,' temporários')
                })
            }
})

// FECTH
// ESSA ROTINA PEGA OS PRODUTOS DA TABELA TEMPORÁRIA E PASSA PARA TABELA ORIGINAL { prod_lojista }
// 
router.post('/edit-produto',async(req,res)=>{
    console.log('-----------------------------------------------')
    console.log('(340) --> post/_lojista/loja/edit-produto')
    console.log('vem do views/(_cooperados/produto/update-produto')
    // Busca todos os itens constatnte na tabela temporária
    console.log(req.body)
    await ProdTemp.find({})
              .then((regis)=>{
                 // Passa todas as linha da tabela temporária para verificação se já existe a linha na tabela de produtos
                 PassaFor(regis)
              })
              .catch((e)=>{
                console.log(e)
              })
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::
    function PassaFor(regis){
        let l=regis.length;
        for(i=0;i<l;i++){
            let registro=regis[i].codigo;
            // Pega o código de cada linha da tabela temporária e busca na tabela de produto para verificação se
            // realmente existe e então editar o novo lojista
            LojistaNew.findOne({codigo:registro},{codigo:1,_id:0})
                    .then((r)=>{
                            if(Object.keys(r).length===0){
                                // Se não achar nenhum registro então tem que inserir o produto na sua totalidade
                                'insert tudo   '
                            }else{
                                // Achou o produto,então vamos  editar o lojista já que temos o código do produto
                                console.log('editar só a loja- valor da linha :',r)
                                editandoLojista(registro)
                            }
                    })
                        .catch((e)=>{
                            console.log(e)
                    })
            console.log('célula->',registro) 
        }
    }
  })

// ESSA ROTINA É COMPLEMENTO DA ANTERIOR
async function  editandoLojista(registro){
    console.log('linha 380',registro)
    //console.log('vr de id : ',n)
    let b='Comercial XP'
    console.log('valor de razao : ',b)
    let z="27.678.333/0001-08"
    console.log('valor de cnpj  : ',z)
    let v="79.098.000/0009-08";
    let y='bolão';
    let barra='78.908.87';
    let p=12.87;
    console.log(n)
    try{
        // :::::::::::::::::::::::::::::::::::::::::::::::::::::
        //await LojistaNew.updateOne({codigo:`${n}`},{$push:{segmento:`${b}`}})
        // :::::::::::::::::::::::::::::::::::::::::::::::::::::
       // await LojistaNew.updateOne({codigo:`${n}`},{$addToSet:{lojista:{rzaoloja:`${b}`,cnpjloja:`${z}`}}})
        // :::::::::::::::::::::::::::::::::::::::::::::::::::::
        await LojistaNew.updateOne({codigo:`${n}`},
                                   {$addToSet:{lojista:{
                                                        rzaoloja:`${b}`,cnpjloja:`${z}`,
                                                        fornex:{cnpj1:`${v}`,marca1:`${y}`},
                                                        cbarra:`${barra}`,
                                                        preco:`${p}`
                                                        }
                                               }
                                   })
                 console.log('completou a edição')
                 console.log('                             ')
     } catch(err){
        console.log('linha 711 - err : ',err)
     }
}
 
 
 router.get('/publicidade/:id',(req,res)=>{
    // Essa rotina serve para passagem de [admincooperados-menu ] para hdbs uploadImage conforme path duas linhas abaixo.
    console.log('-----------------------------------------')
    console.log('(472)--get/_lojista/lj-loja/publicidade----------------------------------')
    console.log(req.params)
   //  segment:seg,loja:loja
    res.render("_cooperado/lojista/lj-publicidade", {layout:'lojista/admin-loja.handlebars',})
})

// router.get('/img-Upload/:id',(req,res)=>{/// })
//const upload = multer({ dest: "uploads" })

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, "public/images/top-sobre")
    },
    filename: function(req, res, cb) {
        cb(null, "descr-top-sobre.jpg")
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})

router.get('/uploadImagem/:id',(req,res)=>{
    // Essa rotina serve para passagem de [admincooperados-menu ] para hdbs uploadImage conforme path duas linhas abaixo.
    console.log('-----------------------------------------')
    console.log('(383)--get/_lojista/lj-loja/uploadImagem-')
    console.log('-------- só r3nderiza--------------------')
     console.log(req.params)
    //  segment:seg,loja:loja
     res.render("_cooperado/lojista/lj-upload-imagem", {layout:'lojista/admin-loja.handlebars',})
 })

 router.post('/update-sobre-img', upload.single('file'), (req, res, next) => {
    console.log('-----------------------------------------')
    console.log('(392)--get /lojista/lj-loja/img-Upload---------------------------------')
   
    console.log('linha 394',req.params.file)
    const file = req.file
    console.log('linha 396',file)
    if (!file) {
        req.flash("error_msg", "Error: Selecione uma imagem JPEG!")
       // res.redirect("/publicidade")
    } else {
       // req.flash("success_msg", "Upload realizado com sucesso!")
      //  res.redirect("/sobre/vis-sobre")
        // res.redirect("/lojista/publicidade")
    }
})

router.get('/publicidade',(req,res)=>{
    console.log("----------------------------------------")
    console.log("-(linha 409)--------------------------------------")
    res.render("_cooperado/lojista/lj-publicidade", {layout:'lojista/admin-loja.handlebars',})
})

router.get('/visualpage/:id',(req,res)=>{
    //-------------------------------------------------------
    console.log(req.params)
    let g=req.params;
    res.render("_cooperado/lojista/visual-page", {layout:'lojista/admin-loja.handlebars',num:g})
})
      
router.post('/listafornec',(req,res)=>{
     // Essa rotina vem do cooperados/produto/menu/cadastrar-produto
     console.log("")
     console.log('-------------------------------------------') 
     console.log('(424) --> get/_admin/mn_fornecedores/fornec')
     console.log('vem de views/admin/admincooperado/produto/manu/cad-fornec')
     console.log('vem de admin/central/menu-cadastro-fornecedores')
     console.log('-------------------------------------------') 
     console.log("")
   //  Segmento.find({'_id':})
     res.render("_cooperado/lojista/lista-fornec",{ layout:'lojista/admin-loja.handlebars'})
  })
module.exports = router;