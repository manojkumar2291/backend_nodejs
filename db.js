const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config();


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('db connected successfully'))
.catch((error)=>console.log(error))

