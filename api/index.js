import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoose.connect(process.env.mongourl,{
  
}).then(() => {
   
    console.log("MONGODB connected bhai 🥳🎉🎊")   
})
.catch((err)=>{
    console.log('Database nhi hua connect 😢')
})

const __dirname = path.resolve();

const app = express();
app.use(express.json());

app.use(cookieParser())

app.listen(4000 , () => {
    console.log("Server 3000 me chlla hai , startup at http://localhost:3000/")
})

// Allow all origins

app.use('/api/user', userRouter);
app.use('/api/auth' , authRouter);
app.use('/api/listing' , listingRouter);
app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=> {
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message  =err.message || "Internal Server mei error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
} )