const banners = require("../../Model/BannerModel")


module.exports={
    allBanners: async (req,res)=>{
        try{

            // const allbanners = await banners.find({})
            return res.render("banner")
        }catch(err){
            console.log(err)
            return res.status(500).json({message:err.message})

        }
    },
    addBanner:async (req,res)=>{
        try{
            

        }catch(err){

        }

    },

    editBanner:async (req,res)=>{
        try{

        }catch(err){

        }

    },
    deleteBanner : async (req,res)=>{
        try{

        }catch(err){

        }
    }

}