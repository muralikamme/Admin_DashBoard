const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    profilePicture: { type: String, required: false },
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    role: { type: String, required: false, default: 'user' }, //user & admin
    otp: { type: String, required: false },
    screenStatus: { type: String, required: false, default: "otpVerification" },
    status: { type: String, required: false, default: 'Active' },
    isVerified: { type: Boolean, required: false, default: false },
    recentSearches: { type: [String], required: false }, // ["rest", "test", "hello"]
    favouriteProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "products", default: [] }],
    fcmToken: { type: String, required: false },
    fcmTokenType: { type: String, required: false },
    isForgotOTP: { type: Boolean, required: false },

}, { timestamps: true }
);

const Customer = mongoose.model("customer", userSchema);
module.exports = Customer;