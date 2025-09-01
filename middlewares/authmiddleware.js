const jwt = require("jsonwebtoken");
const path=require("path")
const fs=require("fs")
const TokenModel = require("../Model/tokenmodel");

const User=require("../Model/user")



exports.isValidToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Bearer token required" });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        const decodedId = decoded.id;
        const userExists = await User.findById(decodedId);
        if (!userExists) {
            return res.status(401).json({ message: "User not found" })
        }
        const userTokenDocument = await TokenModel.findOne({ User: userExists._id });
        if (userTokenDocument) {
            const tokenExists = userTokenDocument.tokens.includes(token);
            if (tokenExists) {
                req.session.isAuth = true;
                req.session.user = userExists;
                req.session.token = token;
                next();
            } else {
                return res.status(401).json({ message: "Token has been invalidated" });
            }
        } else {
             return res.status(401).json({ message: "Token not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Token" });
    }
};
//PASSWORD VALIDATIONS
exports.isValidPassword = (password) => {
    return (
        password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)
    );
};
//generate token
exports.generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "364d"
    });
};
//ADMIN LOGIN OR NOT
module.exports.isAdminAuth = (req, res, next) => {
    if (req.session.isAuth && req.session.admin && req.session.admin.role === "admin") {
      return next();
    }
    req.flash("error", "Unauthorized access");
    return res.redirect("/auth/login");
  };



  exports.deleteFile = async (filePath) => {// filePath = winnerExists.winnerPicture == images/winners/1717223132312.png
    if (!filePath) {
        console.log("File path is undefined. Skipping deletion.");
        return true;
    }
    const FilePath = path.join(__dirname, '../public/images/', filePath); //  FilePath = C:\Users\Lahari\Desktop\ANALOGUE\Projects\NodeJs Projects\buyKeys\buyKeysBackend\images\winners\1722353829278.jpg
    // console.log(FilePath); // check the path if necessary
    try {
        await fs.access(FilePath);
        await fs.unlink(FilePath);
        console.log(`File deleted successfully: ${FilePath}`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log(`File not found: ${FilePath}`)
        } else {
            console.error(`Error deleting file: ${err}`);
        }
        return true;
    }
    return true;
};

//   FileUploading


exports.handleFileUpload = async (file, destination) => {
  if (!file || !destination || !file.name) return null;

  // Create folder if it doesn't exist
  const uploadDir = path.join(__dirname, '../public/images/', destination);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const extension = path.extname(file.name);
  const filename = `${Date.now()}${extension}`;
  const filePath = path.join(uploadDir, filename);

  await file.mv(filePath); // Move file
  return `images/${destination}/${filename}`; // return relative path
};


exports.updateFileUpload = async (file, destination, oldFilePath) => {
    if (!file) return null;
    if (oldFilePath) {
      exports.deleteFile(oldFilePath);
    }
    return await exports.handleFileUpload(file, destination);
  };
