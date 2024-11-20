const vender=require('../models/Vender');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config();

const key=process.env.SECRETEKEY


const verifytoken=async(req,res,next)=>{
const token =req.headers.token;
if(!token){
    return res.status(400).json({error:"token required"})
}
try{
const decoded=jwt.verify(token,key)
const venderid=await vender.findById(decoded.venderid);
if(!venderid){

    return res.status(400).json({error:"vendor not found"})
}
req.venderId=venderid._id
next()
}
catch(error){
console.error(error)
 return res.status(404).json({error:`invalid token`})
}
}
module.exports=verifytoken