const userconRoutes=require("express").Router()
const userController=require("../../controller/user/usercontoller")



userconRoutes.get("/userproile",userController.profile)

module.exports=userconRoutes