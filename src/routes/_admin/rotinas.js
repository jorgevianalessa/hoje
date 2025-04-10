
const router = express.Router()
// const mongoose = require('mongoose')
const { eAdmin } = require("../../../helpers/eAdmin")

router.get('/lista-lojista',async(req,res)=>{
    console.log('');
    console.log('___________________________________');
    console.log('');
    console.log(' [ 10 ]');
    console.log(' origem views : views/partials/_acentra_sidebar.handlebars/href"centrallj/lista-lojista');
    console.log(' origem route : routes/_admin/mn_lojista_.js/lista-loKKKjista');
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
                //console.log('......',setor)
                res.render("_admin/admin/lojista-lista",{ layout:'lojista_lista.handlebars',seg:Z,setor:setor});
              }    
           })
           .catch((e)=>{
            console.log(e)
           })
         //  res.render("_admin/admin/main_lista-lojista",{ layout:'participe.handlebars',seg:Z,setor:setor});
   // res.render("_admin/admin/main_lista-lojista",{ layout:'participe.handlebars'});
})