const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../../models/fornecedor')
const Fornecedor = mongoose.model('fornec')
//require('../../models/prod_lojista')
//const Prodlojista = mongoose.model('prod_lojista')

//require('../../models/roupa_estoque')
//const RoupaEstoque=mongoose.model('roupa_estoque')
const csv=require('csvtojson')
require('../../models/segmentos_')
const Segmento = mongoose.model('segmentos')
const path =require('path')
const console = require('console')
const { ObjectID } = require('bson')
let varGlobal;


//Ok { Falta concluir a entrada do primeiro produto}
router.post('/gravafornec',(req,res)=>{
    // Essa rotina vem da lista de fornecedores / admin central e cadastra o fornecedore Geral
    console.log(' [ 23 ]'); 
    console.log('_______________________________________________________________') ;
    console.log(' origem : vem de views/_cooperado/menu-produto/cadastro-fornec');
    console.log(' route : post/fornec/fornecedores/gravafornec');
    console.log(''); 
    console.log(' obs: ');
    console.log(' destino :');  
    console.log('req.body : ',req.body)

    let r=req.body.raz3o;
    r=r.trim();
    
    let a=req.body.cnj3;
    a=a.trim();

    let m=req.body.marc3;
    m=m.trim();

    let em=req.body.ema3l
    em=em.trim();

    let segmento=req.body.inputSegmento;
    segmento=segmento.trim();
    console.log('.....',segmento)

    let cep=req.body.inputCep;
    cep=cep.trim();

    let numero =req.body.inputNumero;
    numero=numero.trim();

    let cidade=req.body.inputCidade;
    cidade=cidade.trim();

    let bairro=req.body.inputBairro;
    bairro=bairro.trim();

    let estado =req.body.inputEstado;
    estado=estado.trim();
    ///////////////////////////////////////////////////
    let lojaid=req.body.lojaid;
    lojaid=lojaid.trim();
    let lojarazao=req.body.lojarazao;
    lojarazao=lojarazao.trim();
    let lojasegmento=req.body.lojasegmento;
    console.log(lojasegmento);
    lojasegmento=lojasegmento.trim();
    console.log('vr de segmento------',lojasegmento)
    ////////////////////////////////////////////////////
    new Fornecedor(
                    {
                    razao:`${r}`,     // razao
                    cnpj:`${a}`,      // cnpj
                    marca:`${m}`,     // marca 
                    email:`${em}`,    // email
                    segmento:[
                      {titulo:`${segmento}`},
                    ],
                    lojisa:[

                    ],
                    lojista:[
                      {
                        lojaid:`${lojaid}`,
                        lojaname:`${lojarazao}`,
                        lojasegmento:`${lojasegmento}`
                      }
                    ],
                    cep:`${cep}`,
                    numero:`${numero}`,
                    cidade:`${cidade}`,
                    bairro:`${bairro}`,
                    estado:`${estado}`,
                    //produtos:[{codigo:`${cod}`,descritivo:`${prod}`}]
                    }
            )
            .save()
            .then(()=>{
                console.log('passou aqui')
                res.redirect('/mnfornec/fornec')
               // res.send("Contato cadastrado com sucesso!")
            }).catch((err)=>{
                console.log('vr do err',err)
              res.send(err)
            })
})

//Ok
router.post('/fornec',(req,res)=>{
  // Essa rotina vem do menu sidebar/admin central para gerar a lista de fornecedores
  console.log('-------------------------------------------') 
  console.log('(104) --> get/_admin/mn_fornecedores/fornec')
  console.log('vem de views/admin/admincooperado')
  console.log('vem de admin/central/menu-cadastro-fornecedores')
  console.log('-------------------------------------------') 
  console.log("")
  let Q=req.body;
  console.log('vr de Q',Q)
  // Essa rotina é de passagem do menu para a lista de fornecedores
  Segmento.find({},{segmento:1,_id:0})
          .then((seg)=>{
              console.log(seg)
              seg.sort()
              res.render("_admin/admin/main_cad-fornecedor", {layout:'participe.handlebars',segment:seg,client:Q})
            })    
          .catch((err)=>{
               console.log(err)
          })    
})

router.get('/fornec',(req,res)=>{
  // Essa rotina vem do menu sidebar/admin central para gerar a lista de fornecedores
  console.log("");
  console.log(' [ 136 ]') ;
  console.log('________________________________________');
  console.log(' origem : views/_admin/admin-central.handlebars');
  console.log(' route :  admin-central/menulateral/fornecedores/cadastro');
  console.log(' obs: ');
  console.log('');
  console.log(' destino : views/_admin/admin/cad-fornecedor ');
  console.log('');
  console.log('______________________________________________________');
  let Q=req.body;
  console.log('req.body :',Q)
  // Essa rotina é de passagem do menu para a lista de fornecedores
  Segmento.find({},{segmento:1,_id:0})
          .then((seg)=>{
              console.log(seg)
              seg.sort()
              res.render("_admin/admin/cad-fornecedor", {layout:'central/cad-fornecedor.handlebars',segment:seg,client:Q})
            })    
          .catch((err)=>{
               console.log(err)
          })    
})

router.get('/fornec/:id',(req,res)=>{
  // Essa rotina vem do menu sidebar/admin central para gerar a lista de fornecedores
  console.log('-------------------------------------------') 
  console.log('(140) --> get/_admin/fornecedores/fornec')
  console.log('vem de views/admin/admincooperado')
  console.log('vem de admin/central/menu-cadastro-fornecedores')
  console.log('-------------------------------------------') 
  console.log("")
  // Essa rotina é de passagem do menu para a lista de fornecedores
  Segmento.find({},{segmento:1,_id:0})
          .then((seg)=>{
              console.log('vr dos segemnto',seg)
              seg.sort()
              res.render("_admin/admin/main_cad-fornecedor", {layout:'participe.handlebars',segment:seg})
            })    
          .catch((err)=>{
               console.log(err)
          })    
})

router.get('/listfornec',(req,res)=>{
   //console.log('');
   //console.log('----------------------------------------');
   //console.log('100 = mnfornec/listfornec');
   //console.log('vem de views/_admin/admin/main_importadando-list');
   //console.log('----------------------------------------');
   //console.log('');
   //Fornecedor.find({})
   //          .then((resp)=>{
   //              console.log(resp)
   //          })
   ///          .catch((err)=>{

   //          })
})

// Ok falta mandar a resposta para front
router.get('/buscacnpj/:id',(req,res)=>{
    // Faz uma busca para averiguação se o fabricante já consta no cadastro GERAL
    console.log('-----------------------------------------------')
    console.log('(72) --> post/_admin/fornecedores/busca_cnpj/:id')
    console.log('vem do views/(_admin/fornecedores)=[fornec]/list-produto-fornec')
    let fabricante=Object.values(req.params)
    console.log('valor do fabricante',fabricante)
    let letra=fabricante[0];
    let trocaletra=letra.replace("A",".")
    let result = trocaletra.replace("A", ".");
    result=result.replace("B","/");
    result=result.replace("C","-")
    let w={}
     Fornecedor.findOne({cnpj:result},{cnpj:1,_id:0})
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

router.get('/adicionar-produto/:id',(req,res)=>{
  console.log('--------------------------------------')
  console.log('(linha 126 --> get/_admin/fornecedores/add-produto/:id')
  console.log('vem de views/_cooperdao/produto/cadastro-produt')
  console.log(req.params)
  let c=req.params;
  let [h]=Object.values(c)
//   console.log('vr de h',h)
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
                 res.render('_admin/admin/main_cad-produtos',{ layout:'participe.handlebars',fornec:fornec,razao:rz})
              }else{
                     console.log('2',f)
                     res.render('_admin/admin/main_cad-produtos',{ layout:'participe.handlebars',fornec:f,razao:rz})
              }
            })
            .catch((e)=>{
              console.log(e)
            })
  
})

router.get('/import-produto/:id', async (req,res)=>{
    console.log('--------------------------------------')
    console.log('(linha 126&&&&& --> get/_admin/fornecedores/import-produto/:id')
    console.log('vem de views/_cooperdao/produto/cadastro-produt')
   // console.log('alo1',req.params)
    let q=Object.values(req.params);
   
    await  Fornecedor.findOne({marca:q})
              .then((f)=>{
               // console.log('valor de f',f)  
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
                Prodlojista.findOne({'fornecedores.marcafornec':q})
                           .then((reg)=>{
                              if(Object.keys(reg).length=== 0){
                                console.log('vr de vazio')
                                res.render('_cooperado/produto/import-produto',{ layout:'participe.handlebars',fornec:f})
                              }else{
                                console.log('vr de reg')
                                res.render('_cooperado/produto/update-produto',{ layout:'participe.handlebars',fornec:f,chaves:reg})
                              }
                           })
                           .catch((e)=>{

                           })
              })
              .catch((e)=>{
                console.log(e)
              })
   
})

router.get('/gravaprodvisorio/:id',async (req,res)=>{
    console.log('--------------------------------')
    console.log('linha 170 ???   ---> post/_admin/fornecedores/gravaprodvisorio/:id')
    console.log("vem de view/_cooperados/produto/import-produto")
    //gravra o arquivo de transferencia em uma tabela provisória.
    let arquivo=req.params;
    console.log(arquivo)
    
    console.log(123456)
    // return
    let [arq]=Object.values(arquivo)
    console.log('vr do arquivo',arq)
    let Bola={};
    ////////////////////////////////////////////////
    await ProdTemp.deleteMany({})
            .then((r)=>{
               console.log(123)
            })
            .catch((err)=>{
                console.log(err)
            })
    ///////////////////////////////////////////////////////////////////////      
    console.log(1)
    buscaArquivo()

    async function buscaArquivo(){
                console.log('linha 2',2)
                const fs=require('fs')
                const folderName='/Users/Rotaes/Estoquetransfer/txt';
                const folderPath=folderName;
                let dir=path.dirname(folderPath)
                console.log('diretorio => : ',dir)
                fs.readdirSync(dir)
                var m=fs.readFileSync(dir  + '/' + `${arq}`,'utf-8')
                // console.log('vr de m',m)
                let folder;
             //   folder="EstoqueTransferido"
                const b=m.replace( /,/g, '.');
                console.log('vr de b',b)

                  await csv({
                    noheader: true,
                    headers: ['header1','header2']
                  })
                  .fromFile(dir  + '/' + `${arq}`)
                  .then(csvData =>{
                    MostracsvData(csvData) 
                  })
                  .catch((e)=>{
                    res.send('error')
                  })      
       }
              
    async function  MostracsvData(csvData) {
          const X=csvData;
          console.log(typeof(X))
          console.log('extra=>',X)
          let codigo={};
          let descritivo={}
            let len=csvData.length;
            console.log('número de produtos a serem transferidos(249)',len)
                    for(i=0;i<3;i++){
                        if(i==0){
                          console.log('publicando cabeçalho',csvData[i])
                          //console.log('--------------------K---------------------------')
                        }else{
                          let campo=csvData[i];
                          let [w]=Object.values(campo)
                          let len=w.length;
                          let n=w.search(";")
                          codigo=w.substr(0,n);
                          //------------------------------------------------------------')
                          let palavra;
                          palavra=w.slice((n+1),len);
                          //--------------------------------------------------------------')
                          let n1=palavra.search(";");
                          descritivo=palavra.substr(0,n1);
                          descritivo=descritivo.trim("");
                          const addProduto={
                              codigo:`${codigo}`,
                              descritivo:`${descritivo}`
                          }
                                console.log('vr de código',`${codigo}`,i)
                                console.log('vr da descrição',`${descritivo}`,i) 
                                    // .save()
                                    console.log('1245=>valor da adição',addProduto)
                              await ProdTemp.insertMany({
                                              addProduto
                                              })
                                              // .save()
                                              .then((temp)=>{
                                                  console.log("produto provisório =>",i,'-------',temp);
                                                // res.send(temp)
                                                  Bola={
                                                    item:temp, 
                                                  } 
                                              })
                                              .catch((err)=>{
                                                  console.log(err,i)
                                              })
                        }
                    }
                    // fim do for  
                    console.log('vr de Bola',Bola)
                    res.send(Bola)
                    console.log(3)
       }
})
          
 router.get('/lixo',(req,res)=>{
   //  let q=(folder1 +  arq)
    
    //  console.log('----------------------------------')
    //  var m=fs.readFileSync(q)
    //  console.log('vr de m',m)
    //  console.log('----------------------------------')
    //  console.log('***')
    // // const b=m.replace( /,/g, '.');
    //  console.log('****')
    //  let d=Date.now().toString()
    //  // Agora o arquivo recebe a data e milisegundo para ser gravado
    //  console.log('***&&&&&&&&&&&&&&&&&&')
    //  fs.writeFileSync('arquivos/' +  `${folder}` + '/' +  '-' + `${arq}`)
    // //  fs.writeFileSync('arquivos/' +  `${folder}` + '/' + `${d}` +  '-' + `${arq}`, b)
    // //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // // O arquivo [CSV] é um arquivo de ponto e vírgula fornecido pelo EXCEL
    
        // //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        // Busca os registro que foram gravado na tabela temporaria


        //{}{}{}{}{}{}{}
        // const H=Object.values(csvData)
// console.log(c);
// console.log(typeof(c))
// console.log(H);
//  Fornecedor.insertMany(csvData)
//            .then(function () {
//             console.log("Data inserted")
//             res.json({sucess:'sucess'});
//            })
        // {}{}{}{}{}{}{}
 })  
 
router.get('/importandoArquivo', async(req,res)=>{
     console.log('--------------------------------')
     console.log('linha 124    ---> post/_admin/fornecedores/importandoArquivo')
     console.log("vemde view/_cooperados/produto/impot-produto")
  
     var fs=require('fs')
     var m=fs.readFileSync('arquivos/wstaflex.txt','utf-8')
     const b=m.replace( /,/g, '.');
     console.log('---------------------------------------------------------------------------------')
     fs.writeFileSync('arquivos/' + 'westa.txt', b)

     csv({
           noheader: true,
           headers: ['header1','header2']
       })
       .fromFile("arquivos/westa.txt")
       .then(csvData =>{
           let len=csvData.length;
           let codigo={};
           let descricao={}
           for(i=0;i<len;i++){
                 if(i==0){
                   console.log(csvData[i])
                   console.log('-----------------------------------------------')
                 }else{
                   let campo=csvData[i];
                   let [w]=Object.values(campo)
                   console.log('valor de w :',w);
                   let len=w.length;
                   let n=w.search(";")
                   let codigo=w.substr(0,n);
                   console.log('vr do código :',codigo);
                   console.log('--------------------------------------------------------------')
                   let palavra;
                   palavra=w.slice((n+1),len);
                   // console.log('palavra: ',palavra)
                   console.log('--------------------------------------------------------------')
                   let n1=palavra.search(";");
                   descritivo=palavra.substr(0,n1);
                   descritivo=descritivo.trim("");
                   // console.log('código :',codigo ,' descrição :',descritivo)
                   console.log('--------------------------------------------------------------')
                   console.log('descrição do produto :',descritivo);
                   new Prodlojista({
                             codigo:codigo,
                             descritivo:descritivo,
                             })
                             .save()
                             .then(()=>{
                                 console.log("produto cadastrado com sucesso! ");
                             }).catch((err)=>{
                                 res.send(err)
                             })
                 }
           } 
        })
  })
   
router.post('/teste',async(req,res)=>{
   let r=req.body;
   console.log('')
   console.log('----------------------------------------------')
   console.log('vem de views/_cooperados/lojista/importando-lista')
   console.log('/////')
   console.log('----------------------------------------------')
   console.log('')
   //........................................
   await ProdTemp.deleteMany({})
   .then((result)=>{
      console.log('dentro de DleteMany',123)
   })
   .catch((err)=>{
       console.log(err)
   })
   //.............................................
   console.log('vr de r',r)
   let id=r.ident;
   let razao=r.rz;
   let cnpj=r.cnpj;
   let codigo;
   let descritivo;
   let custo;
   custo=67.78;
   let venda;
   venda=139.78;
   let medio;
   medio=80.89;
   let tamanho;
   tamanho='38';
   let cor;
   cor="preta"
   let qte;
   qte=6;
   let secao="Moda Feminina";
   let bola={}
   //...............................................
   const fs=require('fs')
      let arquivo=r.myfile;
      console.log('vr do arquivo',arquivo)
      const folderName='/Users/Rotaes/Estoquetransfer/txt';
      const folderPath=folderName;
      let dir=path.dirname(folderPath)
      console.log('diretorio => : ',dir)
      fs.readdirSync(dir)
      var m=fs.readFileSync(dir  + '/' + `${arquivo}`,'utf-8')
     // var m=fs.readFileSync(`${arquivo}`,'utf-8')
      console.log('vr de m',m)
      const b=m.replace( /,/g, '.');
      console.log('vr de b',b)
      await csv({
         noheader: true,
         headers: ['header1','header2']
      })
      .fromFile(dir  + '/' + `${arquivo}`)
      .then(csvData =>{
          MostracsvData(csvData) 
      })
      .catch((e)=>{
           res.send('error')
       })   
  //......................................................     
  async function  MostracsvData(csvData) {
      const X=csvData;
      console.log('csvData=>',X)
          let len=csvData.length;
          console.log('número de produtos a serem transferidos(249)',len)
          for(i=0;i<len;i++){
              if(i==0){
                console.log('publicando cabeçalho',csvData[i])
                //console.log('--------------------K---------------------------')
              }else{
                let campo=csvData[i];
                let [w]=Object.values(campo)
                let len=w.length;
                let n=w.search(";")
                codigo=w.substr(0,n);
                //------------------------------------------------------------')
                let palavra;
                palavra=w.slice((n+1),len);
                let n1=palavra.search(";");
                descritivo=palavra.substr(0,n1);
                descritivo=descritivo.trim("");
                //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                //::::::::::::::::::::::::::::::::::::::::::::::::::::::::     
                console.log(custo,venda,medio)
                console.log(tamanho,cor,qte)
                await ProdTemp.insertMany({
                        razao:`${razao}`,
                        cnpj:`${cnpj}`,
                        codigo:`${codigo}`,
                        descritivo:`${descritivo}`,
                        custo:`${custo}`,
                        venda:`${venda}`,
                        medio:`${medio}`,
                        tamanho:`${tamanho}`,
                        cor:`${cor}`,
                        qte:`${qte}`,
                        secao:[
                             `${secao}`
                        ]
                      })
                      .then((temp)=>{
                          console.log("produto provisório =>",i,'-------',temp);
                        // res.send(temp)
                          bola={
                            item:temp, 
                          } 
                      })
                      .catch((err)=>{
                          console.log(err,i)
                      })
              }
          } // término do for
                    // fim do for  
                   console.log('vr de Bola????',bola)
                   
                   res.redirect('/mnfornec/lista-produto/' + `${razao}`)
                   
    }     
   //..........................................................
})

router.get('/lista-produto/:id',(req,res)=>{
  console.log('ddddddd',varGlobal)
  let a=req.params;
  a=Object.values(a)
  console.log('valor vde ',a)
  return
  ProdTemp.find({})
          .then((result)=>{
            console.log('vr de result',result)
            res.render('_cooperado/lojista/lj-list-produto',{ layout:'participe.handlebars',razao:a,lista:result})
          })
          .catch((err)=>{
            console.log(err)
          })
  
})

router.get('/procurafornec/:id',(req,res)=>{
  console.log('')
  console.log('')
  console.log('')
  console.log('')
  console.log('')
    let n=req.params;
    console.log(n)
})


module.exports = router;
