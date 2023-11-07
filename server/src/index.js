import express from "express";
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();

// generates a version of our api
const app = express();

// middleware that converts data sent from the front-end into json
app.use(express.json());
app.use(cors());

const password = process.env.MONGODB_PW;

mongoose.connect(
  `mongodb+srv://sairabegdev:${password}@recipes.sci6put.mongodb.net/?retryWrites=true&w=majority`
);

app.listen(3001, () => console.log("Server started @PORT 3001"));
