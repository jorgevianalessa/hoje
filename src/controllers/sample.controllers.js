const { render } = require("express-handlebars");
const { ObjectId } = require("mongodb");
const mongoose = require('mongoose');

// require('../models/roupa_estoque');
// const Roupa = mongoose.model('roupa_estoque');
require('../models/sample_alimentacao');
const Alimentacao = mongoose.model('sample_alimentacao');

require('../models/sample_mconstrucao');
const Sample = mongoose.model('sample_mconstrucao');

require('../models/lojista');
const Lojista = mongoose.model('lojista');


const uploadFile =async (req,res) =>{
    console.log('¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
    console.log('');
    console.log('___________________________________');
    console.log('');
    console.log(' [ 25 sample.controllers ]');
    console.log(' origem views : src/libs/multer.js');
    console.log(' origem route : src/controllers/index.controllers.js');
    console.log(' obs : aqui grava no MongoDb o path da imagem da OceanDigital');
    console.log('');
    console.log(' destino : 45000');
    console.log('');
    console.log(' ___________________________________');
    console.log('');
    //......................................................
    let corpo=req.body;
    let local=req.file.location;
    let idLojista;
    console.log('body :',corpo);
    console.log('____________________________________________________')
    //........................................................
    let segmento=corpo.nameSegmento;
    console.log('');
    console.log( 'local => ',local);
    console.log('');
    console.log( 'segmento => ',segmento);
    console.log('________________________________________________________');
    console.log('[49]');
    
    if (segmento==="Alimentação"){
        let loja_id=corpo.nameLoja_id;
        let lojaMarca=corpo.nameLojaMarca;
        let codigo=corpo.nameCodigo;
        let prato=corpo.namePrato;
        let acompanhamento=corpo.nameAcompanhamento;
        let numeropessoas=corpo.nameNumeropessoas;
        let preco=corpo.namePreco;
        let artigo=corpo.nameArtigo;
        inserirAlimentacao(loja_id,lojaMarca,codigo,prato,acompanhamento,numeropessoas,preco,artigo,local) 
       
    }else if(segmento==='Material de Construção'){
        console.log(6000)
        let loja_id=corpo.nameLoja_id;
        let lojaMarca=corpo.nameLojaMarca;
        let cidade=corpo.nameCidade;
        let bairro=corpo.nameBairro;
        let fornec=corpo.nameFornec;
        let codigo=corpo.nameCodigo;
        let descricao=corpo.nameDescricao;
        let complete=corpo.nameComplemento;
        let material=corpo.nameMaterial;
        let custo=corpo.nameCusto;
        let vista=corpo.nameVista;
        let prazo=corpo.namePrazo;
        let segmento=corpo.nameSegmento; 
        let setor=corpo.nameSetor;
        let secao=corpo.nameSecao;
        //let marcaItem=corpo.nameMarcaItem;
        console.log(' [ 71 ]')
        inserirContrucao(loja_id,lojaMarca,cidade,bairro,fornec,codigo,descricao,complete,material,custo,vista,prazo,segmento,setor,secao,local) 
    }else{
        console.log("Fora!")
    }
   
    
   

async function inserirAlimentacao(loja_id,lojaMarca,codigo,prato,acompanhamento,numeropessoas,preco,artigo,local){
        console.log('dentro inserirFoto')
        await Alimentacao.insertMany({
            marcaloja:`${lojaMarca}`,
            loja_id:`${loja_id}`,
            codigo:`${codigo}`,
            prato:`${prato}`,
            acompanhamento:`${acompanhamento}`,
            numeropessoas:`${numeropessoas}`,
            preco:parseFloat(`${preco}`),
            artigo:`${artigo}`,
            page:'default',
            pageposicao:0,
            pageurl:`${local}`,
            pageok:'ok',
            ponto:0,
            setor:[
                    {
                      setor: `${setor}`,
                      template:"loja",
                      material:artigo,
                      sub:[
                          {depto:artigo}
                      ]
                    }
                  ]
        })
        .then((result)=>{
             console.log('');
             console.log('____________________________');
             console.log('result',result)
             console.log('');
             console.log('____________________________');
             //////////////////////////////////////////////
             Lojista.findOne({_id:loja_id})
                    .then((lojista)=>{
                        console.log('______________________________');
                        console.log(lojista); 
                        console.log('______________________________');
                          Alimentacao.find({loja_id:loja_id})
                              .then((result)=>{
                                console.log('______________________________');
                                console.log(result);
                                console.log('______________________________');
                               // return
                                res.render("_cooperado/sample/alimentacao/cad_alimentacao_produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result:result});
                              })
                              .catch((e)=>{
                                console.log(e);
                              })
                        
                    })
                    .catch((e)=>{
                        console.log(e)
                    })
            ///////////////////////////////////////////////////        
        })
        .catch((e)=>{
            console.log(e)
        })


     }

async function inserirContrucao(loja_id,lojaMarca,cidade,bairro,fornec,codigo,descricao,complete,material,custo,vista,prazo,segmento,setor,secao,local){
        console.log('dentro inserirConstrução')
        await Sample.insertMany({
            loja_id:`${loja_id}`,
            marcaloja:`${lojaMarca}`,
            cidade:`${cidade}`,
            bairro:`${bairro}`,
            codigo:`${codigo}`,
            fornecedor:`${fornec}`,
            descricao:`${descricao}`,
            complete:`${complete}`,
            referencia:`${material}`,
            precocusto:parseFloat(`${custo}`),
            precovista:parseFloat(`${vista}`),
            precoprazo:parseFloat(`${prazo}`),
            artigo:'default',
            //marcaItem:`${marcaItem}`,
            page:'default',
            pageposicao:0,
            pageurl:`${local}`,
            pageok:'ok',
            ponto:0,
            localizacao:[
                    {
                      segmento: `${segmento}`,
                      setor:[
                             {
                               nameSetor:`${setor}`,
                               secao:[ 
                                    {nameSecao:`${secao}`}
                               ],
                            },
                      ],
                    }
                  ]
        })
        .then((result)=>{
             console.log('');
             console.log('____________________________');
             console.log(' [ 187 ] src/controllers/sample.controllers.js')
             console.log('',result);
             console.log('____________________________');
             //////////////////////////////////////////////
             Lojista.findOne({_id:loja_id})
                    .then((lojista)=>{
                        console.log('______________________________');
                        console.log(' [ 194 ]',lojista); 
                        console.log('______________________________');
                        Sample.find({loja_id:loja_id})
                              .then((result)=>{
                                console.log('______________________________');
                                console.log(result[0]);
                                console.log('______________________________');
                                res.render("_cooperado/sample/materialconstrucao/cad_produto",{ layout:'sample/formata-produto.handlebars',lojista:lojista,result:result});
                              })
                              .catch((e)=>{
                                console.log(e);
                              })
                        
                    })
                    .catch((e)=>{
                        console.log(e)
                    })
            ///////////////////////////////////////////////////        
        })
        .catch((e)=>{
            console.log(e)
        })

       
    }
  
    
 

    function Extras(){
        logo_marca()
            function logo_marca(side){
                if(side=='tipolista'){
                    logo_lojotipo()
                }else if(side=='logomarca'){
                    logo_marca()
                }else if(side=='titulopage'){
                    titulopage()
                }
            }
    
            function logo_lojotipo(){
                    Lojista.updateOne(
                                {_id:`${idLojista}`},
                                { $set:{
                                        'urllogolista':`${local}`,
                                    }
                                },
                            )
                            .then((r1)=>{
                                console.log('tipo lista ',r1);
                                Lojista.findOne({ _id:idLojista},{urllogolista:1,urllogomarca:1,urltitulopage:1})
                                        .then((r2)=>{
                                            console.log('......>',r2);
                                            res.render("_cooperado/templates/roupa-header-logo",{ layout:'lojista/admin-loja.handlebars',idLoja:idLojista,r1:r2});
                                        })
                                        .catch((er)=>{
                                            console.log(er) ;
                                        })
                                })
                            .catch((er)=>{
                                console.log(' [ 402 index.controllers  ] src/controllers/index.controllers.js ',er)
                            })
            }
     
            function logo_marca(){
                    Lojista.updateOne(
                        {_id:`${idProduto}`},
                        { $set:{
                                'urllogomarca':`${local}`,
                            }
                        },
                        )
                    .then((r1)=>{
                        console.log('logomarca : ',r1);
                        Lojista.findOne({ _id:idLojista},{urllogolista:1,urllogomarca:1,urltitulopage:1})
                                            .then((r2)=>{
                                                console.log('......>',r2);
                                                res.render("_cooperado/templates/roupa-header-logo",{ layout:'lojista/admin-loja.handlebars',idLoja:idLojista,r1:r2});
                                            })
                                            .catch((er)=>{
                                                console.log(er) ;
                                            })
                    })
                    .catch((er)=>{
                        console.log(' [ 424 index.controllers ] src/controllers/index.controllers.js ',er)
                    }) 
            }
    
            function titulopage(){
                    Lojista.updateOne(
                        {_id:`${idProduto}`},
                        { $set:{
                                'urltitulopage':`${local}`,
                            }
                        },
                    )
                    .then((r1)=>{
                        console.log(' match titulo page',r1);
                        Lojista.findOne({ _id:idLojista},{urllogolista:1,urllogomarca:1,urltitulopage:1})
                                .then((r2)=>{
                                    console.log(' titulo page : ',r2);
                                    res.render("_cooperado/templates/roupa-header-logo",{ layout:'lojista/admin-loja.handlebars',idLoja:idLojista,r1:r2});
                                })
                                .catch((er)=>{
                                    console.log(er) ;
                                })
                    })
                    .catch((er)=>{
                        console.log(' [ 446 index.controllers  ] src/controllers/index.controllers.js ',er)
                    })   

            }
    }

    function  loaddirect1(idProduto){
        console.log(idProduto)
        Sample.findOne({_id:idProduto})
                 .then((resultado)=>{
                       console.log('');
                       console.log(' [ 583 index.controllers ] vitrine =>',resultado)
                       console.log('');
                    //    [vitrine]=vitrine;
                       console.log(resultado)
                       carregaPage1(idProduto)
                       //.....................................................
               
                 })
                 .catch((err)=>{
                    console.log('error',err);
                 })
        //??????????????????????????????????????????????????????????????
     
    }

    function carregaPage1(loja_id){
        console.log('valor de idProduto :',loja_id)
        console.log('');
        /////////////////////////////////////////////////////
        Lojista.findOne({_id:loja_id})
               .then((lojista)=>{
                    Sample.find({loja_id:loja_id})
                          .then((result)=>{
                              console.log('10',result);
                              console.log('');
                              let local=`${local}`
                              console.log('_______________________________________________________');
                              res.render("_cooperado/sample/materialconstrucao/cad_construcao_produto",{ layout:'lojista/roupa-edita-temp.handlebars',result:result,lojista:lojista,local});  
                              console.log('_____________________________');
               })
               .catch((e)=>{
                  console.log(e);
               })
               })
               .catch((e)=>{

               })
    }         
}         


const getFiles =async (req,res) =>{
    console.log(8888)
    const images = await Image.find()
    console.log(images)
    res.render('files',{
        title:'Get files',
        images
    })
};

const getSingleFile = (req,res)=>{};

module.exports = {
    getFiles,
    getSingleFile,
    uploadFile
}


 //async function outra_foto(){
   //     if (side=='front'){
   //         console.log('aqui dentro front')
   //         console.log('-----',idcorfoto)
   //         console.log('');
   //         await  Roupa.updateOne(
   //                             {_id:`${idcorfoto}`},
   //                             { $set:{
   //                                 urlfront:`${local}`,
   //                                 }
   //                             },
   //                        )   
   //                       .then((extensao)=>{
   //                         console.log('');
   //                         console.log('extensao left :',extensao)
   //                         console.log('');
   //                         console.log(' [ 300 index.controllers ] idProduto dentro de left',idProduto,idcorfoto)
   //                         console.log('')
   //                         console.log('______________________________________');
   //                        loaddirect(idProduto,idcorfoto,side,t)
   //                 })
   //                 .catch((er)=>{
   //                     console.log(er)
   //                 })
   //             //}  
   //     }else if(side=='left'){
   //         console.log('aqui dentro left=3')
   //         console.log('-----',idcorfoto)
   //         console.log('');
   //         await  Roupa.updateOne(
   //             {_id:`${idcorfoto}`},
   //             { $set:{
   //                   urlleft:`${local}`,
   //                 }
   //             },
   //         )   
   //         .then((extensao)=>{
   //             console.log('');
   //             console.log('extensao left :',extensao)
   //             console.log('');
   //             console.log(' [ 324 index.controllers ] idProduto dentro de left',idProduto,idcorfoto)
   //             console.log('')
   //             console.log('______________________________________');
   //             //....................................
   //             loaddirect(idProduto,idcorfoto,side,t)
   //         })
   //         .catch((er)=>{
   //             console.log('error 275',er)
   //         })
   //     }else if(side=='back'){
   //         console.log('1 :',idProduto,    '2 :',local)
   //         await  Roupa.updateOne(
   //             {_id:`${idcorfoto}`},
   //             { $set:{
   //                    urlback:`${local}`,
   //                 }
   //             },
   //         )   
   //         .then((extensao)=>{
   //             console.log('');
   //             console.log('extensao back :',extensao);
   //             console.log('');
   //             console.log('idProduto dentro de back',idProduto)
   //             console.log('')
   //            console.log('_________________________________________');
   //             loaddirect(idProduto,idcorfoto,side,t)
   //         })
   //        .catch((er)=>{
   //             console.log(er)
   //         })
   //     }else if(side=='right'){
   //         await  Roupa.updateOne(
   //             {_id:`${idcorfoto}`},
   //             { $set:{
   //                   urlright:`${local}`,
   //                 }
   //             },
   //         )   
   //         .then((extensao)=>{
   //             console.log('');
   //             console.log('extensao right :',extensao)
   //             console.log('');
   //             console.log('boxBody dentro de right',idProduto,idcorfoto)
   //             console.log('')
   //             console.log('______________________________________________');
   //             loaddirect(idProduto,idcorfoto,side,t)
   //         })
   //         .catch((er)=>{
   //             console.log(er)
   //         })
   //     }else{
   //         console.log('bingo!')
   //     }
   // }

   //async function primeira_foto(side,t){
   // console.log('primeira foto')
   // res.send(local)
   // return
  //  updatePrime(idProduto,t)
  //  loaddirect1(loja_id,side,t)

  

    

    ///////////////////////////////////////////////////////////////////////// 
 //  function updatePrime(idProduto,t){
 //          Sample.updateMany(
 //            {
 //                $and:[
 //                    {_id:idProduto},
 //                    {loja_id:loja_id},
 //                    ]
 //            },
 //            { $set:{
 //                    pageurl:`${local}`,
 //                    pageok:'ok'
 //                   }
 //                   
 //            },{upsert:true}
 //        )
 //        .then((result_)=>{
 //          console.log('  ');
 //          console.log('___________________________________________________  '); 
 //          console.log('result_ :',result_)
 //          console.log('  ');
 //        })
 //        .catch((er)=>{
 //        console.log('[ 138 ] index.controllers ]',er)
 //        })
  // }
//}
