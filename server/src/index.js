import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

dotenv.config();

// generates a version of our api
const app = express();

// middleware that converts data sent from the front-end into json
app.use(express.json());
app.use(
  cors({
    origin: ["https://recipe-web-app-eosin.vercel.app"],
    methods: ["GET", "HEAD", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

const password = process.env.MONGODB_PW;

mongoose.connect(
  `mongodb+srv://sairabegdev:${password}@recipes.sci6put.mongodb.net/recipes?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// app.listen(3001, () => console.log("Server started @PORT 3001"));
app.listen(() => console.log("Server started"));
