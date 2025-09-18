// src/components/RecipeList.jsx
import { useRecipeStore } from "./recipeStore";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  return (
    <div>
      <h2>📖 Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add some!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: "10px" }}>
            <h3>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
            {favorites.includes(recipe.id) ? (
              <button onClick={() => removeFavorite(recipe.id)}>💔 Remove Favorite</button>
            ) : (
              <button onClick={() => addFavorite(recipe.id)}>❤️ Add Favorite</button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
