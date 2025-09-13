const {
  handleFileUpload,
  updateFileUpload,
  deleteFile,
} = require("../../middlewares/authmiddleware");
const Product = require("../../Model/productmodel");
const Order = require("../../Model/Orderschema");
let Customer = require("../../Model/customermodel");
let address = require("../../Model/addressModel");
let category=require("../../Model/categorymodel")
const User=require("../../Model/user")
const path = require("path");
const bcrypt=require("bcryptjs")

module.exports = {
  dashboard: async (req, res) => {
    try {
      const allorders = await Order.find({}).countDocuments();
      const allProducts = await Product.find({}).countDocuments();
      const allcustomers = await Customer.find({}).countDocuments();
      const orderstatus = await Order.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

      let status = {};
      orderstatus.map((value) => {
        return (status[value._id] = value.count);
      });

      let orders = await Order.find({});

      const totalRevenu = orders.reduce((acc, val) => {
        return (acc += val.totalAmount);
      }, 0);
      return res.render("dashboard", {
        allorders,
        allProducts,
        allcustomers,
        status,
        totalRevenu,
      });
    } catch (err) {
      res.flash("error", "internal server error");
      return res.status(500).json({ Error: err.message });
    }
  },
  adminProfile: async (req, res) => {
    try {

      const adminprofile = req.session.admin
      return res.render(
        "adminProfile",{
          adminprofile 
 
        }
        
      );
    } catch (err) {
      console.log(err);
    }
  },

updateProfile: async (req, res) => {
    try {
        let { id } = req.params;
        console.log(id, "User ID");

        const { email, phone, name, newPassword } = req.body;
        const profile = req.files?.newprofilepic || null; // Optional chaining in case no file sent
        console.log(profile, "Uploaded File");

        let newpic = null;
        if (profile) {
            const userpic = await handleFileUpload(profile, "admin");
            newpic = userpic;
        }

        let newpass = null;
        if (newPassword) {
            newpass = await bcrypt.hash(newPassword, 10);
        }

        const adminExists = await User.findById(id);
     
        if (!adminExists) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Update fields if provided
        if (name) adminExists.name = name;
        if (email) adminExists.email = email;
        if (phone) adminExists.phone = phone;
        if (newpass) adminExists.password = newpass;
        if (newpic) adminExists.profilePicture = newpic;

        await adminExists.save();

        req.flash("success_msg", "Admin Profile Updated");
       return res.redirect("/admin/adminProfile")

    } catch (err) {
        console.error(err);
        req.flash("error_msg", "Update Error");
        return res.redirect("/admin/adminProfile")
        
    }
},
  addproduct: async (req, res) => {
    try {
      return res.render(
        "addproducts"
        // success: req.flash("success"),
      );
    } catch (err) {
      console.log(err);
    }
  },
  addproductpost: async (req, res) => {
    try {
      const {
        title,
        description,
        regularprice,
        saleprice,
        stockstatus,
        expiredateofproduct,
        category,
        vendor,
        collection,
        tags,
      } = req.body;

      let pictures = req.files ? req.files.images : null;

      const picturesArray = Array.isArray(pictures) ? pictures : [pictures];

      if (!picturesArray || picturesArray.length === 0) {
        req.flash("error", "Upload at least 1 picture");
        return res.redirect("/admin/addproduct");
      }

      if (picturesArray.length > 6) {
        req.flash("error", "Upload maximum 6 pictures");
        return res.redirect("/admin/addproduct");
      }

      let picturePaths = [];
      for (const pic of picturesArray) {
        if (!pic) continue; // skip undefined files
        const savedPath = await handleFileUpload(pic, "products");
        if (savedPath) picturePaths.push(savedPath);
      }

       await Product.create({
        title,
        description,
        images: picturePaths,
        regularprice,
        saleprice,
        stockstatus,
        expiredateofproduct,
        category,
        vendor,
        collection,
        tags,
      });

      res.redirect("/admin/products");
    } catch (err) {
      console.log(err);
      res.redirect("/admin/addproducts");
    }
  },
  Products: async (req, res) => {
    try {
      let products = await Product.find().populate('category');
      // console.log(products,"mydashdh")
      return res.render("products", {
        products,
      });
    } catch (err) {
      console.log(err);
    }
  },

  
  ViewProduct: async (req, res) => {
    try {
      let id = req.params.id;
      let viewproduct = await Product.findById(id);

      return res.render("viewproduct", {
        viewproduct,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  Getupdateproduct: async (req, res) => {
    try {
      const id = req.params.id;

      let update = await Product.findById(id);
      // console.log(update,"upateuuuuuu")

      return res.render("updateproduct", {
        update,
      });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  },

  DeleteProduct: async (req, res) => {
    try {
      let { id } = req.params;
      const deleteproduct = await Product.findByIdAndDelete(id);
      if (deleteproduct) {
        console.log("Deleted user:", deleteproduct);
      } else {
        console.log("No user found with that ID");
      }

      return res.redirect("/admin/products");
    } catch (err) {
      return res.status(500).json({ Error: err.message });
    }
  },

  PostUpdateProduct: async (req, res) => {
    try {
      let id = req.params.id;
      let {
        title,
        description,
        regularprice,
        saleprice,
        stockstatus,
        expiredateofproduct,
        category,
        vendor,
        collection,
        tags,
      } = req.body;
      console.log(req.body, "upadteed");
      let pictures = req.files ? req.files.images : null;
      console.log(pictures, "imagess");

      const picturesArray = Array.isArray(pictures) ? pictures : [pictures];

      if (!picturesArray || picturesArray.length === 0) {
        req.flash("error", "Upload at least 1 picture");
        return res.redirect("/admin/getupdateproduct");
      }

      if (picturesArray.length > 6) {
        req.flash("error", "Upload maximum 6 pictures");
        return res.redirect("/admin/getupdateproduct");
      }
      let picturePaths = [];
      if (pictures) {
        const picturesArray = Array.isArray(pictures) ? pictures : [pictures];
        console.log(picturesArray, "aaaaaaaa");
        if (!picturesArray.length || picturesArray.length > 6) {
          req.flash("error", "Upload between 1 to 6 pictures");
          return res.redirect("/admin/getupdateproduct");
        }

        for (const pic of picturesArray) {
          // console.log(pic, "pppp");
          const savedPath = await handleFileUpload(pic, "products");
          if (savedPath) picturePaths.push(savedPath);
        }
        // console.log(picturePaths,"fgnbgfbf")
        let productexist = await Product.findById(id).populate('category');
        // let category = await category.findById()
        const p = productexist.images;

        for (const imgs of picturePaths) {
          p.push(imgs);
        }
        productexist.images = p;
        // console.log(p, "wfghmnbfgn");

        if (title) productexist.title = title;
        if (description) productexist.description = description;
        if (regularprice) productexist.regularprice = regularprice;
        if (saleprice) productexist.saleprice = saleprice;
        if (stockstatus) productexist.stockstatus = stockstatus;
        if (expiredateofproduct)
          productexist.expiredateofproduct = expiredateofproduct;
        if (category) productexist.category.name = category;
        if (description) productexist.description = description;
        if (vendor) productexist.vendor = vendor;
        if (collection) productexist.collection = collection;
        //  if(images)productexist.images=p
        if (tags) productexist.tags = tags;

        await productexist.save();
        return res.redirect(`/admin/getupdateproduct/${id}`);
      }
    } catch (err) {
      return res.status(500).json({ Error: err.message });
    }
  },

  Seeallimgaes: async (req, res) => {
    try {
      let productId = req.params.id;

      let { _id, images } = await Product.findById(productId);
      // console.log(_id, "isssss");
      return res.render("seeallimages", {
        images,
        _id,
      });
    } catch (err) {
      return res.sataus(500).json({ Error: err.message });
    }
  },

  Replaceimg: async (req, res) => {
    try {
      let { newimages } = req.files;
      

        let replacenewimg = await updateFileUpload(newimages, "products");
    

      const { id, index } = req.params;

      await Product.findByIdAndUpdate(id, {
        $set: { [`images.${index}`]: replacenewimg },
      });

      req.flash("success_msg", "Successfully Image Replaced");
      return res.redirect(`/admin/seeallimages/${id}`);
    } catch (err) {
      return res.status(500).json({ Error: err.message });
    }
  },
  Deleteimg: async (req, res) => {
    try {
      let { id, index } = req.params;

      let deleteimg = await Product.findById(id);

      deleteimg.images.splice(index, 1);

      await deleteimg.save();
      req.flash("success_msg", "Successfully Image Deleted");

      return res.redirect(`/admin/seeallimages/${id}`);
    } catch (err) {
      req.flash("error_msg", "Something went wrong");
      return res.status(500).json({ Error: err.message });
    }
  },

  Orders: async (req, res) => {
    try {
      let allorders = await Order.find({});

      return res.render("orders", {
        allorders,
      });
    } catch (err) {
      res.redirect("/admin/Orders");
      console.log(err);
    }
  },

  Singleorder: async (req, res) => {
    try {
      let id = req.params.id;
      // console.log(req.params.id, "kkk");
      // res.send(req.params.id);
      let singleorder = await Order.findById(id);
      const orderdetails = await Order.findById(id).populate("items.product");
      console.log(orderdetails, "orderer");
      // let productdetails = orderdetails.flatMap(order =>
      //   order.items.map(item => item.product) // directly return product object
      // );

      return res.render("singleorder", {
        singleorder,
      });
    } catch (err) {
      console.log(err);
      res.redirect("/admin/orders");
    }
  },

  OrdersDetails: async (req, res) => {
    try {
      const orderdetails = await Order.find({}).populate("items.product"); // populate products
      const userdata = await Order.find();

      // console.log(orderdetails[0].items[0].product, "ppp")
      let productdetails = orderdetails.flatMap(
        (order) => order.items.map((item) => item.product) // directly return product object
      );
      console.log(productdetails, "eee");
      // console.log(userdata, "ttttt");

      return res.render("orderdetails", {
        productdetails,
        userdata,
      });
    } catch (err) {
      // console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  Customers: async (req, res) => {
    try {
      const customdetails = await Customer.find({});
      // console.log(customdetails,"ppp")
      return res.render("customers", {
        customdetails,
        success: req.flash("success"),
      });
    } catch (err) {
      console.log(err);
    }
  },
  viewCustomer: async (req,res)=>{
    try{
      let id=req.params.id

      let singleuser=await Customer.findById(id)
      console.log(singleuser,"tttttt")
      // res.send("kkk")
   
     return  res.render("viewcustomer",{
      singleuser

     })
     


    }catch(err){

      req.flash("erro_mg","Internal Server Error")
   return  res.redirect("/admi/customer")
    }

  },

  postaddress: async (req, res) => {
    try {
      let addressdata = [];

      let add = await address.create(addressdata);
      res.send("successfuly added");
    } catch (err) {
      res.send(err);
    }
  },

  Editcustomerget: async (req, res) => {
    try {
      let { id } = req.params;
      let customer = id;

      let updatedetails = await Customer.findById(id);
      console.log(updatedetails, "pogg");
      let addresses = await address.findOne({ customer });
      console.log(addresses, "oiuygf");

      return res.render("editcustomer", {
        updatedetails,
        addresses,
      });
    } catch (err) {
      return res.status(500).json({ Error: err.message });
    }
  },

  EditcustomerPost: async (req, res) => {
    try {
      let { id } = req.params;

      let { name, email, phone } = req.body;

      await Customer.findByIdAndUpdate(
        id,
        { $set: { name, email, phone } },
        { new: true }
      );
      return res.redirect("/admin/customers");
    } catch (err) {
      return res.redirect(`/admin/editcustomerget/${id}`);
    }
  },
  Dletecustomer: async (req, res) => {
    try {
      let { id } = req.params;
      const deletuser = await Customer.findByIdAndDelete(id);

      if (deletuser) {
        console.log("deleted");
      } else {
        console.log("error");
      }
      return res.redirect("/admin/customers");
    } catch (err) {
      return res.status(500).json({ Error: err.message });
    }
  },
  Addcustomer: async (req, res) => {
    try {
      return res.render("addcustomer");
    } catch (err) {
      return res.status(500).json({ Error: err.message });
    }
  },
  AddcustomerPost: async (req, res) => {
    try {
      let { name, email, phone, address } = req.body;

      let addcustomer = await Customer.create({ name, email, phone });

      return res.redirect("/admin/customers");
    } catch (err) {
      return res.status(500).json({ Error: err.message });
    }
  },

  CustomerPosting: async (req, res) => {
    try {
      let customers = [];
      await Customer.insertMany(customers);
      res.send({ message: "successfuuly added" });
    } catch (err) {
      return res.status(500).json({ Error: err.message });
    }
  },

  Customerdetails: async (req, res) => {
    try {
      return res.render("customerDetails");
    } catch (err) {
      console.log(err);
    }
  },
  Refunds: async (req, res) => {
    try {
      return res.render("refund");
    } catch (err) {
      console.log(err);
    }
  },
};
