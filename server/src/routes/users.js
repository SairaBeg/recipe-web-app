import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import dotenv from "dotenv";
import path from "path";

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
  console.log(process.env.JWT_SECRET);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, userID: user._id });
});

export { router as userRouter };
