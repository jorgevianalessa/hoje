const express = require('express')
const { get } = require('express/lib/response')
const { Db, ObjectId } = require('mongodb')
const router = express.Router()
const mongoose = require('mongoose')
require('../../models/prod_lojista')
const ProdutoNew = mongoose.model('prod_lojista')
require('../../models/segmentos')
const Segmento = mongoose.model('segmento')

// string para importação de data via SHELL
//mongoimport --db query --collection pokemon --type json --file pokemon.json
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//> db.pokemon.find({legendary:true}).count()
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// >db.pokemon.distinct("generation") 
// [1,2,3,4,5,6]
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// >db.pokemon.find({name:/Pik/}).pretty() <--- regex qualquer lugar
// >db.pokemon.find({name:/^Pik/}).pretty() <--- regex começando com...
// >db.pokemon.find({ name:/a$/}).pretty() <--- regex termina com ....
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// >db.pokemon.find({name:/^pik/i}).pretty() <--- regex começando com...[ ignore case sensitive ]
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// >db.pokemon.find({attack:{$qte:85}},{name:1,attack:1}).pretty()
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Comparison Query Operators :: Reference>Operators>Query and Projection Operators>
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// >db.pokemon.find({attack:{$ne:85}},{name:1,attack:1}).pretty() --< não igual/diferente
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Buscar um valor dentro de um array,no exemplo estamos buscando dentro da collection 'produto' o valor do array que seja igual a "esteves
// >db.pokemon.find({palavrachaves:"esteves"}.{codigoBarra:1,descritivo:1,_id:0}.sort()
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// >db.pokemon.find({palavrachaves:{$in:["esteves","caralho!","chulé"]}.{codigoBarra:1,descritivo:1,_id:0}.sort()
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//  $nin --> é a negação / diferente de....
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//>db.pokemon.find({name:{$in:[/^pi/i,/^Pu/]}}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//>db.pokemon.find({defense:{$gte:80,$lte:90}},{_id:0,name:1,defense:1})
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//>db.pokemon.find({ $OR })
// >db.pokemon.find(
    {
        $or: [
                {
                    defense:{
                        $gte:80,
                    }
                },
                {
                    attack:{
                        $gte:80
                    }
                }
             ]
    }
//)
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// >db.pokemon.find(
    {
        $or: [
                {
                    defense:{
                        $gte:80,
                    },
                    hp:{
                        $gte:80,
                    }
                },
                {
                    attack:{
                        $gte:80
                    }
                    ,speed:{
                        $gte:80,
                    }
                }
             ]
    }
//)
// ????????????????????????????????????????????????????????????
///db.inventory.find( { tags: ["red", "blank"] } )
// ????????????????????????????????????????????????????????????
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//>db.pokemon.find({ }).SORT({ hp:1,defense:-1})
router.put('/ordenando_lojista/:id',(req,res)=>{
    console.log('-------------------------------------------') 
    console.log('(86) --> get/_lojista/update_palavra/:id/:id')
    console.log('substitui um array por uma palavra ,não é isso que quero!')
    let n=req.params;
    let [r]=Object.values(n);
    let h=r.substring(1,r.length)
    console.log('-----------------------------------------')
    console.log('---------------------HHHHHH-----------------')
    let cnpj1='459999-09';           
    let codB1="789.988.77";
    let rzao1="Casa Rara";
    let preco1='81,99';
    ProdutoNew.updateMany({descritivo:"torneira para lavatório"},
                {$push:{
                     lojista:{
                         $each:[],
                         $sort:1
                     }
                    }
                 }
            )           
           .then((resulti)=>{
               console.log('vr de resulti',resulti);
            })
           .catch((e)=>{
               console.log('valor do error',e)
           })
})







    //-----------------------------------------------------------------------------------------
    // TROCA  4 palavras dentro do array por uma ÚNICA palavra.Não é isso que eu quero.
    //Produto.updateOne({palavrachaves:primeiraPalavra},{$set:{palavrachaves:segundaPalavra}})

    //------------------------------------------------------------------------------------------
    // TROCA SOMENTE UM ELEMENTO DENTRO DO ARRAY
    //Produto.updateOne({palavrachaves:primeiraPalavra,palavrachaves:`${primeiraPalavra}`},{$set:{"palavrachaves.$":`${segundaPalavra}`}})
    
    //-------------------------------------------------------------------------------------------
    // ATUALIZA TODOS OS ELEMENTOS DO ARRAY = Não sei,não senti firmeza
    //Produto.updateOne({palavrachaves:primeiraPalavra},{$set:{"palavrachaves.$[]":`${segundaPalavra}`}})
    // ------------------------------------------------------------------------------------------
    // ,"cbarra$": `${codB1}`,"marca$":`${marca1}`, "preco$":`${preco1}`}properties.$.items

         
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//>db.pokemon.find({palavrachaves:"torneira"},{_id:0,name:1,palavrachaves:1}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//>db.pokemon.find({palavrachaves:{$all:["torneira","hidraulica"]}},{_id:0,name:1,palavrachaves:1}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Só trás os registros que contém apenas uma palavra chaves
//>db.pokemon.find({palavraschaves:{$size:1}},{_id:0,name:1,palavrachaves:1}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Só trás os registros que contém apenas duas palavra chaves
//>db.pokemon.find({palavraschaves:{$size:2}},{_id:0,name:1,palavrachaves:1}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Db.pokemon.find(
//            {
//                $and :[
//                    {palavrachaves:"torneira"},
//                    {palavrachaves:"hidraulica"},
//                    {_id_lojista:"Lavanda comercial"}
//                ]
//            },
//            {_id:0,cbarra:1,palavrachaves:1}
// )
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Db.pokemon.find(
//     {
//        palavrachaves:"torneira",
//        palavrachaves:"hidraulica",
//        _id_lojista:"Lavanda comercial"
//     },
//     {_id:0,cbarra:1,palavrachaves:1}
// )

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
{
    // "id"=31,
    // "types"=["eletric"],
    // "name"="Picachu",
    // "battle_points"={
    //     "hp":130,
    //     "attack":89,
    //     "speed":100,
    //     "defense":63
    // },
    // "generation"=1
}
//db>pokemon.find(:battle_points:{$exists:true})
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const pokemon={
                "id":31,
                "types":["eletric"],
                "name":"Picachu",
                "battle_points":{
                    "hp":130,
                    "attack":89,
                    "speed":100,
                    "defense":63
                },
                "generation":1
            }
pokemon.battle_points.hp
// result --> 130
// >db.pokemon.battle_points.hp
// >db.pokemon.find({"battle_points.hp" :{ $lte:40 }}).pretty()





// db.pokemon.find({ palavrachaves:"torneira"},{cbarra:1,id_lojista:1,_id:0}).sort({id_lojista:1}).skip(5).limit(5)

 
  
//   router.get('/cadastro_produto/:id',(req,res)=>{
//     console.log('--------------------------------------')  
//     console.log('vem de -->test-mongodb.handlebars')
//     console.log('(341) --> post/_??????/produto/cadastro_produto/:id')  
//     let n=req.params;  
//     console.log(n)
//     let [rz]=Object.values(n);
//     console.log('vr de p',rz)
//     Segmento.find({},{segmento:1,_id:0}).sort({"segmento":1})
//      .then((segmento)=>{
//          console.log(segmento)
//          if(!segmento){
//              //res.render("admin/segmentos", {layout:'participe.handlebars'})
//          }else{
//             // res.render("produto/cadastro-produto", {layout:'produto.handlebars'})
//             console.log(888888888888888888)
//              res.render("_cooperado/produto/cadastro-produto", {layout:'produto.handlebars',segmentos:segmento,razao:rz})
//          }
//      })
//      .catch((e)=>{
//          //console.log('admin/segmentos.js->',e)
//      })
//       // res.render("_cooperado/produto/cadastro-produto", {layout:'produto.handlebars',razao:rz})
//   }),

  module.exports = router;