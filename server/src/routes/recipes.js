import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import mongoose from "mongoose";
import express from "express";
import { verifyToken } from "./users.js";

const router = express.Router();
//Get Recipes
router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (e) {
    res.json(e);
  }
});
//Create Recipe
router.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (e) {
    res.json(e);
  }
});

//Save a recipe
router.put("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);

    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (e) {
    res.json(e);
  }
});
//Delete a saved recipe
router.delete("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);

    user.savedRecipes.pull(recipe._id);
    await user.save();

    // Include updated savedRecipes in response
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (e) {
    res.json(e);
  }
});
//Get IDs of a user's Saved Recipes
router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (e) {
    res.json(e);
  }
});
//Get a user's Saved Recipes
router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (e) {
    res.json(e);
  }
});

export { router as recipesRouter };
