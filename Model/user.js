const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

// Hash password before saving
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  
  next();
});

  // Add matchPassword method
  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
const User = mongoose.model("User", userSchema);




module.exports=User
