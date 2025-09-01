const User=require("../../Model/user")

 isValidPassword = (password) => {
    return (
        password.length >= 5 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)
    );
};
module.exports={
    index: async (req, res) => {
        try {
        
            return res.render("index", {
                success: req.flash("success"),
                error: req.flash("error")
            })
        } catch (error) {
            req.flash("error", "Internal server error");
            return res.redirect("/auth/login");
        }
    },
    login: async (req, res) => {
        try {
       


          const { email, password } = req.body;
      
          const user = await User.findOne({ email });
          if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/auth/login");
          }
      
          const matchedPassword = await user.matchPassword(password);

          console.log(matchedPassword,"match")
          if (!matchedPassword) {
            req.flash("error", "Password is wrong");
            return res.redirect("/auth/login");
          }
      
        
          if (user.role !== "admin") {
            req.flash("error", "You don’t have admin access");
            return res.redirect("/auth/login");
          }
      
          req.session.isAuth = true;
          req.session.admin = user;
      
          req.session.save(err => {
            if (err) return next(err);
            
            return res.redirect("/admin/dashboard");
          });
      
        } catch (error) {
          console.log(error);
          req.flash("error", "Internal server error");
          return res.redirect("/auth/login");
        }
      }
      
}
