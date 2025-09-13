const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const categorySchema = new mongoose.Schema({
    picture: { type: String, required: false },
    name: { type: String, required: false },
    type: { type: String, required: false }, //food / grocery / ecommerce
    preference: { type: String, required: false, default: 'Inactive' },
    status: { type: String, required: false, default: 'Active' },
}, { timestamps: true }
);

const category = mongoose.model("category", categorySchema);
module.exports = category;