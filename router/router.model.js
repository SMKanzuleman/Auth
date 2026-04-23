const { Router } = require("express");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authRouter = Router();
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


authRouter.get("/getme", async(req,res)=>{
  try {
    const token=req.headers.authorization.split(" ")[1];

    //! will grep id from token hash it again with JWT_SECRET compare it with Input Token's signature  

    const decoded=jwt.verify(token,JWT_SECRET);

    if(decoded){
      const founded=await User.findById(decoded.id).select("-password"); 
      res.json({message: "User found successfully!!!",
        user: founded
      })
    }
    else{
      res.json({message: "token not found!!!"})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
} )


authRouter.post("/register", async(req, res) => {
  const { name, email, password } = req.body;
  const isExist = await User.findOne({
    $or: [{ email }, { name }],
  });
  if (isExist) {
    res.json({ message: "User already exists" });
  } else {
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPass,
    });

    await newUser.save();
      
    const token = await jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser, token });
  }
});

module.exports = authRouter;
