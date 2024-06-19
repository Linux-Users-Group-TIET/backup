import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.mongourl,{
  
}).then(() => {
   
    console.log("MONGODB connected bhai 🥳🎉🎊")   
})
.catch((err)=>{
    console.log('Database nhi hua connect 😢')
})


const app = express();
app.use(express.json());

app.use(cookieParser())

app.listen(4000 , () => {
    console.log("Server 3000 me chlla hai , startup at http://localhost:3000/")
})
const cors = require('cors');
// Allow all origins
app.use(cors());
// Allow specific origin(s)
app.use(cors({
  origin: 'https://magicspringsfrontend-git-main-devs-projects-6847079c.vercel.app/',
  credentials: true,
}));
app.use('/api/user', userRouter);
app.use('/api/auth' , authRouter);
app.use('/api/listing' , listingRouter);
app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message  =err.message || "Internal Server mei error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
} )