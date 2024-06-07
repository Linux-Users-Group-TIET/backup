import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

dotenv.config();

mongoose.connect(process.env.MONGOURL).then(() => {
    console.log("MONGODB connected bhai 🥳🎉🎊")   
})
.catch((err)=>{
    console.log('Database nhi hua connect 😢')
})


const app = express();

app.listen(3000 , () => {
    console.log("Server 3000 me chlla hai , startup at http://localhost:3000/")
})

app.use('/api/user', userRouter)