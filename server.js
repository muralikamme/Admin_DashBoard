const express=require("express")
const dotenv=require("dotenv").config()
const connection=require("./utils/connect")
const hbs=require("hbs")
const path=require("path")
const fileUpload = require("express-fileupload")
const registerHelper=require("./helper/helper")

const expressSession = require("express-session");
const flash = require("connect-flash");

const { isAdminAuth } = require("./middlewares/authmiddleware");



const app=express()
connection()
registerHelper()

app.use(express.json());

app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({
    secret: "thisIsSecretKeyForDHAMMA#1",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2
    },
    resave: false,
    saveUninitialized: false,
    
}));
app.use(fileUpload())


app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));



// Routers

// adminroutes
const AdminauthRoutes=require("./Routes/Admin/auth")

const adminRoutes=require("./Routes/Admin/adminroutes")



//template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine("html", hbs.__express);

hbs.registerPartials(path.join(__dirname,"views","partials"))

// Register "inc" helper
hbs.registerHelper("inc", function (value) {
    return parseInt(value) + 1;
  });
// listenr

app.get('/', function (req, res) {
    return res.redirect('/auth/login');
});





// adminauth
app.use("/auth",AdminauthRoutes)
// adminroutes
app.use("/admin",adminRoutes)

app.use(
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
  );


app.listen(process.env.PORT,()=>{
    console.log(`localhost:${process.env.PORT}`)
})


