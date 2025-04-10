//Carregando os módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// require("../models/new_produto")
// const ProdutoNew = mongoose.model('newproduto')
//require("../models/prod_lojista");
//const LojistaNew = mongoose.model('prod_lojista')
// require("../models/fornecedor")
//const Fornec = mongoose.model('fornec')
 require("../models/Usuario")
 const Usuario = mongoose.model('usuarios')
 const bcryptjs = require('bcryptjs')


router.get('/',async(req,res)=>{
        let senha="123456"

       await bcryptjs.genSalt(10,(erro,salt)=>{
                bcryptjs.hash(senha,salt,(erro,hash)=>{
                   if(erro){
                         res.send("Erro ao criptografar a senha!")
                   }else{
                        let senha_cript = hash   
                        console.log('userio')
                        new Usuario({
                                nome:"126",
                                email:"126gmail.com",
                                admin:1,
                                senha:senha_cript
                                }).save().then(()=>{
                                    res.send("Usuario cadastrado com sucesso!HHHH1000XXXX")
                                 }).catch((err)=>{
                                    console.log('..erro 22....',err)    
                                   // res.status(200).send('body')
                                   // res.send() 
                                 })
                   }     
                })
        })
       
      //   new Produto( {
      //               codigo:"111328",
      //               codigoBarra:11111,
      //               descritivo:"torneira jardim",
      //               especificacao:[{"acabamento":'verde',"comprimento":'30cm',"bitolas":'3/4'}],
      //               palavrachaves:["torneira",'jardim','material de construção','hobby'],
      //               segmento:'construção civil; hobby; jardim',
      //               fornecedores:[23],
      //               marca:'Rio Metais',
      //               id_lojista:['Comercial Lavanda'],
      //               }).save().then(()=>{
      //                   res.send("Contato cadastrado com sucesso!")
      //                }).catch((err)=>{
      //                    res.send(err)
      //                   //  res.status(status).send(body) 
      //                })
                  
       

                     // new Fornec( {
                     //    fabricante:"Flextaflex Tubos Flexiveis SA",
                     //    cnpj:"111.220.330/0003-00",
                     //    marca:"Flextaflex",
                       
                     //    }).save().then(()=>{
                     //        res.send("Contato cadastrado com sucesso!")
                     //     }).catch((err)=>{
                     //         res.send(json(err))
                     //        //  res.status(status).send(body) 
                     //     })
                     //     console.log(999999)  
                     // let cnpj=30098765-09;           
                     // let codB="9879876";
                     // let marca="Fabrimar";
                     // let preco=14.09;
                     
                     // let cnpj1=23.000-09;           
                     // let codB1="789.0000087";
                     // let marca1="wetaflex";
                     // let preco1=89.07;
                     // new LojistaNew(
                     //       {
                     //          codigo:"000000",
                     //          codigoBarra:789_6543_98,
                     //          descritivo:"Veneziana Auto-fechantes c/emb. 100/125mm",
                     //          // especificacao:[
                     //          //    {acabamento:'cromado'},
                     //          //    {comprimento:'30cm'},
                     //          //    {bitolas:'3/4'}
                     //          // ],
                     //          palavrachaves:[
                     //                 'torneira',
                     //                 'jardim',
                     //                 'material de construção',
                     //                 'hobby'
                     //          ],
                     //          segmento:[
                     //             'construção civil',
                     //             'jardim'
                     //          ],
                     //          segmento01:[
                     //                "hidraulica",
                     //                "jardim"
                     //          ],      
                     //          fornecedores:[
                     //             {
                     //                cnpjfornec:`${cnpj1}`,
                     //                marca:`${marca1}`,
                     //                produt:[
                     //                        [
                     //                            cbarra= `${codB1}`,
                     //                            preco=`${preco1}`,
                     //                        ]
                     //                ]
                     //              }
                     //          ],
                     //           lojista:[
                     //               {
                     //                   rzaoloja:'Emidio Paes',
                     //                   cnpjloja:`${cnpj1}`,
                     //                   fornex:{
                     //                      cnpj1:`${cnpj1}`,
                     //                      marca1:`${marca1}`
                     //                   },
                     //                    cbarra:"333.9900",
                     //                    preco:2003.00,
                     //               }
                     //          ],
                            
                     //     }
                      
                     //     ).save().then(()=>{
                     //        res.send("Contato cadastrado com sucesso!")
                     //     }).catch((err)=>{
                     //         res.send(err)
                     //        //  res.status(status).send(body) 
                     //     })
   })
   
module.exports=router;
