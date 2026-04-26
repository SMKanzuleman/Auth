const express = require('express');
const morgan =require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/users.model');
const cookieParser = require('cookie-parser');
const authRouter=require('../router/router.model.js');
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
app.use('/api/auth/',authRouter)
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    connectDb();
});