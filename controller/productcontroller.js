const Product=require('../models/Products');
const multer=require('multer');
const Firm=require('../models/Firm');
const firmcontroller = require('./firmcontroller');
const path=require('path');

const storage=multer.diskStorage({
destination:function(req,file,cb){
    cb(null,'uploads/');
}    ,
filename:function(res,file,cb){
    cb(null,Date.now()+path.extname(file.originalname));
}
});
const upload=multer({storage:storage})
const addproduct=async(req,res)=>{
    try {
        const {productName,Price,category,region,bestseller,description}=req.body;
        const image=req.file?req.file.filename:undefined;
        const firmid=req.params.firmid;
        const firm=await Firm.findById(firmid);
        if(!firm){
            return res.status(404).json({error:'firm not found'});
        }
        const product=new Product({
            productName,
            Price,
            category,
            region,
            image,
            bestseller,
            description,
            firm:firm._id
        })
        const savedProduct=await product.save()
        firm.product.push(savedProduct);
        await firm.save(); 
        res.status(200).json({msg:'product added'})
        
    } catch (error) {
        console.error(error);
        
    }
}


const getproductbyfirm=async (req,res)=>{
    const firmid=req.params.firmid;
   try {
        const firm=await Firm.findById(firmid);
    if(!firm){
        return res.statue(404).json({msg:'firm not found'});

    }
    const firmname=firm.firmName
    const products=await Product.find({firm:firmid});
    res.status(404).json({firmname,products,msg:'products fetched successfully'})
    }
    catch (error){
        res.status(501).json({
            error:"internal server error"
        })
    }
}


const getproductsbyid=async(req,res)=>{
    try {
        const productid=req.params.id;
        const product=await Product.findById(productid);
        if(!product){
            return res.status(404).json({msg:'product not found'});
        }
        res.status(200).json({product})
    } catch (error) {
        
    }
} 



const getallproducts=async (req,res)=>{
    try {
        const product=await Product.find({})
        res.send(product)
    } catch (error) {
        console.log(error);
        res.send({msg:"internal error"})
    }
}

const deleteproductbyid=async (req,res)=>{
    const productid=req.params.id;
    try {
        const product=await Product.findByIdAndDelete(productid);
        if(!product){
            return res.status(404).json({msg:"product not found"});

        }
        res.send(product)
    } 
    catch (error) {
        console.log(error);
        res.send({msg:"internal error"})
    }
}

module.exports={addproduct:[upload.single('image'),addproduct],getproductbyfirm,getproductsbyid,getallproducts,deleteproductbyid};