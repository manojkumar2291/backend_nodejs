const express=require('express');
const productcontroller=require('../controller/productcontroller');

const router=express.Router();

router.post('/addproduct/:firmid',productcontroller.addproduct);
router.get('/getproductsbyfirm/:firmid',productcontroller.getproductbyfirm);
router.get('/getproductbyid/:id',productcontroller.getproductsbyid)
router.get('/getallproducts',productcontroller.getallproducts)
router.get('/uploads/:imagename',(req,res)=>{
    const imagename=req.params.imagename;
    res.headersSent('Content-type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imagename));
});
router.delete('/deletebyid/:id',productcontroller.deleteproductbyid);


module.exports=router