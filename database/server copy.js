require("dotenv").config();
// Package
const express=require('express');
const mongodb=require('mongodb');

//Confugurando App
const app=express();

const port=process.env.PORT || 3000;
const MongoClient=mongodb.MongoClient;

app.use(express.json());

//connect mongodb database
let cachedClient=null;
let cachedDB=null;

async function connectToDatabase(){
    if(cachedDB) return cachedDB;

    const client=await MongoClient.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        //tls:true,
        tlsCAFile:"./ca-cerificate.crt"
    });

    const db=client.db("tweets");

    cachedClient=client;
    cachedDB =db;

    return db;
}



//Routes 
app.get('/',(req,res)=>{
    res.send("Olá,Otávio")
})


//Create
app.post("/tweets",async(req,res)=>{

    const db = await connectToDatabase();

    const text= req.body.text;

   const tweet = await db.collection("tweets").insertOne({text});

    res.send({tweet});

})

//Read
app.get('/tweets',async (req,res)=>{

    const db=await connectToDatabase();

    const tweets =await db.collection("tweets").find({}).toArray();
    //const Tweets=mongoose.model();
    //const tuees=Tweets.findAll();
    res.json({tweets});
})

// Update
app.put("/tweets/:tweetId",async(req,res)=>{
    const tweetId= req.body.tweetId;
    const text= req.body.text;

    const db = await connectToDatabase();

    const tweet = await db
                        .collection("tweets")
                        .updateOne({"_id":tweetId},{ $set :{text}});

    res.send({tweet});

})

// Delete
app.delete("/tweets/:tweetId",async(req,res)=>{
    const tweetId= req.body.tweetId;
    const text= req.body.text;

    const db = await connectToDatabase();

    const tweet = await db
                        .collection("tweets")
                        .deleteOne({"_id":tweetId});

    // ({_id:mongodb.ObjectId(tweetId)}                    

    res.send({tweet});

})



// Server
app.listen(port,()=>{
    console.log("our app is running on port",port);
});