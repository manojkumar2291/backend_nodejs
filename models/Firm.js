const mongoose=require("mongoose");
const firmschema=new mongoose.Schema({
    firmName:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[
           {
            type:String,
            enum:['veg','non-veg']
           }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:['south-indian','north-indian','chinese','bakery']
            }
        ]
    },
    offer:{
        type:String,
    },
    image:{
        type:String
    },
    vender:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'vender'
        }
    ],
    product:[
        {
           type:mongoose.Schema.Types.ObjectId,
            ref:'product'
        }
    ]
        
    
})
const firm=mongoose.model('firm',firmschema);
module.exports=firm