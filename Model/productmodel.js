const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }], // will store image file paths or URLs
  regularprice: { type: Number, required: true },
  saleprice: { type: Number },
  stockstatus : { type: String, enum: ["avaliable", "outofstock"] },
  expiredateofproduct: { type: Date },
  category:{type:mongoose.Schema.Types.ObjectId,ref:"category"} ,
  vendor: { type: String },
  collection: { type: String },
  tags: { type: String }
 
}, { timestamps: true });


const Product= mongoose.model("Product", ProductSchema);

module.exports=Product
