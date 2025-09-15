const mongoose = require("mongoose")

const favouriteSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Customer"},
    product:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
    isFavourite:{type:Boolean,require:false}
})

const favourite = mongoose.model("favourite",favouriteSchema)

module.exports = favourite
