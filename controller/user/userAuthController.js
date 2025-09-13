// const User=require("../../Model/user")
const Customer=require("../../Model/customermodel")
const {generatedOtp,generateToken}=require("../../middlewares/authmiddleware")
const {handleFileUpload} = require("../../middlewares/authmiddleware")
const bcrypt=require("bcryptjs")



module.exports={
    register:async (req,res)=>{
        try{
            const {name,email,phone,password} = req.body
            const picture = req.files.profilePicture || null 
              
            if(!name || !email || !phone ){
              return req.status(401).json({message:"missing required fileds"})
            }
            
            
            console.log(name,email,phone,password,"oo")
            if(!name || !email || !phone){
              return res.json({message:"requires fields are missing!"})
            }
            const userExists=await Customer.findOne({email})
            
            if(userExists){
              return res.status(201).json({message:"user alredy exist please login!"})
            }
            const hashpassword= await bcrypt.hash(password,10)
            const pass=hashpassword
            //  const generatedOtp=await generatedOtp()
            let  profilepic ;
            if(picture){
              profilepic = await handleFileUpload(picture,"customer")
        
            }

     const newuser=await Customer.create({name:name,phone:phone,email:email,password:pass,profilePicture: profilepic})
      
     if(!newuser){
        return res.status(400).json({message:"Error while regestration"})
     }else{
        return res.status(200).json({message:"Signin successfull please Login",password:pass})
     }
        }catch(err){
            console.log({Erro:err.message})
            return res.status(500).json({message:"Internal Server Errro"})

        }
    },
    login:async (req,res)=>{

        try{
            const { email,password }=req.body

            if(!email ||!password){
                res.status(400).json({message:"required fields are misssing!"})
            }
            const userExists=await Customer.findOne({email})

      if(!userExists){
        return res.status(201).json({message:"user not found please signup"})
      }
      if(userExists.status==="Inactive"){
        return res.status(400).json({message:"user is Inactive"})
      }
      let pass = await bcrypt.compare(password,userExists.password)

      req.session.isAuth=true;
      req.session.user=userExists;
      req.session.isrole="user"
      if(!pass){
        return res.status(400).json({message:"Invalid Credentials"})
      }

      return res.status(200).json({messge:'Login Sucessfull',token:generateToken(userExists._id)})


        }catch(err){
            console.log({message:err.message})

            return res.status(500).json({message:"Internal Server Error"})

        }

    }
    ,

    updateProfile:async (req,res)=>{
      try{
    const userId = req.session?.user._id
       const {name,email,phone} = req.body
const img=req.files.profilePicture || null
let upload = await handleFileUpload(img,"customers")      
  const userExists = await  Customer.findById(userId)
      if (name) userExists.name = name
      if(phone) userExists.phone = phone
      if(email) userExists.email = email
      if(img)  userExists.profilePicture = upload

      await userExists.save()
          return res.status(200).json({message:"Profile Updated"})    
    
      }catch(err){
          console.log(err.message)
          return res.status(500).json({message:"Internal server Error"})
      }
  },
  deleteAccount: async (req, res)=>{
    try{
        const userId = req.session.user._id
        await Customer.findByIdAndDelete(userId)
        return res.status(200).json({message:"your account delete permantly"})
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message:"Internal Server Error"})
    }

}

}