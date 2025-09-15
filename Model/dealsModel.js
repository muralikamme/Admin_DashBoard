const mongoose = require("mongoose")

const DealsSchema = new mongoose.Schema({
    name:{type:String ,required:false},
    picture:{type:String,required:false},
    layout:{type:String,required:false},
    product:[{type:mongoose.Schema.Types.ObjectId,ref:"Product"}]
},
{timestamps:true}
)


const Deals = mongoose.model("Deals",DealsSchema)

module.exports = Deals