const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/logout',(req,res) => {
    console.log('--> /logout')
    req.logout()
    req.flash("success_msg","Deslogado com successo!")
    res.redirect('/usuario/login')
})

router.get('/login',(req,res)=>{
    console.log('');
    console.log('_______________________________________');
    console.log('');
    console.log(' [ 16 ]');
    console.log(' origem views : views/_site/home/home.handlebars/{loja/login} ');
    console.log(' origem route : /_lojista/usuario.js(get(/login))');
    console.log(' obs : layout:"login.handlebars"');
    console.log('');
    console.log(' destino :_cooperado/usuario/loja/login');
    console.log('');
    console.log('__________________________________________________');
    console.log('')
    console.log('')
    res.render("_cooperado/usuario/loginloja",{ layout:'login.handlebars'});
    //...............................................................
})

router.post('/login',(req,res,next) =>{
   console.log('-------------------------------------------------------')
   console.log(' [ 32 ] --> post/_lojista/usuario/loginloja')
   let emae=req.body.email;
   let senha=req.body.senha;
   let errors = []
   if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        errors.push({ error : "Erro: Necessário preencher o email!"})
   }

   if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        errors.push({ error : "Erro: Necessário colocar a senha!"})
   }

   if(req.body.senha.length>6 || req.body.senha.length<6){
        errors.push({ error : "Erro: A senha não pode ser de comprimento diferente de 6!"})
   }
      
   if(errors.length>0){
        console.log('os erros',errors)
        res.render("usuario/loginloja",{ layout:'admin.handlebars',errors:errors})
   }else{
       try{
            console.log( emae ,'<--->',senha)
            Comercio.findOne({email:emae,senha:senha})
                       .then((r)=>{
                        console.log('valor de r -->',r)
                        if(!r || r==undefined){
                            console.log("algo está errado")
                            res.render("usuario/loginloja",{ layout:'admin.handlebars',errors:r})
                        }else{
                            res.redirect('/admin/cooperados')
                            res.render("_cooperado/admin/admincooperados",{ layout:'participe.handlebars',cooperado:r});
                        }
                       })
                       .catch((e)=>{
                           console.log(e)
                       })
        }
        catch(err){
          console.log(9)
          console.log(err)
        }
    }
})


module.exports = router;