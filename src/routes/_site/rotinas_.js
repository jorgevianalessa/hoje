const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const flash = require('connect-flash')
const { ObjectId } = require('mongodb')
var fs=require('fs');

require('../../models/segmentos_')
const Segmento = mongoose.model('segmentos')
//require('../../models/segmentosubs')
//const Segmentosub = mongoose.model('segmentosub')

require('../../models/lojista')
const Lojista = mongoose.model('lojista')

require('../../models/sample_roupa');
const Roupa = mongoose.model('sample_roupa');

// require('../../models/Z_sample_estoque');
// const Sample = mongoose.model('sample_estoque');

require('../../models/sample_mconstrucao');
const Mconstrucao = mongoose.model('sample_mconstrucao');

//require('../../models/roupa_estoque');
//const RoupaStok = mongoose.model('roupa_estoque');

//require('../../models/roupa_cor');
//const RoupaCor = mongoose.model('roupa_cores');

// Busca a lista de produtos cadastrados do lojista/cooperado para display na relação de produtos:produto/list-produto
router.post('/construcao',(req,res)=>{
    console.log('------------------------------------------------')
    console.log('(25) --> post/_site/construcao/construcao')
    let f=req.body;
    console.log('só renderiza')
    res.render("_site/home/construção", {layout:'construcao.handlebars'})
})

// buscar segmentos nível 02 para pesquisa ou cadastro
router.get('/busca-segmentos_02/:id',(req,res)=>{
      console.log('');
      console.log(' [ 43 ] ')
      console.log(' origem views : views/_site/segmentos/materialconstrucao.handlebars');
      console.log(' origem route : src/routes/_site/rotinas_/busca-segmentos_02/:id');
      console.log(' destino : res.send()');
      console.log('');
      console.log('________________________________________________');
      let H=req.params;
      console.log(H)
      const N=Object.values(H);
      let [G]=N;
      let subSetor=G;
      console.log(' material : ',G)
      /////////////////////////////////////////////////
      Mconstrucao.find({
                    'setor.sub.depto':`${subSetor}`
                  })
                  .then( (result)=>{
                      console.log("");
                      console.log(' quantidade de produto do setor :',result.length);
                      console.log('____________________________________________');
                      console.log('2000 => ',result[0]);
                      console.log('_____________________________________');
                      ////////////////////////////////////////////////////
                      res.send(result)
                  })
                  .catch((e)=>{
                    console.log(e)
                  })
})
  
// atualizada em 29/01/2024  
router.get('/segmento_01/:id',(req,res)=>{
      console.log('');  
      console.log(' [ 81 ]');
      console.log(' origem views : views/_site/home/home.handlebars ');
      console.log(' origem route : src/routes/_site/rotinas_.js/segmento_01');
      console.log(' destino :');
      console.log('params ',req.params)
      let b=req.params;
      [b]=Object.values(b);
      b=b;
      console.log(typeof(b))
      console.log('');
      console.log('valor de b',b)
      //b="Material Construção"
      Sample.find({
                  'setor.setor':{$eq:`${b}`}
                  }
                 )
            .then((result)=>{
                console.log('quantos ? ',result.length);
                console.log('');
                console.log('___________________________________________');
                console.log(' result ',result);
                console.log('___________________________________________');
                let s;
                [s]=result;
                console.log(s.setor)
            })
            .catch((e)=>{
                console.log(e);
            })
     
})

  //atualizada em 29/01/2024
router.post('/buscaSegmento',async(req,res)=>{
    console.log("");
    console.log("[ 112 ]");
    console.log(" origem views : _site/home/grid-home.handlebars"); 
    console.log(" origem route : _site/rotinas_.js"); 
    console.log(" destino : _site/segmentos/vários, '{layout:site/segmento/mconstrucao.handlebars,setor:setor}"); 
    console.log("  ATENÇÃO => Só passagem para outra page"); 
    console.log("________________________________________________________________"); 
    console.log(""); 
    let corpo=req.body;
    console.log("");
    console.log(" corpo : ");
    console.log("",corpo.nomeSegmento);
    console.log("_________________________________________________");
    let setor=corpo.nomeSegmento;
    console.log(''  , setor) 
    console.log("");
    console.log("");
    console.log("_____________________________________________________");
    console.log(" setor : ",setor); 
    console.log("");
    console.log("___________________________________________________");
    /////////////////////////////////////////////////////////////////////
    if (setor=="Material de Construção"){
        Segmento.find({segmento:setor},{segmento_01:1})
                .then((result)=>{
                    console.log('',result);
                    console.log(' [ 185 ]');
                    console.log('')
                    res.render("_site/segmentos/grid-construcao", {layout:'site/segmento/mconstrucao.handlebars',setor:setor}) 
                    console.log('_____________________________________________');
                }) 
                .catch((e)=>{
                    console.log(e)
                })
        
    }else{
        console.log('');
        console.log("___________________________________________________");
        console.log(' setor : ',setor)
        console.log("___________________________________________________");
        console.log('');
        res.render("_site/segmentos/coringa", {layout:'site/segmento/alimentacao.handlebars',setor:setor}) 
        console.log('_______________________________________________________________________________');
        console.log('');
    }
})

router.get("/join-lojas/:id",async(req,res)=>{
     console.log('');
     console.log('');
     console.log('[ 200 ] join-lojas')
     console.log('x',req.params)
     let letra=req.params.id;
     console.log('[122] ',letra);
     console.log('');
     let sub='Moda Masculina'
     let nome= "Itaquari"
     ////////////////////////////////////////////////////////////////////////
     Lojista.find(
                   {
                    'segmento.sub_titulo.subtitulo':sub,
                     bairro: nome
                   }

                 )
                 .then((resp)=>{
                     console.log(resp)
                     res.send(resp)
                 })
                 .catch((e)=>{
                    console.log(e)
                 })
     return
     Lojista.find({
                   segmento:{ $elemMatch:{'sub_titulo.subtitulo':sub,responsavelHum: nome}} 
               })               
              .then((result)=>{
                 console.log('');
                 console.log('resultado',result);
                 let l=result.length;
                 console.log('',l);
    /////////////////////////////////////////////////////////////////////             
                   return
                 for (let i=0;i<l;i++){
                    console.log('');
                    console.log('vr de i : ',i)
                    console.log('resp',result[i])
                    let resp=result[i];
                    console.log('12',resp.segmento)
                    console.log('_______________________________________________');
                    let r5=resp.segmento;
                    console.log(r5)
                    console.log('_________________________________________________________________');
                    let subTitulo=Object.values(r5);
                    console.log('13',subTitulo)
                   // let r6=Object.values(subTitulo.subtitulo)
                    console.log('_________________________________________________________________');
                    //console.log(r6)
                 }
                 
                 console.log('_________________________________________________________');
                 res.send(result)
            })
            .catch((e)=>{
                console.log('',e)
            })

})

router.get('/pega_bairros/:cidade',async(req,res)=>{
    console.log('');
    console.log('_____________________________________________');
    console.log('');
    console.log(' [ 263 ]');
    console.log(' views :views/_site/segmentos/materialconstrucao.handlevars');
    console.log(' route : _site/rotinas_/pega_bairros/:id');
    console.log(' obs : Vem pegar os bairros onde há lojistas cadastrados na cidade selecionada. ');
    console.log('');
    console.log(' destino : volta para preencher o selectBairros');
    console.log('');
    console.log('-----------------------------------------------------');
    console.log('');
    let nucleo=req.params;
    console.log('+++++++++++++');
    console.log(nucleo);
    console.log('+++++++++++++');
    console.log('');
    let palavra=nucleo.cidade;
    let cidade;
    let pos;
    pos=palavra.search(':');
    cidade=palavra.substring(0,pos);
    console.log('cidade =>',cidade);
    let n1=palavra.length;
    palavra=palavra.substr((pos+1),n1)
    pos=palavra.search(':=:');
    let opcao=palavra.substring(0,pos)
    console.log('opcao  =>' ,opcao);
    n1=palavra.length;
    let setor=palavra.substr((pos+3),n1);
    console.log('setor  =>',setor)
    let Array=[];
    ////////////////////////////////////////
            Mconstrucao.find(
                              {
                                 cidade:cidade,
                                 artigo:setor
                            })
                       .then((result)=>{
                            //[result]=result;
                            console.log('')
                            console.log('____________________________________________')
                            //console.log('loja ',result)  
                           // if (result.length>0){
                           // Array.push(result)
                           // console.log('vr Array :',Array)  
                           // }else{
                          //  let tr=result.length 
                          //  console.log('comprimento => ',tr) 
                          res.send(result)
                          //  }
                          //  console.log('____________________________________________')
                            //console.log('x=',i,'y=',l)
                            //if(i==(l-1)){
                                //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                               // console.log("saindo",Array) 
                               
                           // }
                       })
                       .catch((e)=>{
                          console.log(e)
                       })
        //}

   //     function porNome(number,i){
   //         console.log('number ::',number)
   //         Mconstrucao.find(
   //                        {loja_id:number,'setor.material':'Hidrálica'}
   //                        )
   //                    .then((result)=>{
   //                         console.log('result',result)  
   //                         console.log('_________________________________________')
   //                     })
   //                     .catch((e)=>{

   //                     })
   //     }
        
})

router.get('/pegaosbairros/:id',async(req,res)=>{
    console.log('');
    console.log('[186] ');
    console.log(' origem : views/_site/segmentos/roupaX10.handlebars');
    console.log('');
    console.log('');
    console.log('');
    console.log('__________________________________________');
    let corpo=req.params;
    //console.log('corpo',corpo)
    let palavra;
    palavra=corpo.id;
    let pos=palavra.search(":");
    let l=palavra.length;
    let setor=palavra.substring(0,pos);
    console.log('');
    console.log('____________________________________________________');
    console.log('11',setor)
    let restante=palavra.substr((pos+1),l);
    l=restante.length;
    pos=restante.search(':');
    let segmento=restante.substring(0,pos);
    console.log('');
    //console.log('13',segmento)
    let cidade=restante.substr((pos+1),l);
    console.log('');
    console.log('14',cidade)
    console.log('________________________________________________________');
    console.log('');
    let bairroArray=[];
    Lojista.find(
        {
         'segmento.titulo':setor,
          cidade:cidade
        },{bairro:1}
      )
      .then((resultado)=>{
            console.log('',resultado);
            let l=resultado.length;
            console.log('');
            console.log('lenght : ', l);
            console.log('______________________________________________');
            for (let i=0;i<l;i++){
                    let x=resultado[i].bairro;
                    if(i==0){
                        bairroArray.push(x);
                    }else{
                        let Arr=bairroArray;
                        if(Arr.indexOf(x)>-1){
                            console.log('bingo!',i)
                        }else{
                            bairroArray.push(x)
                        }
                    }  
            /////////////////////////////////////////////////// 
            }
            console.log('________________________________________________');
            console.log('');
            console.log('array :',bairroArray)
            console.log('');
            console.log('___________________________________________________');
            res.send(bairroArray)
      })
      .catch((e)=>{
         console.log(e)
      })
    
})

router.get('/pegarLojistas/:id',async(req,res)=>{
    console.log(""); 
    console.log("");
    console.log("[373]");
    console.log(" origem views : views/_site/segmentos/coringa.handlebars"); 
    console.log(" origem route : routes/_site/rotinas_.js"); 
    console.log(" destino : _site/segmentos/roupaX10, '{layout:site/segmento/roupas.handlebars,seg:nome}"); 
    console.log(" "); 
    console.log("________________________________________________________________"); 
    console.log(""); 
    console.log('params',req.params);
    let nucleo=req.params.id;

    let setor;
    let cidade;
    let bairro;
    let palavra;
    let l;
    palavra=nucleo;
    l=palavra.length;
    let pos=palavra.search(',');
    setor=palavra.substring(0,pos);
    palavra=palavra.substring((pos+1),l)
    pos=palavra.search(",");
    cidade=palavra.substring(0,pos);
    bairro=palavra.substring((pos+1),l);
   // console.log('1- ',setor);
   // console.log('');
   // console.log('2- ',cidade);
   // console.log('');
   // console.log('3- ',bairro);
    console.log('__________________________________________________________');
    let objPasse={};
    let lojaArray=[];
    Lojista.find(
        {
            'segmento.sub_titulo.subtitulo':setor,
             cidade:cidade,
             bairro:bairro,
           },{razao:1,celular:1,logradouro:1,numero:1,cidade:1,bairro:1,'segmento.sub_titulo.template':1}
           )
           .then((result)=>{
              // console.log('10',result)
               let l=result.length;
               let resp;
               //[resp]=result;
               //console.log('20',resp);
               console.log('');
               console.log('lenght : ',l);
               console.log('___________________________________________');
              // for( const [key,values] of Object.entries(result)){
              //     let g=`${values}`;
              //     console.log('valores :',g)
                   //console.log(g.segmento)
                   //lojaArray.push(g)
              //     console.log('-----------------------------------------------')
              // }
              // console.log('fim')
             //  console.log(lojaArray)
               //return
               for (h=0;h<l;h++){
                  console.log(h)
                  //console.log(' abc => ',result[h])
                  let s=result[h];
                  console.log('h', h ,'..',s)
                  let n5=s.segmento;
                  [n5]=n5
                  let [template]=n5.sub_titulo;
                  //let [X]=result[h];
                  template=template.template
                  console.log('template',template)
                  objPasse={
                    razao:s.razao,
                    celular:s.celular,
                    rua:s.logradouro,
                    numero:s.numero,
                    cidade:s.cidade,
                    bairro:s.bairro, 
                    template:template,
                 }
                 lojaArray.push(objPasse);
               }
         
               console.log('____________________________________________');
              
               console.log('==========================================================')
               console.log('lojarray',lojaArray)
               console.log('==========================================================')
               //return
               res.send(lojaArray)
           })
           .catch((e)=>{
              console.log(e)
           })
})

router.get('/busca-valores/:id',(req,res)=>{
      console.log("-----------------------")
      console.log("97:  get/busca-valores/:id-")
      let g=req.params;
     // console.log('vr de g',g)
      let w=Object.values(g)
     // console.log('vr de w',w)
      let [q]=Object.values(g);
     // console.log('vr de q',q)
      let n=q.search(':');
      let letra=q.slice(n+3)
     // console.log('vr de n',letra)
      let t=letra.search("'");
      //console.log(t)
      let x=letra.substring(0,t)
      console.log('vr de x',x)
      // Segmento.find(segmento={"$regex": `${x}`, "$options": "i"},{'segmento_01':1,'_id':0})
       Segmento.find({segmento:RegExp('^' + x + '$' , "i")})
              .then((resp)=>{
                  console.log(resp)
                  res.send(resp)
              })
              .catch((err)=>{
                  console.log(err)
              }) 
  
  });
  
router.get('/segmentomenu/:id',(req,res)=>{
    console.log('');
    console.log('__________________________________');
    console.log('');
    console.log(' [ 123 ]');
    console.log(' origem views : views/_site/home/home.handlebars');
    console.log(' origem route : _site/rotinas/segmentomenu/:id');
    console.log(' obs : vem do menu=> "Compras/roupa" ');
    console.log('');
    console.log(' destino : _site/roupa-lista => layout:"site/roupa_lista.handlebars"');
    console.log('');
    console.log('_____________________________________');
    console.log('');
    console.log(req.params)
    let [f]=Object.values(req.params);
    if(f==='agricultura'){
          res.render("_site/segmentos/agricultura", {layout:'agricultura.handlebars'})
    }else if(f==='alimentacao') {
          res.render("_site/segmentos/alimentacao", {layout:'alimentacao.handlebars'})
    }else if(f==='automovel') {
          res.render("_site/segmentos/automoveis", {layout:'automoveis.handlebars'})
    }else if(f==='comercioexterior') {
          res.render("_site/segmentos/comercioexterior", {layout:'comercioexterior.handlebars'}) 
    }else if(f==='comunicacao') {
          res.render("_site/segmentos/comunicacao", {layout:'comunicacao.handlebars'})
    }else if(f==='construcao') {
          res.render("_site/segmentos/construcao", {layout:'construcao.handlebars'})
    }else if(f==='educacao') {
          res.render("_site/segmentos/educacao", {layout:'educacao.handlebars'})
    }else if(f==='estetica') {
        console.log(f)
        res.render("_site/segmentos/lojista-lista", {layout:'lojista-lista.handlebars',seg:f}) 
    }else if(f==='fastfood') {
        //   res.render("_site/segmentos/fastfood", {layout:'segmentos.handlebars'})
        res.render("_site/segmentos/lojista-lista", {layout:'lojista-lista.handlebars',seg:f}) 
    }else if(f==='informatica') {
        console.log(f)
        //   res.render("_site/roupa-lista", {layout:'segmentos.handlebars',seg:f}) 
        res.render("_site/segmentos/lojista-lista", {layout:'lojista-lista.handlebars',titulo:f}) 
    }else if(f==='eletronicos'){
        console.log('eletronicos')
        res.render("_site/segmentos/lojista-lista", {layout:'lojista-lista.handlebars',titulo:f}) 

    }else if(f==='materialconstrucao'){
        res.render("_site/segmentos/lojista-lista", {layout:'lojista-lista.handlebars',seg:f}) 

    }else if(f==='moveisDecoracao') {
          //...............................
          let segmento='Móveis e Decoração'
          Segmento.find({segmento:`${segmento}`},{segmento:1,_id:0}).sort({segmento_01:1}) 
                  .then((resp)=>{
                      console.log('linha 174',resp.length)
                      console.log('vr de resp',resp)
                      let [r]=Object.values(resp);
                      console.log('vr de r',r)
                      console.log('-----------------------------')
                      //res.render("_site/segmentos/moveisDecoracao", {layout:'segmentos.handlebars',seg:resp})  
                      res.render("_site/segmentos/lojista-lista", {layout:'lojista-lista.handlebars',seg:f}) 
                  })
                  .catch((e)=>{
                      console.log(e)
                  })
    }else if(f==='pets') {
        //   res.render("_site/s_roupas", {layout:'segmentos.handlebars',seg:f}) 
        res.render("_site/segmentos/lojista-lista", {layout:'lojista-lista.handlebars',seg:f}) 
    }else if(f==='roupas') {
           console.log(' [ 189 ]')
           f='Roupas';
           let segmento=f;
           let O=[];
           let c;
           Segmento.find({segmento:`${segmento}`},{segmento_01:1,_id:1}).sort({segmento_01:1}) 
                   .then((resp)=>{
                       let [H]=resp;
                       var R=Object.values(H.segmento_01);
                       c=resp.length;
                       var map=new Map(Object.entries(H))
                        // .............................
                        for (let [key,value] of Object.entries(R)){
                         let l=value;
                         l=l.trim();
                         O.push({seg:l})
                      }
                      console.log('');
                      console.log('------------------------------');
                      console.log("O valor de O",O);
                      console.log('');
                      // ...........................................
                      res.render("_site/roupa/roupaloja-lista", {layout:'site/roupaloja_lista.handlebars',seg:O,titulo:segmento}) 
                   })
                   .catch((err)=>{
                      console.log('[ 206 ] err : ',err)
                   })    
    
    }else if(f==='saude'){
        res.render("_site/segmentos/lojista-lista", {layout:'lojista-lista.handlebars',seg:f}) 

    }else if(f==='servico') {
        //   res.render("_site/segmentos/servico", {layout:'segmentos.handlebars'}) 
        res.render("_site/segmentos/lojista-lista", {layout:'lojista-lista.handlebars',seg:f}) 
    }else if(f==='turismo') {
        //   res.render("_site/segmentos/turismo", {layout:'segmentos.handlebars'}) 
        res.render("_site/segmentos/lojista-lista", {layout:'lojista-lista.handlebars',seg:f}) 
    }else{
        console.log('???')
    }
})

router.get('/pegaLojista/:id',(req,res)=>{
    console.log('-------------------------------------')
    console.log('-linha 233 /routes/_site/rotinas/pegaLojista/:id---')
    console.log('vem de View/segmentos/coringa/rotina.js')
    let g=Object.values(req.params);
    console.log("")
    console.log('vr de g',g)
    console.log("")
    Lojista.find({'segmento.segmento':g}).sort({razao:1})
           .then((loj)=>{
               console.log('valor de loj',loj)
               res.send(loj)
           })
           .catch((err)=>{
               console.log(err)
           }) 
})

// Essa rotina publica a home da loja selecionada.
router.post('/mostrasite',(req,res)=>{
    console.log("");
    console.log('______________________________________');
    console.log("");
    console.log(" [ 254 ]");
    console.log(' origem views : view/_site/s_roupas.handlebars   ')
    console.log(' origem route : routes/_site/rotinas_/mostrasite/:id=>[ click sobre nome da loja ]')
    console.log(' obs : layout:/site/roupa/_roupaloja.handlebars')
    console.log('');
    console.log(' destino : _site/roupa/roupaLoja');
    console.log('__________________________________');
    console.log('');
    //////////////////////////////////////////////////////
    let [idloja]=Object.values(req.body)
    idloja=idloja.trim();
    console.log('vr do _id da loja :',idloja)
    console.log('');
    try{
       Lojista.findOne({_id:idloja},{razao:1,assinante:1,marca:1})
              .then((resposta)=>{
                let l=resposta.assinante;
                console.log('assinante',l)
                console.log('');
                res.render("_site/roupa/roupaLoja", {layout:'site/roupa/_roupaloja.handlebars',loja:resposta}) 
              }) 
       
    }catch(err){
        console.log(err)
    }    
})

router.post('/buscar-artigosLojista/:id',async(req,res)=>{
    console.log("");
    console.log('______________________________________');
    console.log("");
    console.log(" [ 285 ]");
    console.log(' origem views : view/_site/roupa/roupaLoja.handlebars   ')
    console.log(' origem route : routes/_site/rotinas/buscar_artigosLojista()')
    console.log(' obs : layout:roupa-grid.handlebars ??? ')
    console.log('');
    console.log(' destino : _site/roupaLoja.handlebars');
    console.log('__________________________________');
    console.log('');
    let IdLojista;
    let nucleo=req.params;
    
    console.log('');
    IdLojista=nucleo.id;
    console.log('retorno de IdLojista : ',IdLojista);
    try{
       //..................................................
       Segmento.find({})
             


       return
       await Roupa.distinct("artigo",{loja_id:`${IdLojista}`})
                .then((result)=>{
                    //.........................................................
                    console.log('result dos artigos : ',result)  
                    res.send(result)
                })
                .catch((er)=>{
                    console.log(er)
                })
            }catch(e){
                console.log(e)
            }         
})

router.get('/buscalogo/:id',async(req,res)=>{
    console.log('');
    console.log(' [ 317 ]');
    console.log('');
    console.log(' origem views : views/_site/roupa/roupaLoja.handlebars');
    console.log(' origem route : route/_site/rotinas/get/buscalogo/:id');
    console.log('');
    console.log(' obs : busca a imagem do logomarca')
    console.log('')
    console.log(' destino : response res.send(logo()) ');
    console.log('')
    console.log('_____________________________________________')
    console.log('')
    let q=req.params;
    console.log('vr de q',q)
    let idloja=q.id;
    Lojista.findOne({_id:idloja},{urllogomarca:1,urltitulopage:1,telefone:1,bairro:1,cidade:1})
           .then((r4)=>{
               console.log('r4 : ',r4)
               res.send(r4)
           })
})

router.get('/home_publicado/:id',async(req,res)=>{
    console.log('');
    console.log(' [ 764 ]');
    console.log('');
    console.log(' origem views : views/_site/site-lojista.handlebars');
    console.log(' origem route : route/_site/rotinas/get/home_publicado/:id');
    console.log('');
    console.log(' obs : busca o caminho,a image, e a posição se já tem publicado')
    console.log('')
    console.log(' destino : response ImgLoad() [ 534?? ]');
    console.log('')
    console.log('_____________________________________________')
    console.log('')
    let q=req.params;
    let idloja=q.id;
    let page;
    page="home";
    //...................................................
    let ArrayImg=[];
    let objetoImg={};
    let pacoteImg={};
    let zero=0;
    console.log('______________________________________________________')
    console.log('ATENÇÃO REFAZER A CONSULTA $AND ARTIGO:HOME FALTA DEFINIR A LOJA');
    console.log('______________________________________________________')
    page=page.trim();
    console.log(page ,'<-->',idloja)
    await  Roupa.find({
                          $and:[
                            {page:{$eq:page}},
                            {loja_id:{$eq:idloja}},
                            {posicao:{$gt:zero}},
                          ]
                        })
                    .then((resp)=>{
                      //////////////////////////////////////////////
                      if( typeof(resp)==[] || resp=='undefined'){
                          console.log('_____________________________________');
                          console.log('');
                          console.log("Não há nada publicado : ",page)
                          console.log('____________________________________');
                          console.log('');
                      }else{
                          let l=resp.length;
                          //.....................................
                          console.log('');
                          res.send(resp);
                      }
                      //.........................................................
                    })
                    .catch((er)=>{
                      console.log('vr de er',er)
                    }) 
  })

router.post('/buscar-registros_publicados/:id',async(req,res)=>{
    console.log('')
    console.log('____________________________________________')
    console.log('')
    console.log(' [ 773 lojista/buscar-registros')
    console.log(' origem views : views/_site/site-lojista.handlebars/produto_publicado()')
    console.log(' origem route : route/_site/rotinas.js/buscar-registros_publicados ')
    console.log(' obs: ');
    console.log('      busca os registro que são de acordo com o artigo escolhido porém a posição é zero,');
    console.log('      ou seja, não está vinculado a nenhuma página.');
    console.log('');
    console.log(' destino : response : irá carregar a page nomeada conforme o artigo selecionado');
    console.log('_____________________________________________');
    console.log('');
    //console.log(' req.params : ',req.params.id)
    let palavra=req.params.id;
    let pos;
    pos=palavra.search("=:");
    let artigo=palavra.substring(0,pos);
    console.log(' artigo escolhido : ',artigo)
    palavra=palavra.slice((pos+2),(palavra.length));
    let idLojista=palavra
    console.log(  ' lojista  : ',palavra)
    let zero=0;
    let retorno=1;
    await  Roupa.find({
                            $and: [
                                    {
                                      loja_id:`${idLojista}`,
                                      page:`${artigo}`,
                                      posicao:{$ne:`${zero}`}
                                    },
                                  ]
                          },
                          {'produto.detalhes':0})
                        .then((result)=>{
                            console.log('');
                            console.log('RESULT de [ 1877 ] : ',result)
                            console.log(typeof(result))
                            if( typeof(result)==[] || result=='undefined'){
                                console.log('_______________________________________________')
                                console.log('');
                                console.log(' [ 810 ] Não há nada publicado com : ',artigo)
                                console.log('_______________________________________________')
                                let zero=0;
                                result={
                                  retorno:zero,
                                };
                                res.send(result)
                            }else{
                                console.log('TEM')
                                console.log('');
                                console.log('');
                                console.log('________________________________________________');
                                //console.log(' Resultado buscar-registro { 1840 } :',g);
                                console.log('________________________________________________');
                                //console.log(' Os registro abaixo estão disponíveis ');
                                //console.log(' para compor a tabela id="tableProduto => tabelaCodigoCor ');
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

router.get('/lojista-segmentado/:id',(req,res)=>{
    console.log('');
    console.log('__________________________________________');
    console.log('');
    console.log(' [ 471 ]');
    console.log(' origem : views/_site/roupaloja-lista.handlebars');
    console.log(' route : routes/_site/rotinas/lojista-segmentado/:id'); 
    console.log(' Obs :  Essa rotina faz o filtro das lojista por cidade / bairro-------');
    console.log('        Busca todas as lojas para ter acesso ao site do lojista escolhido');
    console.log('');
    console.log(' destino: res.send(resposta)');
    console.log('____________________________________________');
    console.log('');
    let palavra=req.params;
    console.log('valor do params :',palavra)
    console.log('')
    palavra=Object.values(palavra)
    console.log('---------------------------------')
    console.log('valor do array :',palavra)
    console.log('---------------------------------')
    let text=palavra[0]
    console.log('valor do text :',text)
    console.log('---------------------------------')
    let c=text.length;
    // Pega a 1º vírgula
    let n=text.search(",");
    // Descola a 1º palavra que equivale ao departamento)
    let departamento=text.substr(0,n);
    console.log('departamento : ',departamento)
    console.log('---------------------------------')
    // Tira do text a 1º palavra e coloca o restante na variável text
    text=text.substr((n+1),c)
    console.log('palavra restante :',text)
    console.log('---------------------------------')
    // Agora valor descolar a próxima palavra que é relativa a cidade
    n=text.search(",");
    let cidade=text.substr(0,n);
    console.log('cidade :',cidade)
    console.log('---------------------------------')
    text=text.substr((n+1),c)
    console.log('---------------------------------')
    let bairro=text;
    console.log('nome do bairro : ',bairro)
    console.log('---------------------------------')

    Lojista.find({'cidade':{$eq:`${cidade}`}
                  
                    // $and: [
                    //     {
                    //     'segmento.sub_titulo.subtitulo':{$eq:`${departamento}`},
                    //     'cidade':{$eq:`${cidade}`},
                    //     },
                    // ],
                    },{ urllogolista:1,marca:1,celular:1,logradouro:1,numero:1,bairro:1,cidade:1})
                .then((resp)=>{
                    console.log('');
                    console.log(' cidade: => bairro:todos  ')
                    console.log('');
                    console.log(resp);
                    //console.log('length de resposta : ',resp.length)
                    //console.log('resposta primeira lojista :',resp)
                    res.send(resp)
                })
                .catch((err)=>{
                console.log(err)
                })
    return
    function buscaTodos(){
    if(cidade==='todos'){
            Lojista.find({'segmento.sub_titulo.subtitulo':departamento},{marca:1,cidade:1,bairro:1,celular:1}).sort({razao:1})
            .then((resp)=>{
                console.log(' cidade:todos => bairro:todos  ')
                console.log('length de resposta : ',resp.length)
                console.log('resposta : ',resp[0])
                
                res.send(resp)
            })
            .catch((err)=>{
            console.log(err)
            })
    }else if(cidade!=='todos' && bairro==='todos'){
            console.log('AQUI 1000')
            //$eq
           // Lojista.find({'segmento.sub_titulo.titulo':departamento,cidade:cidade},{razao:1,logradouro:1,numero:1,bairro:1,celular:1}).sort({razao:1})
            console.log('departamento : ',departamento);
            console.log('cidade : ',cidade);
            //.................................
            Lojista.find({
                    $and: [
                        {
                        'segmento.sub_titulo.subtitulo':{$eq:`${departamento}`},
                        'cidade':{$eq:`${cidade}`},
                        },
                    ],
             },{ urllogolista:1,marca:1,celular:1,logradouro:1,numero:1,bairro:1,cidade:1})
            .then((resp)=>{
                console.log('');
                console.log(' cidade: => bairro:todos  ')
                console.log('');
                console.log(resp);
                //console.log('length de resposta : ',resp.length)
                //console.log('resposta primeira lojista :',resp)
                res.send(resp)
            })
            .catch((err)=>{
            console.log(err)
            })
    }else if(cidade!=='todos' && bairro!=='todos'){
        Lojista.find({'segmento.sub_titulo':departamento,cidade:cidade,bairro:bairro},{razao:1,cidade:1,bairro:1,celular:1}).sort({razao:1})
        .then((resp)=>{
            console.log(' cidade:xx => bairro: xx  ')
            console.log('length de resposta : ',resp.length)
            console.log('resposta primeira lojista :',resp[0])
            
            res.send(resp)
        })
        .catch((err)=>{
        console.log(err)
        })
    }
    }
   
})

// AQUI COMEÇA LOAD ROUPAHOME/SITE
router.post('/buscar-artigo/:id',async(req,res)=>{
    console.log('---')
    console.log('-[ 341 ] busca artigos para seleção dos produto da page site --')
    console.log('---');
    console.log(req.params);
    let lojaid;
    await  ProdTemp.distinct(artigo,{loja_id:`${lojaid}`})
                .then((result)=>{
                    console.log('');
                    console.log('#######################################');
                    console.log('artigos :',result)
                    let l=result.length;
                    console.log('l = ',l)
                    result.shift('conjunto')
                    console.log('banana :',result)
                    console.log('##########################################');
                    console.log('');
                    banana=result;
                    l--;
                    A=[];
                    res.send(banana)
                })
                .catch((er)=>{
                    console.log(er)
                })
     
  })

router.get('/artigos-page_home/:id',async(req,res)=>{
    console.log('');
    console.log('_____________________________________________________');
    console.log('');
    console.log(' [ 599 ]');
    console.log(' views : views/_site/roupaLoja.handlebars')
    console.log(' route : _site/rotinas/get/artigos-page_home/:id');
    console.log(' obs: Essa rotina busca o caminho e a image para o site do lojista selecionado');
    console.log('');
    console.log(' destino : retorna para : views/_site/roupaLoja =>artigos-page_home/:id');
    console.log('');
    console.log('____________________________________________________');
    console.log('');
    let q=req.params;
    //......................................................
    let palavra=q.id;
    let pos=palavra.search("&&:");
    let l=palavra.length;
    //.........................................
    let idLoja=palavra.substring((pos+3),l);
    console.log('');
    console.log('id da loja',idLoja);
    //........................................................      
    let pacote={};
    let x;
    let n;
    n='default'
    let vasilha=[];
    //..........................................................
    Roupa.find(
                  {
                    $and:[
                        {loja_id:{$eq:idLoja}},
                        {posicao:{$gt:0}}
                    ]
                  }
            )
             .then((result)=>{
                console.log(result)
                res.send(result)
                
             })
             .catch((err)=>{       
                console.log(err)
     
             })
    
})

router.get('/busca_imagem_artigo/:id',async(req,res)=>{
    console.log('');
    console.log('_____________________________________________');
    console.log('');
    console.log(' [ 700 ]');
    console.log(' views : partials/roupaloja_sidebar.handlevars');
    console.log(' route : _site/rotinas/busca_imagem_artigo/:id');
    console.log(' obs : Vem pegar os arquivos de produtos relacionados a artigo ');
    console.log('       escolhido.');
    console.log('');
    console.log('       Essa rotina busca o caminho e a image para página selecionada do lojista');
    console.log('');
    console.log(' destino : volta para preencher a page selcionada');
    console.log('');
    console.log('-----------------------------------------------------');
    console.log('');
    let nucleo=req.params;
    nucleo=nucleo.id;
    //...........................................
    let pos=nucleo.search("&&&");
    let l=nucleo.length;
    let idloja=nucleo.substring(0,pos);
    console.log(" idloja : ", idloja);
    //....................................................
    console.log('')
    let nomePage=nucleo.substring((pos+3),l)
    console.log('artigo da page : ',nomePage)
    //................................................
    console.log('');
    //................................................
    let zero=0;
    if(nomePage=='home'){
        await Roupa.find(
            {
             $and:[
                 {loja_id:idloja},
                 {posicao:{$gt:zero}}
                  ]
             })
             .then((result)=>{
                 res.send(result)
             })
             .catch((er)=>{
                 console.log(er)
             })


    }else{
        await Roupa.find({
                        $and:[
                            {loja_id:idloja},
                            {page:nomePage},
                            {posicao:{$gt:zero}}
                             ]
                        })
                        .then((result)=>{
                            res.send(result)
                        })
                        .catch((er)=>{
                            console.log(er)
                        })
    }                    
})
  
router.get('/busca-rapida/:id',async(req,res)=>{
    console.log('');
    console.log('_____________________________________________');
    console.log('');
    console.log(' [ 1072 ]');
    console.log(' views : views/_site/segmentos/mconstrucao.handlevars=> layout:site/segemnto/mconstrucao');
    console.log(' route : /routes/_site/rotinas_/busca-rapida/:id');
    console.log(' obs : Vem pegar os produtos que contém no nome as 3 primeiras letras iniciando o nome ');
    console.log('       escolhido.');
    console.log('');
    console.log('       Essa rotina busca as lojas que cotém o produto');
    console.log('');
    console.log(' destino : volta para preencher a lista ');
    console.log('');
    console.log('-----------------------------------------------------');
    console.log('params : ',req.params);
    let palavra=req.params.id;
    Mconstrucao.find({"descricao":{"$regex":'^' + `${palavra}`, "$options": "i"}},{descricao:1,marcaloja:1,loja_id:1})
               .then((produtos)=>{
                   console.log(produtos.length)
                   console.log(produtos[0]);
                   console.log(produtos[1]);
                   console.log(produtos[2]);
                   //return
                   res.send(produtos);
               })
               .catch((e)=>{
                  console.log(e)
               })
   
})

router.post('/cidade_bairro',async(req,res)=>{
    //let p=req.body;
    //let n='65df8bb141e3e5ec0701c724';
    return
    Mconstrucao.updateMany({loja_id:n},{
                                       $set:{
                                         cidade:'Vila Velha',
                                         bairro:"Itapuã",
                                                 }
                                        })
                .then((result)=>{
                   console.log(result)
                })
                .catch((e)=>{
                   console.log(e); 
                })
})

router.post('/publicados',(req,res)=>{
    console.log('');
    console.log('_____________________________________________');
    console.log('');
    console.log(' [ 1157 ]');
    console.log(' views : views/_site/segmentos/mconstrucao.handlevars=> layout:site/segmento/mconstrucao');
    console.log(' route : /routes/_site/rotinas_/buscaLoja/:id');
    console.log(' obs : Vai para o catalogo do cooperado escolhido.');
    console.log('');
    console.log(' destino : segue para o catalogo');
    console.log('');
    console.log('-----------------------------------------------------');
    console.log('testando',req.body)
    let idLoja=req.body.namepassaId;
    console.log('');
    console.log('',idLoja);
   //eturn
    /////////////////////////////////////////////////////
    try{
        res.render("_site/loja/lojaCooperado", {layout:'site/lojas/loja.handlebars',lojaid:idLoja}); 
    }catch(e){
        //console.log("fogo!",e)
    }           
})

router.get('/pega-prodLoja/:cod',async(req,res)=>{
    console.log('');
    console.log('_____________________________________________');
    console.log('');
    console.log(' [ 1183 ]');
    console.log(' views : views/_site/segmentos/mconstrucao.handlevars=> layout:site/segmento/mconstrucao');
    console.log(' route : /routes/_site/rotinas_/buscaLoja/:id');
    console.log(' obs : Vai para o catalogo do cooperado escolhido.');
    console.log('');
    console.log(' destino : segue para o catalogo');
    console.log('');
    console.log('-----------------------------------------------------');
    console.log('testando',req.params)
    let id=req.params.cod;
    Mconstrucao.find({loja_id:id})
    .then((produtos)=>{
        console.log('______________________________________');
        console.log(produtos.length);
        console.log(' catálogo',produtos[1]);
        let titulo=produtos.marcaloja;
        console.log('');
        res.send(produtos)
        console.log('_________________________________________________________________');
})
.catch((er)=>{
console.log(er);
})
})
module.exports = router;
