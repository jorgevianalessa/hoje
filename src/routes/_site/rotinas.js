const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const flash = require('connect-flash')
const { ObjectId } = require('mongodb')
require('../../models/segmentos')
const Segmento = mongoose.model('segmento')
require('../../models/segmentosubs')
const Segmentosub = mongoose.model('segmentosub')
require('../../models/lojista')
const Lojista = mongoose.model('lojista')

require('../../models/roupa_estoque');
const Roupa = mongoose.model('roupa_estoque');

//require('../../models/roupa_estoque');
//const RoupaStok = mongoose.model('roupa_estoque');

//require('../../models/roupa_cor');
//const RoupaCor = mongoose.model('roupa_cores');

// Busca a lista de produtos cadastrados do lojista/cooperado para display na relação de produtos:produto/list-produto
router.post('/construcao',(req,res)=>{
    console.log('------------------------------------------------')
    console.log('(18) --> post/_site/construcao/construcao')
    let f=req.body;
    console.log('só renderiza')
    res.render("_site/home/construção", {layout:'construcao.handlebars'})
})

// buscar segmentos nível 02 para pesquisa ou cadastro
router.get('/busca-segmentos_02/:id',(req,res)=>{
      console.log('------------------------------------------------------------------')
      console.log('(20)-> get/_site/segmentos/busca-segmento_02/:id')
      let H=req.params;
      const N=Object.values(H);
      let [G]=N;
      Segmentosub.find({segmentos_01:`${G}`},{segmentos_02:1,_id:0}).sort({segmentos_02:1}) 
                 .then((segm)=>{
                      console.log('result',segm)
                      if( segm.length == 0){
                         // -----------------------------------------------------------------
                          console.log('linha 101',segm)
                          let M=[]
                          M="não há registros"
                          let g={
                              seq02:[M],
                          }
                          //-------------------------------------------------------------
                          let Ab={}
                          Ab={
                              seq02:g,
                          }
                          Ab=Object.values('valor de Ab',Ab);
                          res.send(g)
                      }else{
                          let [P]=segm;
                        //  console.log('linha 36 segm',segm)
                          const M =Object.values(P.segmentos_02)
                        //  console.log('valor de M',M)
                         //--------------------------------------------------------------- 
                          let Ab={}
                          Ab={
                              seq02:M,
                          }
                          //------------------------------------------------------------
                         // console.log(Ab)
                          res.send(M)
                      }    
                 })
                 .catch((e)=>{
                     console.log(e)
                 })
  })
  
router.get('/segmento_01/:id',(req,res)=>{
      let b=req.params;
      [b]=Object.values(b)
      console.log("AQUI NÓS TAMOS!",b)
      Segmento.find({segmento:b},{segmento_01:1,_id:0}).sort( { segmento_01:-1} )
              .then((S)=>{
                  const [m]=S;
                  console.log('vr de S',S)
                  console.log(m)
                  const x=m.segmento_01;
                  const z=x.sort()
                  console.log(z)
                  res.send(z)
              })
              .catch((err)=>{
                  console.log(err)
              })
  })
  
router.get('/busca-valores/:id',(req,res)=>{
      console.log("-----------------------")
      console.log("60:  get/busca-valores/:id-")
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
    console.log(' origem route : _site/rotinas/segmentoMenu/:id');
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
                      console.log('linha 55',resp.length)
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
           console.log(' [ 185 ]')
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
    console.log('-linha 167 /routes/_site/rotinas/pegaLojista/:id---')
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
    console.log(' origem route : routes/_site/rotinas/mostrasite/:id=>[ click sobre nome da loja ]')
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
    console.log(" [ 264 ]");
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
       await RoupaStok.distinct("produto.artigo",{'produto.lojaid':`${IdLojista}`})
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
    console.log(' [ 295 ]');
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
    //console.log('params : X10',req.params)
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
    await  RoupaStok.find({
                          $and:[
                            {'produto.page':{$eq:page}},
                            {'produto.lojaid':{$eq:idloja}},
                            {'produto.posicao':{$gt:zero}},
                          ]
                        })
                    .then((resp)=>{
                      //console.log('linha [ 1677 ] ',typeof(resp));
                      if( typeof(resp)==[] || resp=='undefined'){
                          console.log('_____________________________________');
                          console.log('');
                          console.log("Não há nada publicado : ",page)
                          console.log('____________________________________');
                          console.log('');
                      }else{
                          let l=resp.length;
                          //.....................................
                       //   let P;
                       //   [P]=resp;
                          console.log('');
                       //   const iterator=resp.values();
                       //   let p=0;
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
    console.log(' [ 357 lojista/buscar-registros')
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
    await  RoupaStok.find({
                            $and: [
                                    {
                                      'produto.lojaid':`${idLojista}`,
                                      'produto.page':`${artigo}`,
                                      'produto.posicao':{$ne:`${zero}`}
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
                                console.log(' [ 1866 ] Não há nada publicado com : ',artigo)
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
    console.log(' [ 257 ]');
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
   
})

// AQUI COMEÇA LOAD ROUPAHOME/SITE
router.post('/buscar-artigo/:id',async(req,res)=>{
    console.log('---')
    console.log('-[ 341 ] busca artigos para seleção dos produto da page site --')
    console.log('---');
    console.log(req.params);
    let lojaid;
    await  ProdTemp.distinct("produto.artigo",{'produto.lojaid':`${lojaid}`})
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
    console.log(' [ 557 ]');
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
    RoupaStok.find(
                  {
                    $and:[
                        {'produto.lojaid':{$eq:idLoja}},
                        {'produto.homeposicao':{$gt:0}}
                    ]
                  }
            )
             .then((result)=>{
                //console.log(result)
                let c=result.length;
                x=c;
                let d;
                d=(c-1);
                //......................................
                for (let i=0;i<c;i++){
                    let g=result[i];
                    g=g.produto;
                    let codigo;
                    codigo=g.codigo;
                    let descricao;
                    descricao=g.descricao;
                    let posicao=g.homeposicao;
                    let tecido;
                    tecido=g.tecido;
                    let ncor=g.homenumbercor;
                    //...............................
                    //console.log('vr de i ', i ,'=== d', d)
                    if(i===d){
                        a='final';
                        buscaUrl(codigo,descricao,posicao,tecido,ncor,a,x)
                      }else{
                        a='segue : ' + i
                        buscaUrl(codigo,descricao,posicao,tecido,ncor,a,x)
                      }
                     //..................................................................
                }
             })
             .catch((err)=>{
                console.log(err)
             })
     
           async  function buscaUrl(codigo,descricao,posicao,tecido,ncor,d,x){
                //console.log('vr de a : ',x)
                await RoupaCor.find({_id:ncor}
                         )
                         .then((result)=>{
                             let [a]=result;
                             pacote={
                                codigo:codigo,
                                descricao:descricao,
                                posicao:posicao,
                                urlfront:a.urlfront,
                                vista:a.precovista,
                                prazo:a.precoprazo
                             }
                             //.............................................................
                             vasilha.push(pacote)
                             if(d==='final'){
                                console.log('vr da vasilha cheia ',vasilha)
                             }
                             let w=vasilha.length
                             if (w===x){
                                res.send(vasilha)
                             }
                            //.......................................                        
                         })
                         .catch((err)=>{
                            console.log(err)
                         })
             }
    
    
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
        await RoupaStok.find(
            {
             $and:[
                 {'produto.lojaid':idloja},
                 {'produto.homeposicao':{$gt:zero}}
                  ]
             })
             .then((result)=>{
                 res.send(result)
             })
             .catch((er)=>{
                 console.log(er)
             })


    }else{
        await RoupaStok.find(
                       {
                        $and:[
                            {'produto.lojaid':idloja},
                            {'produto.pagename':nomePage},
                            {'produto.pageposicao':{$gt:zero}}
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

  
module.exports = router;
