import { useState } from "react";
import axios from "axios";

export const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: 0,
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
      await axios.post();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={handleChange} />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, idx)}
          />
        ))}
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>

        <label htmlFor="instructions">Instructions</label>
        <textarea type="text" name="instructions" id="instructions" />
        <label htmlFor="imageUrl">ImageURL</label>
        <input type="text" name="imageUrl" id="imageUrl" />
        <label htmlFor="cookingTime">Cooking Time</label>
        <input type="number" name="cookingTime" id="cookingTime" />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
