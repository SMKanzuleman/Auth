const { Router } = require("express");
const User = require("../models/users.model");
const Session = require("../models/session.model").default;
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

    const isExist = await User.findOne({ email });
    
    if (isExist) {
      res.json({ message: "User already exists" });
    }
    else {
      const hashedPass = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPass, });
      await newUser.save();

      const refreshToken = await jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d", });

      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

      const session = new Session({
        userId: newUser._id,
        rereshtokenHash: hashedRefreshToken,
        iP: req.ip,
        userAgent: req.headers["user-agent"],

      })
      const accessToken = await jwt.sign({
        id: newUser._id,
        sessionId: session._id,
      },
        JWT_SECRET,
        {
          expiresIn: "1m",
        });

      await session.save();

      res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000, });
      res.status(201).json({ message: "User registered successfully", user: newUser, accessToken });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

// refresh route {refresh access token}

authRouter.get("/refresh", async (req, res) => {
  try {
    const refreshToken = req.cookies ? req.cookies.refreshToken : null;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    const session = await Session.findOne({ userId: decoded.id, revoked: false });
    if (!session) {
      return res.status(401).json({ message: "Invalid session" });
    }

    const accessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: "1m" });

    const newRefreshToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: "7d" });

    const newRTH = await bcrypt.hash(newRefreshToken, 10);

    session.rereshtokenHash = newRTH;

    await session.save();

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: false, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000, });

    res.json({ accessToken });

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

authRouter.post("/logout", async (req, res) => {
  try {
    const refreshToken = req.cookies ? req.cookies.refreshToken : null;
    if (refreshToken) {

      const decoded = jwt.verify(refreshToken, JWT_SECRET);

      if (decoded) {

        const session = await Session.findOneAndUpdate({ userId: decoded.id, revoked: false }, { revoked: true });

        res.clearCookie("refreshToken");

        res.json({ message: "Logged out successfully" });
      }
      else {

        res.status(401).json({ message: "Invalid refresh token" });
      }
    }
    else {
      res.status(400).json({ message: "Refresh token not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = authRouter;
