const banners = require("../../Model/BannerModel");
const {
  handleFileUpload,
  deleteFile,
} = require("../../middlewares/authmiddleware");

module.exports = {
  allBanners: async (req, res) => {
    try {
      const allbanners = await banners.find({});
      // console.log(allbanners,"pp")
      return res.render("banner", {
        allbanners,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  addBanner: async (req, res) => {
    try {
      const bannerpic = req.files.bannerPicture || null;
      const addpic = await handleFileUpload(bannerpic, "banner");
      await banners.create({
        bannerPicture: addpic,
      });
      req.flash("success_msg", "Banner upload successfully");
      return res.redirect("/admin/banners");
    } catch (err) {
      console.log(err.message);
      req.flash("error_msg", "Internal Server Error");
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updateBanner: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(500).json({ message: "empty id" });
      }
      const { status } = req.body;
      if (!status) {
        res.status(500).json({ message: "Empty body " });
      }
      const newBanner = req.files.bannerPicture || null ;
      const bannerupload = await handleFileUpload(newBanner, "banner");
      // console.log(newBanner,"nneewnne",status)
      const update = await banners.findByIdAndUpdate(id, {
        $set: {
          bannerPicture: bannerupload,
          status: status,
        },
      });
      await update.save();
      req.flash("success_msg", "Banner Updated Successfully");
      return res.redirect("/admin/banners");
    } catch (err) {
      console.log(err);
      req.flash("error_msg", "Update Error");
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  deleteBanner: async (req, res) => {
    try {
      const bannerId = req.params.id;
      console.log(bannerId, "idid");
      if (!bannerId) {
        req.flash("error_msg", "empty id");
        res.status(500).json({ message: "empty id" });
      }
       await banners.findByIdAndDelete(bannerId);
      req.flash("success_msg", "banner deleted successfully");
      res.redirect("/admin/banners");
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal serevr Error" });
    }
  },
};
