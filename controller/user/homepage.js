const category = require("../../Model/categorymodel")
const Product = require("../../Model/productmodel")
const banners = require("../../Model/BannerModel")
const User=require("../../Model/user")
const Customer=require("../../Model/customermodel")
const mongoose = require("mongoose")
const favouriteContoller=require("./favouriteContoller")
module.exports={

    homePage: async (req,res)=>{

        try{
            const allCategory = await category.find({status:"Active"})
            const allBanners = await banners.find({status:"active"})
            
          console.log(allBanners,allCategory )
            return res.status(200).json({Category:allCategory,Banner:allBanners })
            
        }catch(err){
            console.log(err.message)
            return res.status(500).json({message:"Internal Server Error"})
        }
    },

    allProducts: async (req, res) => {
        try {
            const userId = req.session.user._id;
            if (!userId) {
                return res.status(400).json({ message: "User is not found" });
            }
    
            const products = await Product.find({}).lean();
            console.log(products,"iii")
            const user = await Customer.findById(userId).populate("favouriteProducts");
    
            // Get array of favourite product IDs as strings for easier comparison
            const favouriteIds = user.favouriteProducts.map(fav => fav._id.toString());
    
            // Add 'isFavourite' property to each product
            const allProducts = products.map(product => {
                product.isFavourite = favouriteIds.includes(product._id.toString());
                return product;
            });
    
            return res.status(200).json({ message: "success", products: allProducts });
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    

}