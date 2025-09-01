const AdminauthRoutes=require("express").Router()


const adminAuthController=require("../../controller/Admin/adminauthControllers.js")



AdminauthRoutes.get("/login",adminAuthController.index)

AdminauthRoutes.post("/loginpost",adminAuthController.login)



module.exports=AdminauthRoutes

