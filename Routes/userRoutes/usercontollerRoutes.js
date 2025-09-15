const userconRoutes = require("express").Router()
const userController = require("../../controller/user/usercontoller")
const homepageController = require("../../controller/user/homepage")

const  favouiteproduct = require("../../controller/user/favouriteContoller")



userconRoutes.get("/userproile",userController.profile)
userconRoutes.get("/homepage",homepageController.homePage)



userconRoutes.post("/favouirte",favouiteproduct.AddToFavourite)
userconRoutes.get("/allfavouirteproducts",favouiteproduct.allFavouiteProducts)
userconRoutes.post("/removeproductfromfav",favouiteproduct.removeProductFromFav)

module.exports=userconRoutes