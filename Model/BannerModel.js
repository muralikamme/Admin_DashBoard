const mongoose=require("mongoose")


const   bannersSchema =  new mongoose.Schema({
    bannerPicture: {type:String, require:true},
    status:{ type:String,required:false,default:"active"}
},{ timestamps: true })


const banners= mongoose.model("banners",bannersSchema)

module.exports=banners