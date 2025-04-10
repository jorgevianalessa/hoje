const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URI || 'mongodb://localhost/mydatabase',{
            useNewUrlParser:true,
            useUnifiedTopology:true
         })
        .then((db=>console.log(`Database is connected to ${db.connection.host}`)))
        .catch((err)=>{
            console.log('ocorreu um erro!')
        })

      
