const mongoose = require('mongoose')
const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
       public_id:{
           type:String,
       },
       url:{
           type:String
       }
    },
    category:{
        type:String,
        required:true
    }
},
{timestamps:true}
)

module.exports = mongoose.model('Food',foodSchema)