const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    tokens: [{ type: String, required: true }], // Change token to tokens and make it an array
}, {
    timestamps: true
});

const token = mongoose.model("token", tokenSchema);

module.exports = token;