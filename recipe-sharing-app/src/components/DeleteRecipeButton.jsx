import { useRecipeStore } from './recipeStore';
import useRecipeStore from '../store/recipeStore'


const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    deleteRecipe(id);
    navigate('/'); // back to home/list after delete
  };

  return (
    <button type="button" onClick={handleDelete} style={{ marginLeft: '8px' }}>
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
