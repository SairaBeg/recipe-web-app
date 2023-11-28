import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const navigate = useNavigate();
  const userID = useGetUserID();
  const [_, cookies] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };
  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };
  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert("Recipe Created!");
      navigate("/");
    } catch (e) {
      console.error("Error submitting recipe:", e);
      alert("Error creating recipe. Please check the console for details.");
    }
  };
  return (
    <div id="create-recipe-container">
      <div className="create-recipe-card">
        <h2 id="create-recipe-title">Create Recipe</h2>
        <form onSubmit={onSubmit}>
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={recipe.name}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            value={recipe.description}
            name="description"
            id="description"
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="ingredients">
            Ingredients
          </label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              className="ingredient-box"
              id={`ingredient-${index}`}
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}
          <button
            id="add-ingredient-button"
            type="button"
            onClick={addIngredient}
          >
            Add Ingredient
          </button>

          <label className="form-label" htmlFor="instructions">
            Instructions
          </label>
          <textarea
            value={recipe.instructions}
            onChange={handleChange}
            type="text"
            name="instructions"
            id="instructions"
          />
          <label className="form-label" htmlFor="imageUrl">
            ImageURL
          </label>
          <input
            value={recipe.imageUrl}
            onChange={handleChange}
            type="text"
            name="imageUrl"
            id="imageUrl"
          />
          <label className="form-label" htmlFor="cookingTime">
            Cooking Time (Minutes)
          </label>
          <input
            value={recipe.cookingTime}
            onChange={handleChange}
            type="number"
            name="cookingTime"
            id="cookingTime"
          />
          <button id="create-recipe-button" type="submit">
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
};
