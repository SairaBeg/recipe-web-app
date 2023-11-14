import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
export const CreateRecipe = () => {
  const navigate = useNavigate();
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
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
      const response = await axios.post(
        "http://localhost:3001/recipes",
        recipe
      );
      alert("Recipe Created!");
      navigate("/");
    } catch (e) {
      console.error("Error submitting recipe:", e);
      alert("Error creating recipe. Please check the console for details.");
    }
  };
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          value={recipe.description}
          name="description"
          id="description"
          onChange={handleChange}
        />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            id="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          value={recipe.instructions}
          onChange={handleChange}
          type="text"
          name="instructions"
          id="instructions"
        />
        <label htmlFor="imageUrl">ImageURL</label>
        <input
          value={recipe.imageUrl}
          onChange={handleChange}
          type="text"
          name="imageUrl"
          id="imageUrl"
        />
        <label htmlFor="cookingTime">Cooking Time</label>
        <input
          value={recipe.cookingTime}
          onChange={handleChange}
          type="number"
          name="cookingTime"
          id="cookingTime"
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
