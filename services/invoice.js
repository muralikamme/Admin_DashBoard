const crypto=require("crypto")




let generateOrderId=async (model)=>{
    try{
        let orderId;
        let exists=true
        while(exists){
            orderId=crypto.randomBytes(5).toString("hex").toUpperCase();
            exists=model.exists({orderId})

        }
        return orderId

    }catch(err){

    }
}

module.exports=generateOrderId