import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const [_, cookies] = useCookies(["access_token"]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");

        setRecipes(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );

        setSavedRecipes(response.data.savedRecipes);
      } catch (e) {
        console.error(e);
      }
    };

    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipe();
  }, [userID, cookies.access_token]);
  //Save Recipe call
  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeID,
          userID,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (e) {
      console.error(e);
    }
  };
  const isRecipeSaved = (id) => savedRecipes?.includes(id);

  //Remove Saved Recipe Call
  const unSaveRecipe = async (recipeID) => {
    try {
      await axios.delete("http://localhost:3001/recipes", {
        data: {
          recipeID,
          userID,
        },
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });

      // Update savedRecipes state manually
      setSavedRecipes(savedRecipes.filter((id) => id !== recipeID));
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <div className="all-recipes-title">
        <h2 className="all-recipes-title-h2">Recipes</h2>
      </div>

      <div className="cardfeed">
        <ul>
          {recipes.map((recipe) => (
            <li className="recipe-card" key={recipe._id}>
              <div className="title-button">
                <h2 className="card-title">{recipe.name}</h2>
                {/* <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save Recipe"}
              </button> */}
                <button
                  id="save-button"
                  className="btn"
                  onClick={() => {
                    if (isRecipeSaved(recipe._id)) {
                      unSaveRecipe(recipe._id);
                    } else {
                      saveRecipe(recipe._id);
                    }
                  }}
                >
                  {isRecipeSaved(recipe._id) ? "Unsave Recipe" : "Save Recipe"}
                </button>
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
                <span id="cooking-time-label">Cooking Time: </span>
                {recipe.cookingTime} (minutes)
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
