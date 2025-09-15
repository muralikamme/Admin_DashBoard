const UserAuthRoutes=require("express").Router()
const userAuthController=require("../../controller/user/userAuthController")

UserAuthRoutes.post("/signup",userAuthController.register)
UserAuthRoutes.post("/login",userAuthController.login)
UserAuthRoutes.post("/updateProfile",userAuthController.updateProfile)
UserAuthRoutes.delete("/deleteAccount",userAuthController.deleteAccount)

module.exports=UserAuthRoutes