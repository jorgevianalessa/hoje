//Carregando os módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// require("../models/roupa_estoque");
// const EstoqRoupasNew = mongoose.model('roupa_estoque')


router.get('/',(req,res)=>{
                   new EstoqRoupasNew(
                           {
                              codigo:"000010",
                              descritivo:"Vestido Branco",
                              segmento:[
                                {
                                    titulo:'Roupas',
                                    subtitulo:{
                                        titulosub:"Roupas Festas",
                                        itens:[
                                            'vestido branco rendado',
                                            'vestido branco esportivo',
                                            'vestido branco gola alta',
                                            'vestido branco decote V',
                                        ]
                                    }         
                                }
                              ],
                              fornecedores:[   // unico devido código do produto obedecer o código do fabricante;
                                    {
                                        cnpjfornec:'47.675.987/003-09',
                                        marcafornec:'Ricardo Gil',
                                        produt:[
                                                {
                                                    cbarra:'78.987.09' ,
                                                    preco:'12.123,00',
                                                }
                                            ]
                                    }
                               ],
                               lojista:[     // vários logistas podem vender esse produto
                                    {
                                        rzaoloja:'Kazzar Moda',
                                        cnpjloja:'809.765.098-77',
                                        fornex:[
                                            {
                                               cnpj1:'47.675.987/003-09',
                                               marca1:'Ricardo Gil',
                                            } 
                                        ],
                                         produtos:[
                                                {
                                                    cbarra:'78.987.09',
                                                    preco:'12.123,00',
                                                    foto:'foto-100',
                                                    quantidade:2,
                                                    palavraChave:[
                                                        'noiva',
                                                        'casamento',
                                                        'capuz cetim'
                                                    ]
                                                }
                                       ]
                                    }
                               ],
                           }
                           ).save().then(()=>{
                                res.send("Contato cadastrado com sucesso!")
                            }).catch((err)=>{
                                res.send(err)
                            })
   })
   
module.exports=router;
