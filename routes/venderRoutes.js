const venderController=require('../controller/venderController');
const express=require("express");
const router=express.Router();
 

router.post('/register',venderController.venderRegister);
router.post('/login',venderController.venderlogin);
router.get('/all-vendors',venderController.getAllVenders);
router.get('/single-vender/:id',venderController.getVenderById)


module.exports=router;