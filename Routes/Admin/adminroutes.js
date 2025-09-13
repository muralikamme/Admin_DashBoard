const adminRoutes=require("express").Router()

 const adminController=require("../../controller/Admin/adminController")
const category=require("../../controller/Admin/category")

 adminRoutes.get("/dashboard",adminController.dashboard)
 adminRoutes.get("/adminProfile",adminController.adminProfile)
 adminRoutes.post("/updateprofile/:id",adminController.updateProfile)
//  adminRoutes.post("/deleteadmin/:id",adminController.Deleteadmin)
//------------- Products Routes-------------------



//_-------------- category----------
adminRoutes.get("/allcategorys",category.allCategorys)
adminRoutes.post("/addcategory",category.addCategory)
adminRoutes.post("/editcategory/:id",category.editCategory)
// adminRoutes.post("/updatecategory:id",category.updateCategory)
adminRoutes.post("/deletecategory/:id", category.deleteCategory)




// -----------category---------
 adminRoutes.get("/addproducts",adminController.addproduct)
 adminRoutes.post("/addproductpost",adminController.addproductpost)
//  adminRoutes.post("/added",adminController.addingPro)

 adminRoutes.get("/products",adminController.Products)
 adminRoutes.get("/viewproduct/:id",adminController.ViewProduct)
 adminRoutes.get("/getupdateproduct/:id",adminController.Getupdateproduct)
 
 adminRoutes.post("/postupdateproduct/:id",adminController.PostUpdateProduct)
 adminRoutes.post("/deleteproduct/:id",adminController.DeleteProduct)

//  Category 
// adminRoutes.post("/postcategory",adminController.postCategory)
 
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
 adminRoutes.get("/viewcustomer/:id",adminController.viewCustomer)

 adminRoutes.get("/orders",adminController.Orders)
// //  adminRoutes.post("/ordersspost",adminController.OrderPost)
//  adminRoutes.get("/singleorder/:id",adminController.Singleorder)
 adminRoutes.get("/orderdetails",adminController.OrdersDetails)
 adminRoutes.get("/refund",adminController.Refunds)




 module.exports=adminRoutes
