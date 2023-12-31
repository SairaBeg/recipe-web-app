import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "User already exists!" });
  }
  const hashedPw = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPw });
  await newUser.save();
  res.json({ message: "User Registered Successfully!" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "User does not exist!" });
  }
  const isPwValid = await bcrypt.compare(password, user.password);
  if (!isPwValid) {
    return res.json({ message: "Username or Password is incorrect." });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, userID: user._id });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("Received Token:", token);
  const decodedToken = jwt.decode(token);
  console.log("Decoded Token:", decodedToken);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res.status(403).json({ message: "Invalid token" });
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
