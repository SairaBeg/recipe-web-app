import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [_, cookies] = useCookies(["access_token"]);

  const userID = useGetUserID();

  //Fetch all recipes in the database for the homepage
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // const response = await axios.get("http://localhost:3001/recipes");
        const response = await axios.get("/recipes");
        const recipesData = response.data;
        // Check if recipesData is an array before setting it in the state
        if (Array.isArray(recipesData)) {
          setRecipes(recipesData);
        } else {
          console.error("Invalid response format for recipes:", recipesData);
        }
      } catch (e) {
        console.error(e);
      }
    };
    //Informs the Saved Recipes button if a user has a recipe saved or not. The button appears as "Unsave Recipe" if it is already saved, "Save Recipe" if not.
    const fetchSavedRecipe = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        // );
        const response = await axios.get(`/recipes/savedRecipes/ids/${userID}`);
        // console.log("Saved Recipes:", response.data.savedRecipes);
        setSavedRecipes(response.data.savedRecipes);
      } catch (e) {
        console.error(e);
      }
    };
    fetchRecipe();
    //   if (cookies.access_token) fetchSavedRecipe();
    // }, [userID, cookies.access_token]);
    fetchSavedRecipe();
  }, [userID]);

  useEffect(() => {
    console.log("Updated Saved Recipes:", savedRecipes);
  }, [savedRecipes]);

  //Save Recipe a recipe to the server
  const saveRecipe = async (recipeID) => {
    try {
      // const response = await axios.put(
      //   "http://localhost:3001/recipes",
      const response = await axios.put(
        "/recipes",
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
      setSavedRecipes((prevSavedRecipes) => [
        ...prevSavedRecipes,
        recipeID, // Append the new recipe ID
      ]);
    } catch (e) {
      console.error(e);
    }
  };
  const isRecipeSaved = (id) => savedRecipes.includes(id);

  //Remove Saved Recipe
  const unSaveRecipe = async (recipeID) => {
    try {
      // await axios.delete("http://localhost:3001/recipes", {
      await axios.delete("/recipes", {
        data: {
          recipeID,
          userID,
        },
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });

      // Update savedRecipes state manually
      setSavedRecipes((prevSavedRecipes) =>
        prevSavedRecipes.filter((id) => id !== recipeID)
      );
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

                {savedRecipes && (
                  <button
                    id="save-button"
                    className="btn"
                    onClick={() => {
                      console.log("Before click Saved Recipes:", savedRecipes);
                      console.log(
                        "Before click is Recipe Saved?",
                        isRecipeSaved(recipe._id)
                      );
                      if (isRecipeSaved(recipe._id)) {
                        unSaveRecipe(recipe._id);
                      } else {
                        saveRecipe(recipe._id);
                      }
                      console.log("After click Saved Recipes:", savedRecipes);
                      console.log(
                        "after click Is Recipe Saved?",
                        isRecipeSaved(recipe._id)
                      );
                    }}
                  >
                    {isRecipeSaved(recipe._id)
                      ? "Unsave Recipe"
                      : "Save Recipe"}
                  </button>
                )}
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
