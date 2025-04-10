const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//require('../../../models/segmentos');

//const Segmento = mongoose.model('segmento');

require('../../../models/lojista')
const Lojista = mongoose.model('lojista')

require('../../../models/endereco-lojista')
const endLojista = mongoose.model('enderecolojista')

require('../../../models/segmentos_')
const Segmento=mongoose.model("segmentos")


// require('dotenv').config({path:'../config.env'})
require('dotenv').config({path:'../env'})

// Grava os dados do cooperado
router.post('/grava-cadastro-lojista',(req,res)=>{
    console.log('');
    console.log('_______________________________________________');
    console.log(' [ 26 ] ');
    console.log(' origem views : views/_admin/admin/main_cadastro-lojista')
    console.log(" origem route : routes/_admin/mn_lojista.js")
    console.log(' obs : ');
    console.log('');
    console.log(' destino : ');
    console.log('')
    console.log('__________________________________________________');
    console.log('');
    let dados_business = req.body
    let errors = []
    console.log('participe/cadastronegocio -->',dados_business)
    if (!req.body.rzsocial || typeof req.body.rzsocial == undefined || req.body.rzsocial == null) {
        errors.push ({ error:"Necessário preencher a razão social!"})
    }
  
    if (!req.body.resp1 || typeof req.body.resp1 == undefined || req.body.resp1 == null) {
        errors.push ({ error:"Necessário preencher o nome do responsavel 1!"})
    }
  
    if (!req.body.cpf1 || typeof req.body.cpf1 == undefined || req.body.cpf1 == null) {
        errors.push ({ error:"Necessário preencher o cpf 1!"})
    }
  
    if (!req.body.cnpj || typeof req.body.cnpj == undefined || req.body.cnpj == null) {
        errors.push ({ error:"Necessário preencher o cnpj!"})
    }
  
    if (!req.body.inscricao || typeof req.body.inscricao == undefined || req.body.inscricao == null) {
        errors.push ({ error:"Necessário preencher a inscrição estadual!"})
    }
  
    if (!req.body.nomeSite || typeof req.body.nomeSite == undefined || req.body.nomeSite == null) {
      errors.push ({ error:"Necessário colocar o nome do site!"})
    }
  
    if (!req.body.marca || typeof req.body.marca == undefined || req.body.marca == null) {
        errors.push ({ error:"Necessário preencher o campo da marca!"})
    }
  
    if (!req.body.celular || typeof req.body.celular == undefined || req.body.celular == null) {
        errors.push ({ error:"Necessário preencher o campo do celular!"})
    }
  
    if (!req.body.telefixo || typeof req.body.telefixo == undefined || req.body.telefixo == null) {
        errors.push ({ error:"Necessário preencher o campo do telefone fixo!"})
    }

    if (!req.body.boxEmail || typeof req.body.boxEmail == undefined || req.body.boxEmail == null) {
        errors.push ({ error:"Necessário preencher o campo do dono e-mail!"})
    }

    if (!req.body.inputCep || typeof req.body.inputCep == undefined || req.body.inputCep == null) {
      errors.push ({ error:"Necessário preencher o campo do código postal!"})
    }
  
    if (!req.body.inputSenha || typeof req.body.inputSenha == undefined || req.body.inputSenha == null) {
        errors.push ({ error:"Necessário preencher a senha!"})
    }
  
    if (!req.body.inputAvenida || typeof req.body.inputAvenida == undefined || req.body.inputAvenida == null) {
        errors.push ({ error:"Necessário preencher o nome da rua !"})
    }
  
    if (!req.body.inputNumero || typeof req.body.inputNumero == undefined || req.body.inputNumero == null) {
        errors.push ({ error:"Necessário preencher o número do estabelecimento!"})
    }
  
    if (!req.body.inputCidade || typeof req.body.inputCidade == undefined || req.body.inputCidade == null) {
        errors.push ({ error:"Necessário preencher o nome da cidade!"})
    }
  
    if (!req.body.inputBairro || typeof req.body.inputBairro == undefined || req.body.inputBairro == null) {
        errors.push ({ error:"Necessário preencher o nome do bairro!"})
    }
    if (!req.body.inputEstado || typeof req.body.inputEstado == undefined || req.body.inputEstado == null) {
        errors.push ({ error:"Necessário preencher o nome do estado!"})
    }
  
    if (!req.body.SelectSeg || typeof req.body.SelectSeg == undefined || req.body.SelectSeg == null) {
        console.log('lolo',req.body.SelectSeg)
        errors.push ({ error:"Necessário preencher o segmento da loja!"})
    }

    if (!req.body.SelectSubSeg || typeof req.body.SelectSubSeg == undefined || req.body.SelectSubSeg== null) {
        errors.push ({ error:"Necessário preencher o sub-segmento da empresa!"})
    }
  
    if(errors.length>0) {
        console.log('/cadastronegocio--Errors')
        console.log(errors)
        req.flash("error_msg","Error: Não foi possivel cadastrar a sua empresa!",errors)
                       console.log(dados_business)
                       res.render("participe/cadastro",{errors:errors,contato:dados_business})
    }else{
        let site;
        site =req.body.nomeSite ;
        msgEmail=req.body.boxEmail
        password=req.body.inputSenha;
        const salt = bcrypt.genSaltSync(10)
        password= bcrypt.hashSync(password,salt)
        let SelectSeg=req.body.SelectSeg;
        let SelectSubSeg=req.body.SelectSubSeg;
        let template='default';
        let assinante=0;
        //let ativo=0;
        console.log('linha 139',SelectSubSeg)
        const addContato = {
            razao:req.body.rzsocial,
            assinante:assinante,
            situacao:'ativo',
            template:0,
            atividade:3,
            responsavelHum:req.body.resp1,
            cpfHum:req.body.cpf1,
            cnpj:req.body.cnpj,
            inscricao:req.body.inscricao,
            site:site,
            marca:req.body.marca,
            celular:req.body.celular,
            telefone:req.body.telefixo,
            cep:req.body.inputCep,
            email:msgEmail,
            senha:password,
            logradouro:req.body.inputAvenida,
            numero:req.body.inputNumero,
            cidade:req.body.inputCidade,
            bairro:req.body.inputBairro,
            estado:req.body.inputEstado,
            urllogolista:'default',
            urllogomarca:'default',
            urltitulopage:'default',
            segmento:[
                   {titulo:SelectSeg,
                    sub_titulo:[
                                 {
                                  subtitulo:SelectSubSeg,
                                   template:template
                                 }
                               ],
                    template:template,
                  },      
                ]  
        }
  
        
        const addEnd = {
          cep:req.body.inputCep,
          complemento:req.body.inputComplemento,
          logradouro:req.body.inputAvenida,
          numero:req.body.inputNumero,
          cidade:req.body.inputCidade,
          bairro:req.body.inputBairro,
          estado:req.body.inputEstado,
        }
        new endLojista(addEnd)
                  .save()    
                  .then((end)=>{
                      console.log(end)
                      gravaLoja()
                  })
                  .catch((err)=>{
                      console.log(err)
                      
                  })
  
        function gravaLoja(){
          console.log('linha 190 gravando loja')  
          new Lojista(addContato)
                      .save()
                      .then((r)=>{
                          console.log(r)
                          req.flash("success_msg","Mensagem enviada com sucesso!")
                          //var originalHex = objectId.toHexString(r._id)
                          //console.log('valor da id',originalHex);
                          //console.log(222)
                          res.redirect('lista-lojista')
                      })
                      .catch((err)=>{
                          console.log(err)
                          req.flash("error_msg","Error: Mensagem de contato não foi enviada com sucesso!",err)
                          res.redirect('cadastro-lojista')
                      })
        }          
     }
  })

  router.get('/cadastro-lojista',(req,res)=>{
    console.log('');
    console.log('___________________________________');
    console.log('');
    console.log(' [ 205 ]');
    console.log(' origem views : views/partials/_acentral_sidebar_handlebars/href="cadastra-lojista"');
    console.log(' origem route : route/_admin/mn_lojista.js/cadastro-lojista');
    console.log(' obs : layout:"participe.handlebars"');
    console.log('');
    console.log(' destino : views/_admin/admin/main_cadastro-lojista');
    console.log('');
    console.log(' ___________________________________');
    console.log('');
    let R;
    let Z=[]
     async function bSeg(){
           await  Segmento.find({},{'segmento':1,'_id':0}).sort({segmento:1})
                    .then((r)=>{
                        console.log(r)
                        let x=r.length;
                        for (a=0;a<x;a++){
                            R=r[a];
                            let s=R.segmento
                            Z.push({s})
                        }
                        let W=R
                        //console.log('valor de W.segmento : ',W.segmento)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    let [z]=Z;
                     res.render("_admin/admin/admin-cadastro-geral",{ layout:'central/admin-cadastro-geral.handlebars',segmento:Z});
                    /////////////////////////////////////////////////////////////////////////////////////////
        }
            
    bSeg()
           
})
  router.get('/login',(req,res)=>{
    console.log('');
    console.log('____________________________________________');
    console.log('');
    console.log(' [ 11  ]');
    console.log(' origem views : views/www.rotaes.com.br/{admin/login');
    console.log(' origem route : _admin/usuario.js/login');
    console.log(' obs : mostra a page para digitar a senha ');
    console.log('');
    console.log(' destino : _admin/usuario/login => layout:"login.handlebars"');
    console.log('');
    console.log('____________________________________________');
    console.log('');
    console.log('');
    res.render("_admin/usuario/login",{ layout:'login.handlebars'});
})

router.post('/login',async(req,res,next) =>{
    console.log('');
    console.log('____________________________________________');
    console.log('');
    console.log(' [ 271 ]');
    console.log(' origem views :');
    console.log(' origem route : /_admin/usuario/post("/login")');
    console.log(' obs : ');
    console.log('');
    console.log(' destino :');
    console.log('');
    console.log('req.body  : ',req.body)
    console.log('____________________________________________');
    //require('dotenv').config({path:'./config.env'})
    console.log('');
    try{
        console.log(' [ 42 ] => antes do passport.authenticate')
        await passport.authenticate("local",{
            successRedirect:"/central/",
            failureRedirect:"/usuario/login",
            failureFlash:true
        })(req,res,next)
        console.log(' [ 48 ] => depois do passport.authenticate : ');
        //console.log(res)
    }
    catch(err){
        console.log(err)
    }

})

router.get('/logout',(req,res) => {
    console.log('--> /logout')
    req.logout()
    req.flash("success_msg","Deslogado com successo!")
    res.redirect('/usuario/login')
})

// 
 router.get('/loginloja',(req,res)=>{
     console.log('40usuario/loginloja')
   
     res.render("_cooperado/usuario/loginloja",{ layout:'login.handlebars'});
 })


module.exports = router;