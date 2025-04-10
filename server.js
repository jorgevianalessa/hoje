const express=require('express')
const handlebars = require('express-handlebars')
const cors = require('cors')
const session = require('express-session')
const flash = require('connect-flash')
const {eAdmin}=require("./helpers/eAdmin")
const morgan = require('morgan')
//const session = require('cookie-session');
///////////////////////////////////////////////
const bodyParser = require("body-parser")


/////////////////////////////////////////////////////////
const passport = require('passport')
require('./config/auth')(passport)
const path = require("path")
require('path')


const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
const BD = require('./src/routes/addBd')
const roupaAdd = require('./src/routes/roupaAdd')

const admin= require("./src/routes/_admin/usuario") // Ok
const administrativo = require("./src/routes/_sample/rotas");

const central = require("./src/routes/_admin/admin-central/admin_main");
const centralprod = require("./src/routes/_admin/admin-central/rotinas");
const centrallj = require("./src/routes/_admin/lojista_");
const centralseg = require("./src/routes/_admin/segmentos/rota_segmentos");
const centralX=require("./src/routes/_admin/admin-central/rotinas");

const fornec = require("./src/routes/_admin/fornecedores");
const home = require("./src/routes/_admin/admin-central/home");
const loja = require("./src/routes/_lojista/usuario");
const mnproduto = require("./src/routes/_admin/admin-central/mn_produto");
const redirect = require("./src/routes/_lojista/redirect");
const lojista = require("./src/routes/_lojista/lojista_");
const roupa = require("./src/routes/_lojista/roupa");
const site = require("./src/routes/_site/rotinas_");

const raqcompras= require("./src/routes/_sample/raq/raq-compras");
const raqprodutos= require("./src/routes/_sample/raq/raq-produto");
const raqvendas= require("./src/routes/_sample/raq/raq-vendas");

const raqcontabil= require("./src/routes/_sample/raq/raq-contabil");
const global= require("./src/routes/_global/rotinas");

// app.use ('/home')
//const lojista = require("./src/routes/_lojista/lj_loja")
// const lojista = require("./src/routes/_lojista/lojista");
//const centralseg = require("./src/routes/_admin/admin-central/rotinas");
//const centrallj = require("./src/routes/_admin/admin-central/rotinas");
//const usuario=require('./src/routes/admin')
// const central_=require("./src/routes/_admin/admin-central/mn_lojista_");
// const home = require("./src/routes/home")
// const usuario = require("./src/routes/_admin/usuario")
// const cooperados = require("./src/routes/loja")

require('./src/config/multer');
//const x=require('./src/routes/servise-aws')
const mongoose = require('mongoose');

require('./')
require('./database/index');
// require('./database/space')
//require('./')

const { use } = require('passport')
// Conexão de dados
//const db = require('./src/config/db')


//require('./')
//require('./app')
require('./')
app.use(morgan("dev"));
// app.use(db)

//Sessão 
app.use(session({
    secret:'vitor/19/ia!',
    resave:true,
    saveUninitialized:true,
}))

//flash
app.use(flash())
//Middleware - 
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg") 
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})

app.use(express.urlencoded({extended: true}))
app.use(cors(),express.json())

// Handlebars
app.engine('handlebars', handlebars.engine({ defaultLayout:'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
}))

app.set('view engine','handlebars');
app.use(express.static("imagens"));
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Handlebars
// app.engine('handlebars', handlebars({
//     defaultLayout:"main",
//     helpers:{
//         counter:(index)=>index + 1,
//         speak:()=>"hi Earth!",
//         zero:((recebe)=>{
//             if (recebe==0){
//                 return 
//             }else{
//                 return recebe
//             }}),
//          hum:((paga)=>{
//             if (paga==0){
//                 return 
//             }else{
//                 return paga
//             }}),
//         },
// }));
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Route to display static src images
// app.get("/static", (req, res) => {
//     res.render("static");
// });
  
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Arquivos estáticos
app.use(express.static(path.join(__dirname,"public")))

//Rotas
app.use('/addBd',BD);
app.use('/roupaAdd',roupaAdd);
app.use('/admin',admin);
app.use('/',home);
app.use('/produto',mnproduto);
app.use('/fornec',fornec);  
app.use('/produtoprod',centralprod);
app.use('/loja',loja);
//app.use('/lojista',lojista);
app.use('/controle',administrativo);
app.use('/lojista',lojista);
app.use('/roupa',roupa);
app.use('/redirect',redirect);
app.use('/central',central);
app.use('/centrallj',centrallj);
app.use('/centralseg',centralseg);
app.use('/site',site);
app.use('/central_',centralX);

app.use('/raqcompras',raqcompras); 
app.use('/raqprodutos',raqprodutos);    
app.use('/raqvendas',raqvendas);    

app.use('/raqcontabil',raqcontabil); 
app.use('/global',global); 
// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   });
  
//   app.use((err, req, res, next) => {
//     res.locals.error = err;
//     const status = err.status || 500;
//     res.status(status);
//     res.render('errorXXX');
//   });

const URR=process.env.DB_URL;
// [ 168 ] server.js');
// " URL : ",URR

const PORT = process.env.PORT || 3000;
//Passport
app.use(passport.initialize())
app.use(passport.session())

//const PORT= 8085;
app.listen(PORT,async()=>{
    console.log('_____________________________________');
    //console.log(' [ 180 ]  server.js')
    console.log(" Servidor iniciado!!!" + PORT);
    console.log('_____________________________________');
    console.log('')
})