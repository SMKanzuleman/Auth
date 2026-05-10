import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import User from '../models/users.model.js'; 
import authRouter from '../router/router.model.js';

dotenv.config();



const app = express();


//! Sensitive Data
const DATABASE_URL = process.env.MONGODB_ATLAS_URL;
const JWT_SECRET = process.env.JWT_SECRET;

const connectDb=async()=>{
  try {
    await mongoose.connect(DATABASE_URL)
    console.log("Database is connected successfully!!👨🏻‍💻")
  } catch (error) {
    console.log("There is some error",error.message)
    
  }
}

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/api/auth/',authRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    connectDb();
});