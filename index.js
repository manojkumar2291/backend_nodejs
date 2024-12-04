const express=require('express');
const dotenv=require('dotenv');
const db=require('./db');
const venderRoutes=require('./routes/venderRoutes');
const bodyparser=require('body-parser');
const firmRoutes=require('./routes/firmRoutes')
const productRoutes=require('./routes/productRoutes');
const path=require('path');
const cors=require('cors');



const app=express();


const PORT=process.env.PORT||4000;



dotenv.config();


app.use(cors({
  origin: 'https://dashboard-eight-lime.vercel.app', // Allow your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // If you are sending cookies or other credentials
}))
app.use(bodyparser.json())
app.use('/vender',venderRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));


app.listen(PORT,()=>{
    console.log(`server started listening at ${PORT}`);
});

app.use('/',(req,res)=>{
    res.send("<h1> welcome to vendor<h1>");
});
