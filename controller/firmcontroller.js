const Firm=require('../models/Firm');
const Vender=require('../models/Vender');
const multer=require('multer');
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

const addfirm=async(req,res)=>{
    try{
        const {firmname,area,category,region,offer}=req.body;
    const image=req.file?req.file.filename:undefined;
    
    const vender=await Vender.findById(req.venderId);
if(!vender){
    
    res.status(404).json({
        message:'vender not found'
    })
}


    const firm=new Firm({
        firmName:firmname,
        area,
        category,
        region,
        offer,
        image,
        vender:vender._id
    })
const savedfirm=await firm.save()
vender.firm.push(savedfirm);
await vender.save()
return res.status(200).json({msg:'firm saved'})
}
catch(error){
console.error(error)
}
}

const deletefirmbyid=async (req,res)=>{
    const firmid=req.params.id;
    try {
        const firm =await Firm.findByIdAndDelete(firmid);
        if(!firm){
            return res.status(404).json({msg:"firm not found"});

        }
        res.send(firm)
    } 
    catch (error) {
        console.log(error);
        res.send({msg:"internal error"})
    }
}

module.exports={addfirm:[upload.single('image'),addfirm],deletefirmbyid}