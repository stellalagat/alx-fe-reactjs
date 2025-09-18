// src/components/RecipeDetails.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, deleteRecipe } = useRecipeStore();

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return <p>Recipe not found!</p>;
  }

  const handleDelete = () => {
    deleteRecipe(id);
    navigate("/");
  };

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>

      <div style={{ marginTop: "10px" }}>
        <Link to={`/recipes/${id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
