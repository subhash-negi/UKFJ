import Razorpay from "razorpay";
import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      cash_on_delivery:false,
    });
   
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
  
  
    const orderData = {
      amount: req.body.amount * 100, 
      currency: "INR",
    };

    const order = await razorpay.orders.create(orderData);
   
    res.json({ success: true,order,orderId:newOrder._id});

   
   
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }

};

const verification=async(req,res)=>{
  const frontend_url = "http://localhost:5173";
  try {
      
  
      const {payment_id,order_id,signature,orderId}=req.body;
     
      const body=order_id + '|' + payment_id;

      const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");
     
      const isAuthentic=expectedSignature===signature;
   
      if(isAuthentic){
        
        await orderModel.findByIdAndUpdate(orderId,{online_payment:true});
        const session_url=`${frontend_url}/paymentTrue?reference=${order_id}`;
        res.json({success:true,session_url});
      }
      else{
        console.log("payment failed");
        const session_url=`${frontend_url}/paymentfailed?reference=${order_id}`;
        res.json({success:false,session_url});
      }
    
  } catch (error) {
    console.log(error);

    res.json({success:false});
  }
  
}

const paymentfailed=async(req,res)=>{
  console.log("payment failed run");
  const orderDetail=req.body;
  console.log(orderDetail.orderId);
  await orderModel.findByIdAndDelete(orderDetail.orderId);
  
  res.json({success:true,message:"payment failed"})

}





//cash on delivery
const cashOnDelivery=async(req,res)=>{
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      cash_on_delivery:true
    });
 
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    res.json({success:true,message:"order placed successfully"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
  }

}
const userOrder=async(req,res)=>{
  try {
    const orders=await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
  }
}
//Listing Orders for admin panel
const ListOrders=async(req,res)=>{
  try {
    const orders=await orderModel.find({});

    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
  }

}
const updateStatus=async(req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
  }
}
export { placeOrder,verification,paymentfailed,cashOnDelivery,userOrder,ListOrders,updateStatus};