import userModel from "../Models/userModel.js"

//addtocart
const addToCart=async (req,res)=>{
try{
    let userData=await userModel.findById(req.body.userId);
    let cartData=await userData.cartData;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId]=1;
    }
    else{
        cartData[req.body.itemId]+=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Added To Cart"});

}catch(error){
    console.log(error);
    res.json({success:false,message:error});
 }
}
const removeFromCart=async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({succes:true,message:"Removed From Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }

}

const getCart=async(req,res)=>{
    console.log("get cart at backend run")
    try {
        let userData=await userModel.findById(req.body.userId);
        
        let cartData=await userData.cartData;
        
        res.json({success:true,cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }

}
export{addToCart,removeFromCart,getCart}