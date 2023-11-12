export const CreateRecipe = () => {
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" />
        <label htmlFor="ingredients">Ingredients</label>
        <input type="text" name="ingredients" id="ingredients" />

        <label htmlFor="instructions">Instructions</label>
        <textarea type="text" name="instructions" id="instructions" />
        <label htmlFor="imageUrl">ImageURL</label>
        <input type="text" name="imageUrl" id="imageUrl" />
        <label htmlFor="cookingTime">Cooking Time</label>
        <input type="number" name="cookingTime" id="cookingTime" />
      </form>
    </div>
  );
};
