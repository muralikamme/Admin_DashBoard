const Customer = require("../../Model/customermodel");
const Product = require("../../Model/productmodel");
const mongoose = require("mongoose");

module.exports = {
  AddToFavourite: async (req, res) => {
    try {
      const userId = req.session.user._id;
      const { productId } = req.body;
      const productExists = await Product.findOne({ _id: productId });
      if (!productExists) {
        return res.status(400).json({ message: "Invalid ProductId" });
      }
      const user = await Customer.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }
      if (!productId) {
        return res.status(400).json({ message: "ProductId is Empty" });
      }
      // Convert productId to ObjectId for comparison
      const productObjectId = new mongoose.Types.ObjectId(productId);
      const alreadyFavourite = user.favouriteProducts.some((pId) =>
        pId.equals(productObjectId)
      );
      if (alreadyFavourite) {
        return res
          .status(400)
          .json({ message: "Product is already in favourites" });
      }
      // Add to favourites and save the user
      user.favouriteProducts.push(productObjectId);
      await user.save();
      return res
        .status(200)
        .json({ message: "Product added to favourite list" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  allFavouiteProducts: async (req, res) => {
    try {
      const userId = req.session.user._id;
      if (!userId) {
        return res.status(400).json({ message: "user not found" });
      }
      const user = await Customer.findById(userId).populate(
        "favouriteProducts"
      );
      return res.status(200).json({
        success: true,
        favProducts: user.favouriteProducts,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Internal server Error" });
    }
  },
  removeProductFromFav: async (req, res) => {
    try {
      const userId = req.session.user._id;
      if (!userId) {
        return res.status(400).json({ message: "user not found" });
      }
      const { productId } = req.body;
      if (!productId) {
        return res.status(400).json({ message: "ProductId is Empty" });
      }
      const ProductExistsId = new mongoose.Types.ObjectId(productId);
      const productCheckinProduct = await Product.findById(ProductExistsId);
      if (!productCheckinProduct) {
        return res.status(400).json({ message: "Product is not found" });
      }
     const user = await Customer.findById(userId).populate(
        "favouriteProducts"
      );
      // Filter out the productId properly using .equals()
      user.favouriteProducts = user.favouriteProducts.filter(
        (pId) => !pId.equals(productCheckinProduct)
      );
      await user.save();
      return res
        .status(200)
        .json({ message: "Product Removed from favourite list" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Internal server Error" });
    }
  },
};
