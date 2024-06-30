import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from  "validator";

//login user

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({succes:false,message:"please register yourself"})
        }
        
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.json({succes:false,message:"password is incorrect"})
            }
            const token=createToken(user._id);
            return res.json({success:true,token});
        
    }catch(error){
        console.log(error);
        res.json({success:false,message:"error"});
    }

}
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//register user

const registerUser=async(req,res)=>{
    const {name,password,email}=req.body;
    try{
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exists"});
        }
        //validating email format and strong password;
        if(!validator.isEmail(email)){
            return res.json({succes:false,message:"please enter valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"please eneter a strong password"})
        }
        //using bcrypt to hash userpassword
        const salt=await bcrypt.genSalt(7)
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new userModel({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,

        });
        const User=await newUser.save();
        const token=createToken(User._id);
        res.json({success:true,token});

    }catch(error){
        console.log(error);
        res.json({success:false,message:"something went wrong"})
    }
}
export {loginUser,registerUser}