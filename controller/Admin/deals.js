const Deals = require("../../Model/dealsModel");

const Product = require("../../Model/dealsModel");

module.exports = {
  allDeals: async (req, res) => {
    try {
      const allProducts = await Product.find({});

      return res.render("deals", {
        allProducts,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
