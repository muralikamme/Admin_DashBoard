const mongoose=require("mongoose")
const dotenv=require("dotenv").config()

async function connection(){
    try{

      return  mongoose.connect(process.env.MONGODB_URI).then(()=>{
            console.log("DataBase Connected")
        }).catch(()=>{
            console.log("DataBase is Not Connected")
        })

    }catch(err){
        console.log({error:err})

    }

}

module.exports=connection

