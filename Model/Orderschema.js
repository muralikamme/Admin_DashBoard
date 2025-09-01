const mongoose = require("mongoose");
const Product=require("./productmodel")
const Customer=require("./customermodel")

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required:true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
     
    }
  ],
  totalAmount: {
    type: Number,
    
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Debit Card", "UPI", "PayPal", "Cash on Delivery"],
    required: true
  },
  paymentStatus:{
    type:String,
    enum:["pending","completed","cancelled","paid","failed"]

  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  }
}, { timestamps: true });


// pre-save hook


orderSchema.pre("save",async function (next){
    try{
        let total=0;

        for(let items of this.items){
            let product=await Product.findById(items.product)

            if(!product) throw new Error(`Product is not found ${items.product}`)
            total+=product.saleprice*items.quantity
        }

        this.totalAmount = total; // set total before saving
        next();
    }catch(err){
        next(err)

    }

})




const  Order = mongoose.model("Order", orderSchema);
 module.exports=Order

