import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );

        setSavedRecipes(response.data.savedRecipes);
      } catch (e) {
        console.error(e);
      }
    };

    fetchSavedRecipe();
  }, []);

  return (
    <div>
      <div className="all-recipes-title">
        <h2 className="all-recipes-title-h2">Saved Recipes</h2>
      </div>
      <div className="cardfeed">
        <ul>
          {savedRecipes.map((recipe) => (
            <li className="recipe-card" key={recipe._id}>
              <div className="title-button">
                <h2 className="card-title">{recipe.name}</h2>
              </div>
              <div className="instructions-div">
                <label id="instructions-label" htmlFor="instructions">
                  Instructions:
                </label>

                <p className="instructions">{recipe.instructions}</p>
              </div>
              <img
                className="card-image"
                src={recipe.imageUrl}
                alt={recipe.name}
              />
              <p id="cooking-time">
                {" "}
                <span id="cooking-time-label">Cooking Time: </span>{" "}
                {recipe.cookingTime} (minutes)
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
