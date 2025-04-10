const mongodb = require('mongodb')
const mongoose = require('mongoose')
const path=require('path')

require('dotenv').config({path:'./.env'})
 //console.log('');
 //console.log('___________________________________________');
 //console.log('');
 //console.log(' [ 6 ]  database/index,js')
 //console.log('');
 //console.log(" Chave : ",`${process.env.DB_CONNECT}`);
 //console.log('');
 //console.log('__________________________________________');
 console.log('');
 if (`${process.env.NODE_ENV}`!=='development'){
        mongoose.connect(`${process.env.DB_CONNECT}`,
            {useNewUrlParser:true,
        }).then(()=>{
           // console.log('');
            console.log('___________________________________________________________');
           // console.log('')
            console.log("Conexão com MongoDB- Rotaes realizada com sucesso!!!");
          //  console.log('');
           // console.log('___________________________________________________________');
            urr=`${process.env.DB_URL}`;
           // console.log(' ');
           // console.log('');
           // console.log(' [ 29 ] databse/index.js');
           // console.log('');
            console.log('   URL :',urr);
           // console.log('')
            console.log('___________________________________________________________');
           // console.log('')
        }).catch((erro)=>{
            console.log('');
            console.log('_______________________________________________________________');
            console.log('');
            console.log("- Error:Não foi possivel conectar ao banco Development!!",erro)
            console.log('');
            console.log('_______________________________________________________________>');
            console.log('');
        });
 }else{
     console.log('linha 27',1)
     busc()
     async function  busc(){
             mongoose.connect("",{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).then(()=>{
                console.log("Conexão com MongoDB-?????Loja Hum realizada com sucesso!!!")
            }).catch((erro)=>{
                console.log("-production - Error:Não foi possivel conectar ao banco Produção!",erro)
            });
      }
 }
 

module.exports = mongoose.connect;
