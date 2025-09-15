const express=require("express")
const dotenv=require("dotenv").config()
const connection=require("./utils/connect")
const hbs=require("hbs")
const path=require("path")
const fileUpload = require("express-fileupload")
const registerHelper=require("./helper/helper")

const AdminauthRoutes=require("./Routes/Admin/auth")
const adminRoutes=require("./Routes/Admin/adminroutes")
// User
const UserAuthRoutes=require("./Routes/userRoutes/userAuth")
const userconRoutes=require("./Routes/userRoutes/usercontollerRoutes")
const expressSession = require("express-session");
const MongoDBStore=require("connect-mongodb-session")(expressSession)
// (expressSession)
const flash = require("connect-flash");
const { isAdminAuth ,isValidToken} = require("./middlewares/authmiddleware");


const app=express()
connection()
registerHelper()
app.use(express.json());

app.use(flash());
app.use(express.urlencoded({ extended: false }));
let store=new MongoDBStore({
    uri:process.env.MONGODB_URI,
    collection:"mysession"
})
app.use(expressSession({
    secret: "thisIsSecretKeyForDHAMMA#1",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2
    },
    resave: false,
    saveUninitialized: false,
    store: store
}));    
app.use(fileUpload())

app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));

// Routers

// adminroutes

//template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine("html", hbs.__express);
hbs.registerPartials(path.join(__dirname,"views","partials"))

// Register "inc" helper
hbs.registerHelper("inc", function (value) {
    return parseInt(value) + 1;
  });



// make a flash message for all view

app.use((req,res,next)=>{
    res.locals.success_msg=req.flash("success_msg")
    res.locals.error_msg=req.flash("error_msg")
    next();
})

app.get('/', function (req, res) {
    return res.redirect('/auth/login');
});

// adminauth
app.use("/auth",AdminauthRoutes)
// adminroutes
// isAdminAuth
app.use("/admin",isAdminAuth,adminRoutes)

// userAuth
app.use("/userAuth",UserAuthRoutes)
// userRoutes

app.use("/user", isValidToken,userconRoutes)




app.listen(process.env.PORT,()=>{
    console.log(`localhost:${process.env.PORT}`)
})


