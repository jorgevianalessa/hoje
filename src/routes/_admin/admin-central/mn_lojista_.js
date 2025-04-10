const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const mongoose = require('mongoose')
const { eAdmin } = require("../../../../helpers/eAdmin")
const { eAdminLoja } = require('../../../../helpers/eAdminLoja')
const { json } = require('express')
const { format } = require('path')
const { ObjectId, Compressor } = require('mongodb')

require('../../../models/lojista')
const Lojista = mongoose.model('lojista')

require('../../../models/endereco-lojista')
const endLojista = mongoose.model('enderecolojista')

require('../../../models/segmentos')
const Segmento=mongoose.model("segmento")


  // Vem de redirecionamento
  router.get('/lista-lojista',async(req,res)=>{
    console.log('');
    console.log('___________________________________');
    console.log('');
    console.log(' [ 206 ]');
    console.log(' origem views : views/partials/_acentra_sidebar.handlebars/href"centrallj/lista-lojista');
    console.log(' origem route : routes/_admin/mn_lojista_.js/lista-lojista');
    console.log(' obs : ');
    console.log('');
    console.log(' destino :');
    console.log('');
    console.log(' ___________________________________');
    console.log('');
    console.log('---------------------------TESTE--------------------------')
    //console.log("vem de redirect(linha 153)")
    Lojista.find({},{'razao':1,'cidade':1,'bairro':1,'_id':1,'segmento.titulo':1,'segmento.sub_titulo':1}).sort({'razao':-1})
            .then((r)=>{
                //console.log(r)
                let g=r.length;
                let Z=[]
                let setor=[];
                // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                async   function busc_segmento(){
                     await Segmento.find({}).sort({segmento:1})
                                   .then ((sg)=>{
                                        let f={};
                                        let h=sg.length;
                                        for (let j=0;j<h;j++){
                                            //  console.log('vr de j',f._id)
                                            f=sg[j];
                                            let segmento=f.segmento;
                                            setor.push({segmento}) 
                                        }
                                          publica()
                                    })
                                    .catch((err)=>{
                                            console.log('errado,linha 216,lista lojista',err)
                                    })
                }
              //console.log(8)  
              busc_segmento()
              //......................................................
              for (let i=0;i<g;i++){
                   let f;
                   //::::::::::::::::::::::::::::::::::::::::::::::::::
                   f=r[i];
                   let ki=[];
                   let rz=[];
                   let cidade=[];
                   let bairro=[]
                   ki=f._id;
                   //  console.log(ki)
                   rz=f.razao
                   cidade=f.cidade;
                   bairro=f.bairro;
                   //::::::::::::::::::::::::::::::::::::::::::
                   let d=f.segmento;
                   [d]=d;
                   const n=d;
                   let zd=n.titulo;
                   let subt=n.sub_titulo;
                   ///::::::::::::::::::::::::::::::::::::::::::::::::::
                   Z.push({ki,rz,cidade,bairro,zd,subt})                
              }
              //.....................................................
             
              function publica(){
                console.log('.{ 89 }.....',setor)
                res.render("_admin/admin/lojista-listal",{ layout:'central/lojista_lista.handlebars',seg:Z,setor:setor});
              }    
           })
           .catch((e)=>{
            console.log(e)
           })
         //  res.render("_admin/admin/main_lista-lojista",{ layout:'participe.handlebars',seg:Z,setor:setor});
   // res.render("_admin/admin/main_lista-lojista",{ layout:'participe.handlebars'});
})

router.get('/allPesquisa/:id',(req,res)=>{
    let B=req.params;
    let z=Object.values(B);
    let [t] = z;
    const myArray = t.split(";");
    let titulo=myArray[0]
    let subtitulo=myArray[1]
    let cidade=myArray[2]
    let bairro=myArray[3]
    console.log('primeira =>',titulo,':',subtitulo,':',cidade,':',bairro)
    
    //::::: FECHA O SEGUNDA ROTA
    if((subtitulo=="todos") &&  (cidade=='todos') && (bairro=='todos' )){
        Lojista.find({'segmento.titulo':titulo},{razao:1,cidade:1,bairro:1,'segmento.titulo':1,'segmento.sub_titulo':1,'_id':1}).sort({razao:1})
                       .then((resp)=>{
                           let n=resp.length;
                           let Z=[]
                           let num=[];
                           let razao=[];
                           let cidade=[];
                           let bairro=[]
                           let titulo=[]
                           let subtitulo=[]
                           for(let j=0;j<n;j++){
                               let x;
                               x=resp[j]
                               num=ObjectId(x._id);
                               razao=x.razao; 
                               cidade=x.cidade;
                               bairro=x.bairro;
                               //-----------------------------------------------
                               let S=x.segmento;
                               
                               [S]=S;
                               console.log(S)
                               const q=S;
                              // console.log('linha 296',q.titulo)
                               titulo=q.titulo;
                               console.log(titulo)
                               console.log(q.sub_titulo)
                               subtitulo=q.sub_titulo[0];
                               console.log(subtitulo)
                               Z.push({num,razao,cidade,bairro,titulo,subtitulo})
                           }
                           console.log('-----------------------------------')
                           console.log('valor de Z',Z)
                           //console.log('titulo,todos,todos,todos =>',resp)
                           res.send(Z)
                       })
                       .catch((err)=>{
                           console.log(err)
                       })
    }else if((subtitulo=="todos") &&  (cidade!=='todos') && (bairro=='todos' )){
          console.log('segunda(315) =>',titulo,':',subtitulo,':',cidade) 
            console.log(cidade,titulo)
            Lojista.find({'segmento.titulo':titulo,cidade:cidade,},{razao:1,'segmento.titulo':1,'segmento.sub_titulo':1,cidade:1,bairro:1,'_id':0}).sort({razao:1})
            .then((resp)=>{
                    console.log(resp)
                    let n=resp.length;
                    let Z=[]
                    let num=[];
                    let razao=[];
                    let cidade=[];
                    let bairro=[]
                    let titulo=[]
                    let subtitulo=[]
                    for(let j=0;j<n;j++){
                        let x;
                        x=resp[j]
                        num=ObjectId(x.num);
                        razao=x.razao; 
                        cidade=x.cidade;
                        bairro=x.bairro;
                        //-----------------------------------------------
                        let S=x.segmento;
                        
                        [S]=S;
                        console.log('vr de S',S)
                        const q=S;

                       // let P=x.subtitulo;
                       // console.log('vr de P',P)
                        console.log('linha 296',q.titulo)
                        titulo=q.titulo;
                        console.log('titulo:',titulo)
                        console.log(q.sub_titulo)
                        subtitulo=q.sub_titulo;
                        console.log(subtitulo)
                        Z.push({num,razao,cidade,bairro,titulo,subtitulo})
                    }
                    res.send(Z)
            })
            .catch((err)=>{
                console.log(err)
            })
    }else if((subtitulo=="todos") &&  (cidade!=='todos') && (bairro!=='todos' )){
        console.log('linha 355',cidade,bairro)
        Lojista.find({titulo:titulo,cidade:cidade,bairro:bairro},{razao:1,'segmento.titulo':1,cidade:1,bairro:1,'_id':0}).sort({razao:1})
        .then((resp)=>{
            let n=resp.length;
                    let Z=[]
                    let num=[];
                    let razao=[];
                    let cidade=[];
                    let bairro=[]
                    let titulo=[]
                    let subtitulo=[]
                    for(let j=0;j<n;j++){
                        let x;
                        x=resp[j]
                        num=ObjectId(x.num);
                        razao=x.razao; 
                        cidade=x.cidade;
                        bairro=x.bairro;
                        //-----------------------------------------------
                        let S=x.segmento;
                        
                        [S]=S;
                        console.log(S)
                        const q=S;
                       // console.log('linha 296',q.titulo)
                        titulo=q.titulo;
                        console.log(titulo)
                        console.log(q.sub_titulo)
                        subtitulo=q.sub_titulo;
                        console.log(subtitulo)
                        Z.push({num,razao,cidade,bairro,titulo,subtitulo})
                    }
                    res.send(Z)
        })
        .catch((err)=>{
            console.log(err)
        })
    }else if((subtitulo!=="todos") &&  (cidade=='todos') && (bairro=='todos' )){
        console.log('393',titulo,subtitulo,cidade,bairro)
        Lojista.find({titulo:titulo,'segmento.sub_titulo':subtitulo},{razao:1,titulo:1,'segmento.titulo':1,'segmento.sub_titulo':1,cidade:1,bairro:1,'_id':0}).sort({razao:1})
        .then((resp)=>{
            console.log('vr da 399',resp)
            let n=resp.length;
            let Z=[]
            let num=[];
            let razao=[];
            let cidade=[];
            let bairro=[]
            let titulo=[]
            let subtitulo=[]
            for(let j=0;j<n;j++){
                let x;
                x=resp[j]
                num=ObjectId(x.num);
                razao=x.razao; 
                cidade=x.cidade;
                bairro=x.bairro;
                //-----------------------------------------------
                let S=x.segmento;
                
                [S]=S;
                console.log(S)
                const q=S;
               console.log('linha 421',q)
                titulo=q.titulo;
                console.log(titulo)
                console.log(q.sub_titulo)
                subtitulo=q.sub_titulo;
                console.log(subtitulo)
                Z.push({num,razao,cidade,bairro,titulo,subtitulo})
            }
            res.send(Z)
        })
        .catch((err)=>{
            console.log(err)
        })
    }else if((subtitulo!=="todos") &&  (cidade!=='todos') && (bairro=='todos' )){
        console.log('431',titulo,subtitulo,cidade,bairro)
        Lojista.find({titulo:titulo,'segmento.sub_titulo':subtitulo,cidade:cidade},{razao:1,'segmento.titulo':1,'segmento.sub_titulo':1,cidade:1,bairro:1,'_id':0}).sort({razao:1})
        .then((resp)=>{
            console.log(resp)
            let n=resp.length;
            let Z=[]
            let num=[];
            let razao=[];
            let cidade=[];
            let bairro=[]
            let titulo=[]
            let subtitulo=[]
            for(let j=0;j<n;j++){
                let x;
                x=resp[j]
                num=ObjectId(x.num);
                razao=x.razao; 
                cidade=x.cidade;
                bairro=x.bairro;
                //-----------------------------------------------
                let S=x.segmento;
                
                [S]=S;
                console.log(S)
                const q=S;
                console.log('linha 296',titulo)
                titulo=q.titulo;
                console.log(titulo)
                console.log(q.sub_titulo)
                subtitulo=q.sub_titulo;
                console.log(subtitulo)
                Z.push({num,razao,cidade,bairro,titulo,subtitulo})
            }
            res.send(Z)
        })
        .catch((err)=>{
            console.log(err)
        })
    }else if((subtitulo!=="todos") &&  (cidade!=='todos') && (bairro!=='todos' )){
        console.log('469',titulo,subtitulo,cidade,bairro)
        Lojista.find({titulo:titulo,'segmento.sub_titulo':subtitulo,cidade:cidade,bairro:bairro},{razao:1,'segmento.titulo':1,'segmento.sub_titulo':1,cidade:1,bairro:1,'_id':0}).sort({razao:1})
        .then((resp)=>{
            let n=resp.length;
            let Z=[]
            let num=[];
            let razao=[];
            let cidade=[];
            let bairro=[]
            let titulo=[]
            let subtitulo=[]
            for(let j=0;j<n;j++){
                let x;
                x=resp[j]
                num=ObjectId(x.num);
                razao=x.razao; 
                cidade=x.cidade;
                bairro=x.bairro;
                //-----------------------------------------------
                let S=x.segmento;
                
                [S]=S;
                console.log(S)
                const q=S;
                console.log('------------------------------------------')
                console.log(titulo)
                console.log('linha 296',q.titulo)
                titulo=q.titulo;
                console.log('titulo',titulo)
                console.log(q.sub_titulo)
                subtitulo=q.sub_titulo;
                console.log('sub-titulo',subtitulo)
                Z.push({num,razao,cidade,bairro,titulo,subtitulo})
            }
            res.send(Z)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    
    //}  
})

router.get('/pegaRegex/:id',(req,res)=>{
    console.log("  ")
    console.log('-linha 352-----------------')
    console.log('GET/pegaRegex-routes/admin/mn_lojista---')
    console.log('vem de _admin/admin/main_lista-fornec_importando.handlebars ')
    console.log(req.params)
    let [g]=Object.values(req.params);
    console.log('vr de g',g)
    // $options:i aceita maiúsculas e minúsculas
    Lojista.find({"razao":{"$regex": `${g}`, "$options": "i"}},{razao:1,marca:1,'segmento.titulo':1}) 
           .then((resp)=>{
                console.log(resp)
                for (const [key, value] of Object.entries(resp)) {
                    console.log(`${key}: ${value}`);
                }

                res.send(resp)
           })
           .catch((e)=>{
             console.log(e)
           }) 
})

//Essa rotina vai para estoq_Roupas
router.get('/busFornecLojista/:id',(req,res)=>{
    console.log('----375----------')
    console.log('/src/routes/_admin/mn_lojista')
    console.log('router.get(/busFornecLojista/:id')
    console.log('vem de main_lista-fornec_importando')
    let B=req.params;
    let z=Object.values(B);
    let [t] = z;
    const myArray = t.split(";");
    let razao=myArray[0]
    let segmento=myArray[1]
    console.log('rz->',razao,'seg ->',segmento)
    // FornecRoupas.find({'lojista.rzaoloja':razao},{fornecedores:1})
    //             .then((resp)=>{
    //               //console.log('total',resp) 
    //               let [g]=Object.entries(resp) 
    //              // console.log('vr de g',g[1]) 
    //               let q=g[1];
    //               console.log('vr de q',q.fornecedores)
    //               let [R]=q.fornecedores;
    //                console.log('   ')
    //                console.log('---------------------')
    //                console.log('vr de R',R)
    //                console.log('---------------------')
    //                console.log(R.marcafornec)
    //                let h=Object.values(R[1]);
    //                console.log('vr de h',h)
    //             })
    //             .catch((er)=>{
    //                 console.log(er)
    //             })

                FornecRoupas.find({'lojista.rzaoloja':razao},{ "fornecedores": { marcafornec:1}})
                            .then((result)=>{
                               console.log('vr de result',result)
                               console.log('   ')
                               let [n]=Object.values(result)
                               console.log('vr de n',n)
                               console.log('---------------------------------------------')
                               let p=Object.values(n.fornecedores);
                               console.log('vr de p',p)
                            })
                            .catch((err)=>{
                                console.log(err)
                            })        

                // let [R]=Object.entries(St)
                // let d=Object.entries(R[1])
                // d=d[0];
                // d=d[1];
})

router.get('/busca-bairro/:id',(req,res)=>{
    let cidade=req.params;
    let [nome]=Object.values(cidade);
    console.log(':::::::::::::::::::::::::::::::::::::')
  //  let hidro='Hidráulica'
  //  hidro={hidro};
    //console.log('hidro',hidro)
  //  Lojista.createIndexes({cidade:1})
    Lojista.distinct("bairro",{'cidade':nome})
           .then((resp)=>{
               // console.log('vr de resp',resp)
                let [h]=resp;
               // console.log('vr de h',h)
                res.send(resp)
           })
           .catch((err)=>{
             console.log(err)
           }) 
    
})

router.post('/edicao-lojista',(req,res)=>{
    console.log('');
    console.log('__________________________________________')
    console.log('');
    console.log(' [ 682 ]');
    console.log(' origem views : vem da edição do lojista buscar os dados para serem editados');
    console.log(' origem route : [mn_lojista/router.post(/edicao-lojista(654)] ');
    console.log('');
    console.log(" obs : vem para buscar também todos os segmentos cadastrados");
    console.log('');
    console.log(' destino : ');
    console.log(' ____________________________________________________________');
    console.log('');
    //Os segmentos é para fornecer subsidios para adição de segmento ao lojista
    const Client=req.body;
    let idclient=Object.values(Client);
    //console.log('vr do object',idclient)
    idclient=idclient[0];
    //console.log('vr de id',idclient)
    Lojista.find({'_id':idclient})
           .then((resp)=>{
               //console.log('vr da resp',resp)
               let [G]=resp;
               [resp]=resp;
               
               //let G=resp;
               const m=G.segmento;
               //console.log('vr de m',m)
               let j=m.length;
               //console.log('vr de j',j)
              //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
              Segmento.find({},{segmento:1,'_id':0}).sort({segmento:1})
                       .then((result)=>{
                         // console.log('valor da result',result)
                          G=result;
                         // console.log('vr de gg',G)
                          res.render("_admin/admin/edicao-lojista",{ layout:'_participe.handlebars',client:resp,Seg:G});
                       })
                       .catch((err)=>{
                          console.log(err)
                        });
               //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::        
               //console.log('valor de g',G) 
               
           })
           .catch((err)=>{

           })
    //console.log(Client)
   
})

router.post('/import-estoque-lojista',(req,res)=>{
    console.log('1666888????')
    const dadoClient=req.body;
    console.log(dadoClient)
    //res.render("_admin/admin/main_importando-lista",{ layout:'participe.handlebars',client:dadoClient});
    res.render("_admin/admin/main_importando-lista",{ layout:'participe.handlebars',client:dadoClient});
})

router.get('/import-estoque-lojista/:id',(req,res)=>{
    console.log('vr',1000000)
    console.log('')
    console.log('--------------------------------------')
    console.log('essa rotina está irregular')
    let f=req.body;
    console.log('vr de3f',f)
    //res.render("_admin/admin/main_importando-lista",{ layout:'participe.handlebars',client:dadoClient});
    res.render("_admin/admin/main_importando-lista",{ layout:'participe.handlebars',client:f});
})

router.get('/addsegmento/:id',(req,res)=>{
   console.log('') 
   console.log('---------------------(716)---------------------------')
   console.log('vem de edicao-logista/buscaSegmentoClient()')
   console.log("para deletar/adcionar segmentos e sub-segmento-------") 
   // Vem buscar os segmentos cadastrados do lojista selecionado para adcionar/deletar segmentos e 
   // tambéma para editar seções do lojista
   console.log('')
   console.log(req.params)
   console.log('-----------------------------------------------------')
   let i=req.params;
   //console.log('vr de i',i)
   i=Object.values(i)
   //console.log(i)
   Lojista.find({_id:i},{'segmento.titulo':1,razao:1,'titulo.sub_titulo':1})
          .then((resp)=>{
             // console.log('vr da resp',resp)
              let [r]=resp;
             // console.log('1212',r.segmento)
              const C=r.segmento;
             // console.log('vr de C',C)
              let [f]=r.segmento;
             // console.log('vr de f',f)
              let m=f.titulo;
              //console.log('vr de m',m)
              res.send(C)
          })
          .catch((er)=>{
              console.log(er)
          })

})

router.get('/addseccao/:id',(req,res)=>{
       //.......................................
       Lojista.find({_id:i,'segmento.titulo':m},{'segmento.sub_titulo':1})
       .then((result)=>{
           console.log('vr de 4 result',result)
           let [q]=result;
           console.log('vr de q',q)
           let w=q.segmento;
           console.log('vr de w',w)
           let [d]=w;
           console.log(d.sub_titulo)
           let [x]=d.sub_titulo;
           console.log(x)
       })
       .catch((err)=>{
          console.log(err)
       });
})

router.post('/addSegClient',(req,res)=>{
    console.log('-Vem da edição-lojista.handlebars');
    let f=req.body;
    console.log('vr de f',f)
    let w=f.idclient;
    let p=f.valorseg;
    console.log('vr de segmento',p)
    console.log('vr de id client',w)
   // p="Estética"
    //let t='titulo'
    Lojista.findOne({ $and :[{'_id':w},{'segmento.$.titulo':p}]},{'segmento.titulo':1,razao:1})
                .then((r)=>{
                    console.log('vr de r',r)
                    let [q]=r.segmento;
                    console.log('valor der',q)
                    let x=q.titulo;
                    console.log('vr do comrimento',x.length)
                    console.log('vr de x',x)
                    if(x===p){
                        console.log("Já existe!")
                    }else{
                        Lojista.updateOne(
                            {_id:w},
                            // ::::::::::: ADCIONA O CAMPO TÍTULO => OK ::::::::::::::::::::::
                            {
                                $addToSet:{
                                   segmento:{
                                       titulo:p,
                                   }
                                }
                            },
             
                          
                         )
                        .then((resp)=>{
                             console.log('vr da resp',resp)
                             res.redirect('/centrallj/edicao-lojista/' + w)
                        })
                        .catch((er)=>{
                            console.log(er)
                        })
                    }
                   // :::::::::::::::::::::::::::::::::::::::::::::::::
                })
                .catch((err)=>{
                    console.log('bravo!',err)
                })
     return
    
})

router.get('/edicao-lojista/:id',(req,res)=>{
     console.log(7787)
     //console.log(req.params)
     idclient=req.params;
    // console.log(idclient)
     idclient=idclient.id;
    // console.log(idclient)
     Lojista.find({'_id':idclient})
     .then((resp)=>{
         [resp]=resp;
         let G;
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        Segmento.find({},{segmento:1,'_id':0}).sort({segmento:1})
                 .then((result)=>{
                    console.log('valor da result',result)
                    G=result
                   // console.log('vr de gg',G)
                    res.render("_admin/admin/edicao-lojista",{ layout:'participe.handlebars',client:resp,Seg:G});
                 })
                 .catch((err)=>{
                    console.log(err)
                  });
         //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::        
         //console.log('valor de g',G) 
         
     })
     .catch((err)=>{
          console.log(err)
     })
})

router.post('/edicao-lojista-tudo/:id',(req,res)=>{
    //:::::::::::::::::::::::::::::::::::::::;
    let n=Object.values(req.params);
    let w=Object.values(req.body);
    let idNum=w[0];
    let nmSegmento=w[1];
    console.log(n)
    //;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
   
    console.log('vr de id client',w[0])
    if(n=='sd'){
       // deletaSegmento()
        let id=w[0];
        let segmento=w[1];
        console.log('segmento del')
        console.log(id,'---------------',segmento)
    }

    if(n=='sa'){
        let id=w[0];
        let segmento=w[1]
        console.log('segmento add')
        console.log(id,'---------------',segmento)
    }

    if(n=='scd'){
        console.log(idNum,nmSegmento)
        //idNum
        //nmSegmento
    }

    if(n=='sca'){

    }
})

router.get('/edicao-lojista-tudo/:id',(req,res)=>{
   console.log('')
   console.log('-------------------------------------------------------------------------------')
   console.log('vem da edição-lojista buscar os sub-titulos do segmento selecionado do lojista')
   console.log('---------------------------(886)-----------------------------------------------')
   console.log('')
   let segmento=req.params
   let [dados]=Object.values(segmento);
  // console.log(dados)
   let l=dados.length;
   let position = dados.search("-");
   segmento=dados.slice(0,position);
   let letra=segmento.trim();
  // console.log('valor de segmento',letra)
   let client=dados.slice((position+1),l)
   //console.log('vr de cliente :',client);
   const ID=new ObjectId(client.trim());
  // console.log('valor de Ob',ID)
   //..................................................................
   Lojista.findOne({ $and :[
                        {"_id": ID,
                          titulo:{ $eq:letra},
                        }
                           ]
                    },
                   {razao:1,"segmento.sub_titulo":1,"segmento.titulo":1}
          )
          .then((resp)=>{
                  let x=resp.segmento;
                  let l=x.length;
                  x.forEach(function(item,indice,array) {
                      //console.log('123',item,indice)
                      let r=(item.titulo);
                      if(r==letra){
                        const z=item.sub_titulo;
                        console.log('sub-titulo do segmento selecionado',z)
                       // console.log('33',z.length)
                        res.send(z)
                      }
                  });
                  
          })
          .catch((e)=>{
             console.log(e)
          })

   
})

router.get('/edicao-lojista-subtitulo/:id',(req,res)=>{
    console.log('')
    console.log('--------------------------(993)-----------------------------------------------')
    console.log('vem da edição-lojista buscar os sub-titulos do segmento selecionado do lojista')
    console.log('------------------------------------------------------------------------------')
    console.log('')
    let sub=req.params;
    console.log('sub-título',sub)
    sub=sub.id;
    console.log(sub)
    Segmento.find({segmento:sub},{segmento_01:1})
            .then((resp)=>{
                [resp]=resp;
                console.log('valor',resp)
                resp=resp.segmento_01;
                console.log(resp)
                res.send(resp)
            })
            .catch((err)=>{
              console.log(err)
            })
})

module.exports = router;
  