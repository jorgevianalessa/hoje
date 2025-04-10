const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const csv=require('csvtojson');
require('../../models/fornecedor');
const Fornecedor = mongoose.model('fornec');
require('../../models/prod_lojista');
const Prodlojista = mongoose.model('prod_lojista');
require('../../models/segmentos');
const Segmento = mongoose.model('segmento');
require('../../models/prod_temp');
const ProdTemp = mongoose.model('prod_temp');
const Lojista=mongoose.model('lojista');

router.get('/add-produto/:id',(req,res)=>{
    console.log('--------------------------------------')
    console.log('(linha 10 --> _lojista/lj_fornecedore/add-produto/:id')
    console.log('vem de views/_cooperado/produto/cadastro-produt')
    console.log(req.params)
    let c=req.params;
    let [h]=Object.values(c)
    let position = h.search("<->");
    let fornec=h.slice(0,position)
    console.log(fornec)
    let p=position+3;
    let z=h.length;
    let x=(z -p);
    //::::::::::::::::::::::::::::::::
    let rz=h.slice(p,z)
    console.log(rz)
    Fornecedor.findOne({razao:h})
              .then((f)=>{
                console.log('vr de f',f)  
                if(f='null'){
                   fornec=fornec;
                   res.render('_cooperado/produto/cadastro-produt',{ layout:'participe.handlebars',fornec:fornec,razao:rz})
                }else{
                       console.log('2',f)
                       res.render('_cooperado/produto/cadastro-produt',{ layout:'participe.handlebars',fornec:f,razao:rz})
                }
              })
              .catch((e)=>{
                console.log(e)
              })
})

router.get('/importando-produto/:id', async (req,res)=>{
    console.log('-----------------------67---------------')
    console.log('(linha 42 --> /_lojista/lj_fornecedor/import-produto/:id')
    console.log('vem de views/_cooperdao/lojista/lj-cadastro-fornecedor')
    console.log('vem de views/_cooperdao/lojista/lj-lista-fornecedor')
    let [h]=Object.values(req.params);
    let position = h.search("<->");
    let fornec=h.slice(0,position)
    console.log(fornec)
    let p=position+3;
    let z=h.length;
    let x=(z -p);
  //::::::::::::::::::::::::::::::::
  let rz=h.slice(p,z)
  console.log(rz)
    await  Fornecedor.findOne({razao:fornec})
              .then((f)=>{
               console.log('valor de f',f)  
               res.render('_cooperado/produto/import-produto',{ layout:'participe.handlebars',})
              res.render('_cooperado/lojista/lj-importando-lista',{ layout:'participe.handlebars',fornec:f})
               let q=f.marca;
               console.log(q)
                // +++++++++++++++++++++++++++++++++++++++++
                    // ProdTemp.find({},{_id:0})
                    // .then((temp)=>{
                    //     const R=Object.values(temp);
                    //     console.log('linha 215',R.length)
                    //     //res.send(R)
                    // })
                    // .catch((e)=>{
                    //   console.log(e)
                    // })
                // :::::::::::::::::::::::::::::::::::::::::::::::::::
                console.log(88989)
  //              Prodlojista.findOne({'fornecedores.marcafornec':q})
  //                         .then((reg)=>{
                        //       console.log(reg)
                        //       if(Object.keys(reg).length=== 0){
                        //         console.log('vr de vazio')
                        //         res.render('_cooperado/produto/import-produto',{ layout:'participe.handlebars',fornec:f})
                        //       }else{
                        //         console.log('vr de reg')
                        //         res.render('_cooperado/produto/update-produto',{ layout:'participe.handlebars',fornec:f,chaves:reg})
                        //       }
                              
                        //    })
                        //    .catch((e)=>{

                        //    })
                
              })
              .catch((e)=>{
                console.log(e)
              })
   
})

router.get('/gravaprodvisorio/:id',async (req,res)=>{
  console.log('--------------------------------')
  console.log('linha 170    ---> post/_admin/fornecedores/gravaprodvisorio/:id')
  console.log("vemde view/_cooperados/produto/import-produto")
  //gravra o arquivo de transferencia em uma tabela provisória.
   let arquivo=req.params;
   let folder;
   console.log('linha 109 => arquivo',arquivo)
   //--------------------------------------------
   let [arq]=Object.values(arquivo)
   let l=arq.length;
   let p=arq.search(";")
   //folder=arq.slice(p+1);
   folder="comercial_lavanda"
   console.log('vr da pasta1',folder)
  //.......................................................................
  arq=arq.slice(0,p);
  console.log('vr de arq',arq)
   var fs=require('fs')
   var m=fs.readFileSync('arquivos/' + `${folder}` + '/' + `${arq}`,'utf-8')
   const b=m.replace( /,/g, '.');
 //  console.log('nome do arq-->',arq)
 //  console.log('as linha do arq',b)
   let d=Date.now().toString()
   //arq=arq + '-' + d;
   fs.writeFileSync('arquivos/' +  `${folder}` + '/' + `${d}` +  '-' + `${arq}`, b)
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  csv({
          noheader: true,
          headers: ['header1','header2']
      })
      .fromFile('arquivos/' +  `${folder}` + '/' + `${arq}`)
      .then(csvData =>{
          let len=csvData.length;
          let codigo={};
          let descricao={}
          let r1=0;
          for(i=0;i<len;i++){
                    if(i==0){
                      //console.log(csvData[i])
                      //console.log('--------------------K---------------------------')
                    }else{
                      let campo=csvData[i];
                      let [w]=Object.values(campo)
                      let len=w.length;
                      let n=w.search(";")
                      let codigo=w.substr(0,n);
                      //   console.log('------------------------------------------------------------')
                      let palavra;
                      palavra=w.slice((n+1),len);
                      // console.log('--------------------------------------------------------------')
                      let n1=palavra.search(";");
                      descritivo=palavra.substr(0,n1);
                      descritivo=descritivo.trim("");
                      // console.log('--------------------------------------------------------------')
                      new ProdTemp({
                        codigo:codigo,
                        descritivo:descritivo,
                        })
                        .save()
                        .then((temp)=>{
                            r1=r1++;
                            if(r1>175){
                              console.log(1000)
                              console.log("produto provisório ??",r1,'-------',temp);
                            }
                        }).catch((err)=>{
                            console.log('vr de err',err)
                        })
                    }
          }
      })
      .catch((e)=>{
        console.log(e)
      })
      //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
       await ProdTemp.find({},{_id:0})
      .then((temp)=>{
          const R=Object.values(temp);
          console.log('linha 215',R.length)
          res.send(R)
      })
      .catch((e)=>{
        console.log(e)
      })
    
    
})
// ESSA ROTINA : vem [ _admincooperados/produto/importar ] <--> vai [ _cooperado/lojista/lj-lista-fornecedor.handlebars ]
router.get('/buscforneccnpj/:id',(req,res)=>{
    console.log('--------------------------')
    console.log('(192 _lojista/lj_fornecedor/get/buscfornec-cnpj--')
    console.log(' vem de --------------------------')
    var [n1]  =Object.values(req.params);
    console.log(n1)
    //const n3=n1.replace(  /./g, '/');
    let n3=n1.replace("-bbb-","/")
    console.log(n3)
    Fornecedor.findOne({cnpj:n3},{razao:1,_id:0})
              .then((fr)=>{
                   console.log('valor de fr',fr)
                   if(fr='null'){
                      console.log('jj')
                      fr={
                        id:'não há nada registrado!'
                      }
                      res.send(fr)
                   }else{
                    console.log('cc')
                     res.send(fr)
                   }  
              })
              .catch((err)=>{
                console.log(err)
              })
})

router.get('/pegasegmento/:id',(req,res)=>{
  // Essa rotina vem do menu sidebar/admin central para gerar a lista de fornecedores
  console.log("");
  console.log('-------------------------------------------') 
  console.log('(226) --> get/_admin/mn_fornecedores/fornec')
  console.log('vem de views/partials/siderbarACentral=AdministraçãoCentral')
  console.log('vem de admin/central/menu-cadastro-fornecedores')
  console.log('-------------------------------------------') 
  console.log("")
  let Q=req.body;
  let rz=Q.r;
  console.log('vr de ERRe',Q)
  // Essa rotina é de passagem do menu para a lista de fornecedores
  Lojista.find({razao:`${rz}`},{segmento:1,_id:0})
          .then((seg)=>{
              seg.sort()
              console.log(seg)
             // res.render("_cooperado/lojista/cad-fornecedor", {layout:'participe.handlebars',segment:seg,client:Q})
            })    
          .catch((err)=>{
               console.log(err)
          })    
})

module.exports = router;