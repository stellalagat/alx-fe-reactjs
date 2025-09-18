import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecipeStore } from "./recipeStore";

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, updateRecipe } = useRecipeStore();

  const recipe = recipes.find((r) => r.id === id);

  const [title, setTitle] = useState(recipe ? recipe.title : "");
  const [description, setDescription] = useState(
    recipe ? recipe.description : ""
  );

  if (!recipe) {
    return <p>Recipe not found!</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe(id, { title, description });
    navigate(`/recipes/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h2>Edit Recipe</h2>
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Recipe Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ display: "block", marginTop: "10px", width: "100%" }}
      />
      <button type="submit" style={{ marginTop: "10px" }}>
        Save Changes
      </button>
    </form>
  );
};

export default EditRecipeForm;
