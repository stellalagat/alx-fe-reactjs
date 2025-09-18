import { useRecipeStore } from "./recipeStore";

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  return (
    <button onClick={() => deleteRecipe(id)} style={{ marginLeft: "10px" }}>
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
