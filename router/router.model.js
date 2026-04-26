const { Router } = require("express");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authRouter = Router();
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Get Me Route
authRouter.get("/getme", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // will grep id from token hash it again with JWT_SECRET compare it with Input Token's signature  
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded) {
      const founded = await User.findById(decoded.id).select("-password");
      res.json({
        message: "User found successfully!!!",
        user: founded
      })
    }
    else {
      res.json({ message: "token not found!!!" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Register Route
authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isExist = await User.findOne({$or: [{ email }, { name }],});
    if (isExist) 
    {
    res.json({ message: "User already exists" });
    } 
  else
  {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({name,email,password: hashedPass,});
    await newUser.save();
    //
    const accessToken = await jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "15m",});
    const refreshToken = await jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d",});
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true , sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000,});
    res.status(201).json({ message: "User registered successfully", user: newUser, accessToken });
  }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
});

// refresh route {refresh access token}

authRouter.get("/refresh", async (req,res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    const accessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: "15m" });
    res.json({ accessToken });
    
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = authRouter;
