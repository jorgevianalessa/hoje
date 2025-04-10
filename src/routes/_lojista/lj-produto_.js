// const { json } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const mongodb =require('mongodb')
const ObjectID  =  require ('mongoose').ObjectID;
const { eAdmin } = require("../../../helpers/eAdmin")
require('../../models/prod_lojista')
const Produto = mongoose.model('prod_lojista')
require('../../models/segmentos')
const Segmento = mongoose.model('segmento')
require('../../models/segmentosubs')
const SegmentoSub = mongoose.model('segmentosub')

//Ok 2907
router.get('/lista-produto',eAdmin,async(req,res)=>{
      console.log('-------------------------------------------') 
      console.log('(25) --> get/_lojista/lista_produto/:id')  

      Produto.find({}).sort({descritivo:1}).limit(12)
             .then((result)=>{
                  //console.log('33',result)
                  const q=Object.values(result);
                  console.log(q);
                  const f=Object.values(q);
                  console.log('valores de f',f)
                  let r=result.length;

                  res.render('_cooperado/produto/list-produto',{ layout:'participe.handlebars',produtos:f,R:r,q:q}) 
             })
             .catch((e)=>{

             })
      
      console.log('-------------------------------------------') 
})

router.get('/buscaSegmento',(req,res)=>{
      console.log('------------------------------------------------')
      console.log('(47) --> post/produto/busca-segmento')
      
      Segmento.find({},{segmento:1,_id:0}).sort({"segmento":1})
              .then((segmento)=>{
                  //  console.log('vr do segmento',segmento)
                    if(!segmento){
                        //res.render("admin/segmentos", {layout:'participe.handlebars'})
                    }else{
                       res.send(segmento);
                    }
              })
              .catch((e)=>{
                    //console.log('admin/segmentos.js->',e)
              })
})

router.get('/buscaSegmento1/:id',(req,res)=>{
      console.log('------------------------------------------------')
      console.log('(65) --> post/produto/busca-segmento')
      let s=req.params;
    //  console.log('vr de s',s)
      let [n]=Object.values(s);
     // console.log('vr de n',n)
      Segmento.find({segmento:n},{segmento_01:1,_id:0})
              .then((segmento)=>{
                  //  console.log('vr do segmento',segmento)
                    let [r]=segmento;
                  //  console.log('vr de r',r)
                    let g=Object.values(r.segmento_01);
                   // console.log('vr de g',g)
                    g=g.sort();
                     
                   // console.log(g)
                    if(!segmento){
                        //res.render("admin/segmentos", {layout:'participe.handlebars'})
                    }else{
                       res.send(g);
                    }
              })
              .catch((e)=>{
                    //console.log('admin/segmentos.js->',e)
              })
})

router.get('/buscaSegmento2/:id',(req,res)=>{
      console.log('------------------------------------------------')
      console.log('(93) --> post/produto/buscaSegmento2')
      let s=req.params;
      //console.log('vr de params',s)
      let [n]=Object.values(s);
     // console.log(n)
      SegmentoSub.find({segmentos_01:`${n}`},{segmentos_02:1,_id:0}).sort({"segmentos_02":1})
              .then((segment)=>{
                    //console.log('vr do segmento',segment)
                    let m=0;
                    if(segment.length===0){
                        console.log(8)
                        let y={}
                        y={
                              a:1111,
                        }
                        m=y;
                       // console.log(m)
                    }else{
                        const [r]=segment;
       //                 console.log('vr de r1',r)
                        m=Object.values(r.segmentos_02);
                       // console.log('vr de m',m)
                    }
                    //..........................................                  
                    if(!segment){
                        //res.render("admin/segmentos", {layout:'participe.handlebars'})
                        console.log(7)
                    }else{
                     //  console.log('vr final',m) 
                       console.log(typeof(m))
                       res.send(m);
                    }
              })
              .catch((e)=>{
                    //console.log('admin/segmentos.js->',e)
              })
})

router.get('/lista-produtos',eAdmin,async(req,res)=>{
      console.log('---------------------------------')
      console.log('linha 128 get/_lojista/produto?')
      res.render('_cooperado/produto/list-produto',{ layout:'participe.handlebars'})
})

 router.post('/alterasegmento',(req,res)=>{
      console.log('----------------------------------')
      console.log('175      post/produto/alterasegmento')
      console.log('176-vem de _cooperados/produto/vis-produto.hlerbs')
      let b=req.body;
      let codigo=b.inputcodigoform;
      console.log('codigo body',codigo)
      let nmProduct;
      let letra=b.inputdescrform;
      async function TrocaLetra(letra){
         let g=letras.replace("A123A",'.');
         console.log('vr 1 g',g)
         letras=letras.replace('B123B',"�")
         console.log('vr 2 g',g)
         letras=letras.replace('C123C',"�")
         console.log('vr 3 g',g)
         letras=letras.replace('C123C',"�",)
         console.log('vr 4 g',g)
         nmProduct=letras.replace('D123D',"/")
         return nmProduct
      }
      console.log('new letras',nmProduct)
      let segmento=b.inputSegform;
      let seg1=b.inputSeg1form;
      let seg2=b.inputSeg2form;
      //console.log(nmProduct,segmento,seg1,seg2)
      Produto.updateOne({descritivo:nmProduct,codigo:codigo},[{$set:{segmento:`${segmento}`,segmento01:`${seg1}`,segmento02:`${seg2}`}}])
             .then((resp)=>{
                  //let [w]=resp;
                  console.log('vr de resp',resp)
                  try{
                     console.log('204',nmProduct)   
                     res.redirect(`backlista-produto/${nmProduct}`)
                     console.log(777)  
                  }catch(e){
                     console.log(e)
                  }
             })
             .catch((e)=>{
                  console>log(e)
             })

 })

router.get('/buscaSoMarca/:id',(req,res)=>{
    console.log('------------------------------------')
    console.log('(239)   get/_lojista/buscaSoMarca/:id-')
    console.log('vem de _cooperados/produto/list-produto')
    const r=req.params;
    let w=Object.values(r);
    console.log('vr de w',w)
})

function TrocaLetra(letra){
      let g=letras.replace(".",'A123A');
        console.log('vr 1 g',g)
        letras=letras.replace("�",'B123B')
        console.log('vr 2 g',g)
        letras=letras.replace("�",'C123C')
        console.log('vr 3 g',g)
        letras=letras.replace("�",'C123C')
        console.log('vr 4 g',g)
        letras=letras.replace("/",'D123D')
        return letra
}

router.post('/vis-produto',(req,res)=>{
      console.log('') 
      console.log('-------------------------------------------') 
      console.log('pega o codigoProd e cnpjlojista para visualizar os detalhes do produto selecionado')
      console.log('vem de views/_cooperado/lojista/lj-list-produto.handlebars')
      console.log('(241) --> post/_lojista/vis-produto')
     // let id=req.params;
     // console.log(id)
      console.log(req.body)
    //  var r=Object.values(id);
       //var R=mongoose.Types.ObjectId(req.params._id);
      //console.log(R) 
      //return
      //-------------------------------------------------------------------------
      Produto.find({_id:r})
             .then((prod)=>{
                let [G]=prod;
                let ff=G.fornecedores;
                let [d]=ff;
                let marca=d.marcafornec
                
                let b={
                        hum:G.palavrachaves[0],
                        dois:G.palavrachaves[1],
                        tres:G.palavrachaves[2],
                        quatro:G.palavrachaves[3]
                  }
                res.render('_cooperado/lojista/vis-fornec',{ layout:'participe.handlebars',produto:G,palavra:b,marca:marca})
             })
             .catch((e)=>{
                console.log(e)
             })
})

router.post('/produtos/:id',(req,res)=>{
    let rz=req.params;
    console.log('--> cooperado/:id78',rz)
    try{
      //console.log(6)
      let [c]=Object.values(rz)
      console.log(c)
    
     //
       Produto.find({id_lojista:c},{codigo:1,descritivo:1,segmento:1,marca:1,id_fornec:1})
              .then((produto)=>{
                res.render('produto/list-produto',{ layout:'participe.handlebars',razao:c,produtos:produto})
             })
             .catch((err)=>{
               console.log(err)
             })
    }
    catch(e){
       console.log(e)
    }
  })

// Produto-lista de fornecedores  
// Busca a lista de fornecedores do lojista/cooperado para display na relação de fornecedores com objetivo de cadastrar novos produtos:produto/list-produto-fornec
router.post('/fornecedores/:id',(req,res)=>{
  let rz=req.params;
  console.log('/fornecedres/:id',rz)
  try{
    let [c]=Object.values(rz)
    console.log(c)
     Fornec.find({comercio:c})
           .then((fornec)=>{
             console.log('lista de fornecdores lojista->',fornec)
             
             console.log('valor de c',c)
             res.render('produto/list-produto-fornec',{ layout:'participe.handlebars',razao:c,fornec:fornec})
           })
           .catch((err)=>{
             console.log(err)
           })
  }
  catch(e){
     console.log(e)
  }
})


router.post('/fabricante',(req,res)=>{
      let p=req.body;
      console.log('o valor de /fabricante -->',p)
      let fabricante=Object.values(p)
      const iterator = fabricante.values();
      let cnpj;
      let razao;
      let marca;
      let n=0;
      for (const value of iterator) {
          if (n==0){
            cnpj=value;
            n++;
          }else if (n==1){
            razao=value;
            n++;
            console.log(razao," ",n)
          }else if (n==2){
            marca=value;
            n++;
            console.log(marca," ",n)
          }
      }

      console.log(cnpj,razao,marca)
      console.log(fabricante)

})

// Busca produto com nome partial para ser visualizado no painel de busca do site
router.post('/busca_produto/:',(req,res)=>{
      let f=req.body;
      
      let g=Object.values(f)
    
      g=g[0]
      if (g.length=2){
          let w={};
          Produto.find({"descritivo":{"$regex": `${g}`, "$options": "i"}})
                .then((produtos)=>{
                    let n=0;
                    for (const prod of produtos) {
                        
                        w[n] =prod.descritivo  
                        n++;
                        
                    }
                    console.log('valor de w',w)
                    res.send(valor=w)
                })
                .catch((e)=>{

                })
      }          
})

router.post('/cadProduto',(req,res)=>{
      console.log('--------------------------------------')
      console.log('(456) --> post/cadProduto')
      let g=req.body
      console.log('body',g)
      let razao=g.razao;
      let cbarra=g.Cbarra;
      console.log('vr de cbarra',cbarra)
      let descritivo=g.Descritivo;
      console.log('vr de descritivo',descritivo)
      let hum=g.linhahum;
      console.log('vr de linha hum',hum)
      let dois=g.linhadois;
      let tres=g.linhatres;
      let quatro=g.linhaquatro;

      
      new Produto( {
        codigo:"121212" ,
        codigoBarra:`${cbarra}`,
        descritivo:`${descritivo}`,
        segmento:[
            `${hum}`,
            `${dois}`
        ],
        id_lojista:`${razao}`,
        marca:`${"aguardando"}`,
        },{
            
        }).save().then((produt)=>{
          console.log(produt)
          res.send("Segmento  cadastrado com sucesso!")
        }).catch((err)=>{
            console.log(err)
            res.send(err)
          //  res.status(status).send(body) 
        })

})

// ESSA ROTINA NÃO FOI IDENTIFICADA : O [ _cooperado/produto/list-produto-alteracao ] não existe
//  router.get('/backlista-produto/:id',async(req,res)=>{
//       console.log('-----------------------??--------------------') 
//       console.log('(219) --> get/_lojista/lista_produto/:id')  
//       let x=req.params;
//       x=Object.values(x);
//       console.log('vr de backlist',x)
//       Produto.find({}).sort({descritivo:1})
//              .then((result)=>{
//                   //console.log(result)
//                   let r=result.length;

//                   res.render('_cooperado/produto/list-produto-alteracao',{ layout:'participe.handlebars',produtos:result,R:r,X:x}) 
//              })
//              .catch((e)=>{

//              })
      
//       console.log('-------------------------------------------') 
// })

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//   PERTENCE A _SITE
// Produto
// Busca a lista de produtos cadastrados do lojista/cooperado para display na relação de produtos:produto/list-produto
// router.post('/construcao',(req,res)=>{
//       console.log('---------------------------------------------------------')
//       console.log('linha 292   _lojista/lj-produto/post(/construcao---------')

//       let f=req.body;
//       console.log('só renderiza')
//       res.render("_site/home/construção", {layout:'construcao.handlebars'})
// })

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ESSA ROTINA ATENDE A ROTINA DE REDIRECIONAMENTO DA [ (linha 130) post('/cadProduto ] 
// ESSA VIEW ESTÁ SOB ANÁLISE
// router.get('/cadastro-produto',(req,res)=>{
//       res.render('_cooperado/produto/cadastro-produto',{ layout:'participe.handlebars'})
// })

// ESSA ROTINA ESTÁ SOB AnÁLISE JUNTO COM [] /cadastro-produto' -linha  17 e linha 130 ]
// router.post('/cadProduto',(req,res)=>{
//      console.log('-----------------------------')
//      console.log('-linha 134-------------------')
//      console.log('-----------------------------')
//       let g=req.body
//       let descritivo=g.descritivo;
//       let seg=g.seg;
//       let seg01=g.seg01;
//       let seg02=g.seg02;
//       let id0=g.id0;
//       let id1=g.id1;
//       let id2=g.id2;
//       let id3=g.id3;
//       // -------------------------------------------------------------------------
   
//         new Produto( {
//                      descritivo:`${descritivo}`,
//                      palavrachaves:[
//                      `${ id0}`,
//                      `${ id1}`,
//                      `${ id2}`,
//                      `${ id3}`,
//                     ],
//                     segmento:[
//                         `${ seg}`,
//                     ],
//                     segmento01:[
//                         `${ seg01}`,
//                     ],
//                     segmento02:[
//                         `${ seg02}`,
//                     ],
//                    })
//                    .save().then((produt)=>{
//                        console.log(produt)
//                        res.redirect('cadastro-produto')
//                        //res.send("Segmento  cadastrado com sucesso!")
//                    }).catch((err)=>{
//                        console.log(err)
//                        res.send(err)
//                    })
// })






module.exports = router;



//router.get('/produto-segdois/:id',(req,res)=>{
//      console.log('------------------------------')
//      console.log('linha 134 -----get/produto-segdois')
//      let seg=req.params;
//      console.log('linha 201',seg)
//      let r=Object.values(seg);
//      console.log('valor de r',r)
//      //let [p]=r;
//      Produto.find({segmento02:`${r}`},{codigo:1,descritivo:1}).sort({descritivo:1})
//             .then((result)=>{
//                  //console.log(result)
//                  
//                  res.send(result)
//             })
//             .catch((e)=>{
//                  console.log(66)
//             })
// })

 //router.get('/lojista-segdois/:id',(req,res)=>{
 //     console.log('----------------------------')
 //     console.log('linha 153  >>get/_lojista/lojista-segdois/:id')
 //     let seg=req.params;
 //     console.log('linha 220',seg)
 //     let r=Object.values(seg);
 //     let [p]=r;
 //     console.log('(158)valor de p',p)
 //     Produto.find({codigo:`${p}`},{lojista:1})
 //            .then((result)=>{
 //                 let [W]=result;
 //                 //console.log('valor de W',W)
 //                 let Q=W.lojista;
 //                 console.log('valor de Q',Q)
 //                 res.send(Q)
 //             })
 //             .catch((e)=>{
 //                 console.log(e)
 //             }) 
//
// })
