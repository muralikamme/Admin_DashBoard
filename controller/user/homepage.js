const category = require("../../Model/categorymodel")
const products = require("../../Model/productmodel")
const banners = require("../../Model/BannerModel")



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
    }

}