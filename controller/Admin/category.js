const category=require("../../Model/categorymodel")
const {handleFileUpload} = require("../../middlewares/authmiddleware")

module.exports={
    allCategorys: async (req,res)=>{
        try{

            const allcategory=await category.find({})
            // console.log(allcategory)
            return res.render("allcategory",{
                allcategory

            })
        }catch(err){
            res.status(500).json({message:"Internal Server Error"})

        }
    },

    addCategory: async (req,res)=>{
    try{
       const {name,type,categoryPicture} =  req.body

     let image = req.files.categoryPicture || null
     console.log(image,"yy")


  const   uploadimg =  await handleFileUpload(image,"categoryPicture")

       await category.create({
        name:name,
        type:type,
        picture:uploadimg 
       })
       return res.redirect("/admin/allcategorys")

    }catch(err){
        return res.status(500).json({message:err.message}) 

    }


},

 editCategory:async (req,res)=>{
        try{
            const id = req.params.id

            console.log(id,"muraliiiiii");
            const singlecategory =  await category.findById(id)
            console.log(singlecategory,"rrrr")
            return res.redirect("/admin/allcategorys")
        }catch(err){
            res.status(500).json({message:err.message})
        }
    },

    deleteCategory: async (req,res)=>{
        try{
            const id=req.params.id
            await category.findByIdAndDelete(id)
            req.flash("success_msg","category deleted successfully")
            return res.redirect("/admin/allcategorys")
           
   }catch(err){
    console.log(err.message)
    req.flash("error_msg","Internal serevr Error")
    return res.redirect("/admin/allcategorys")
        }
    }
}

