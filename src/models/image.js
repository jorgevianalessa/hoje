const { model,Schema } = require('mongoose');

const imageSchema = new Schema({
    url:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    razao:{
        type:String,
        required:false
    }
})

module.exports = model('image',imageSchema);
