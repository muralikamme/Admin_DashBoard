const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "customer", required: false },
    addressLabel: { type: String, required: false, default: "N/A" },
    areaBuildingAndBlock: { type: String, required: false, default: "N/A" },
    landmark: { type: String, required: false, default: "N/A" },
    latitude: { type: String, required: false, default: "N/A" },
    address: { type: String, required: false, default: "N/A" },
    longitude: { type: String, required: false, default: "N/A" },
    receiverName: { type: String, required: false, default: "N/A" },
    receiverPhone: { type: String, required: false, default: "N/A" },
    city: { type: String, required: false, default: "N/A" },
    default: { type: Boolean, required: false, default: false },
}, { timestamps: true }
);
    
const address = mongoose.model("address", addressSchema);

module.exports = address;