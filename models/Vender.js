const mongoose=require('mongoose');

const VenderSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    firm:[{
type:mongoose.Schema.Types.ObjectId,
ref:'firm'
    }]
})
const vender=mongoose.model('vender',VenderSchema);
module.exports=vender