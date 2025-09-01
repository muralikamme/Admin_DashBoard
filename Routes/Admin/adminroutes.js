const adminRoutes=require("express").Router()

 const adminController=require("../../controller/Admin/adminController")

 adminRoutes.get("/dashboard",adminController.dashboard)
//------------- Products Routes-------------------

 adminRoutes.get("/addproducts",adminController.addproduct)
 adminRoutes.post("/addproductpost",adminController.addproductpost)

 adminRoutes.get("/products",adminController.Products)
 adminRoutes.get("/viewproduct/:id",adminController.ViewProduct)
 adminRoutes.get("/getupdateproduct/:id",adminController.Getupdateproduct)
 
 adminRoutes.post("/postupdateproduct/:id",adminController.PostUpdateProduct)
 adminRoutes.post("/deleteproduct/:id",adminController.DeleteProduct)
//  -----PRODUCT IMAGES
 adminRoutes.get("/seeallimages/:id",adminController.Seeallimgaes)
 adminRoutes.post("/replaceimg/:id/:index",adminController.Replaceimg)
 adminRoutes.post("/deleteimg/:id/:index",adminController.Deleteimg)
// --------Product images-------

//  --------- - ---Product Routes----------------
//  adminRoutes.post("/postingproducts",adminController.postingproducts)
 
 adminRoutes.get("/customers",adminController.Customers)
adminRoutes.post("/postaddress",adminController.postaddress)

 adminRoutes.get("/addcustomer",adminController.Addcustomer)
 adminRoutes.post("/addcustomerpost",adminController.AddcustomerPost)
 adminRoutes.get("/editcustomerget/:id",adminController.Editcustomerget)
 adminRoutes.post("/editcustomerpost/:id",adminController.EditcustomerPost)
 adminRoutes.post("/deletecustomer/:id",adminController.Dletecustomer)
 adminRoutes.post("/customerposting",adminController.CustomerPosting)
 adminRoutes.get("/customerdetails",adminController.Customerdetails)
 adminRoutes.get("/orders",adminController.Orders)
//  adminRoutes.post("/ordersspost",adminController.OrderPost)
 adminRoutes.get("/singleorder/:id",adminController.Singleorder)
 adminRoutes.get("/orderdetails",adminController.OrdersDetails)
 adminRoutes.get("/refund",adminController.Refunds)




 module.exports=adminRoutes
