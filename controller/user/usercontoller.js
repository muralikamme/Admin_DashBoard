const {status}=require("init")
const Product=require("../../Model/productmodel")
const {handleFileUpload} = require("../../middlewares/authmiddleware")

const Customer=require("../../Model/customermodel.js")

module.exports={

    profile: async( req,res)=>{

        try{

            const user=req.session.user
            console.log(user)
        
            return res.status(200).json({message:user})

        }catch(err){
            console.log(err)
            return res.status(500).json({message:"Internal Server Error"})
        }

    },

   

   

}

