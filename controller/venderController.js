const vender=require('../models/Vender');
const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
const dotenv=require('dotenv');
dotenv.config();

const key=process.env.SECRETEKEY;




const venderRegister=async(req,res)=>{
    const { username,email,password }=req.body;
    
    try{
        const venderemail=await vender.findOne({email});
        if(venderemail){
            return res.status(400).json('email already exist');
        }
        const hashedpassword=await bcrypt.hash(password,10);
        const newvender=new vender({
            username,
            email,
            password:hashedpassword
        })
        await newvender.save()
        res.status(201).json({msg:'vendor saved '})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"internal server error"});
    }
}
const venderlogin =async(req,res)=>{
    const { email,password}=req.body;
    console.log(email,password)
    try{
        const vendermail=await vender.findOne({email});
        if(!vendermail || !(await bcrypt.compare(password,vendermail.password))){
            return res.status(401).json({error:"invalid password or username"})
        }
        
        const token=jwt.sign({venderid: vendermail._id},key)
        const vendorname=vendermail.username;
        if(vendermail.firm[0]){
         const venderfirmid=vendermail.firm[0].toString();
         res.status(200).json({success:"login successful",token,venderfirmid,vendorname})
        }
        else{
            const venderfirmid="No firm added"
            const newuser=true
            res.status(200).json({success:"login successful",token,venderfirmid,vendorname})

        }
        
    }
    catch(error){
            console.log(error); 
            res.status(500).json('internal error')
    }
}
const getAllVenders=async(req,res)=>{
   try{ 
    const vendors=await vender.find().populate('firm');
    res.json({vendors});
}catch(error){
console.error(error);
}
}
const getVenderById=async (req,res)=>{
const venderid=req.params.id;
try{const Vender=await vender.findById(venderid).populate('firm');
if(!Vender){
    res.status(404).json({msg:"vender not found"});
}
res.status(200).json(Vender);}
catch(error){
    console.error(error);
    
}

}
module.exports={venderRegister,venderlogin,getAllVenders,getVenderById}