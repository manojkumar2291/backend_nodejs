const mongoose=require("mongoose");
const productschema=new mongoose.Schema({
    productName:{
        type:String,
        rquired:true
    },
    Price:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg']
            }
        ],
        required:true
        
    },
    region:{
        type:[
            {
                type:String,
                enum:['south-indian','north-indian','chinese','bakery']
            }
        ]
    },
    image:{
        type:String
    },
    bestseller:{
        type:Boolean,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'firm'
    }]
})
const Product=mongoose.model('product',productschema);
module.exports=Product