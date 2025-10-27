import { useParams, Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore'

import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === id));
  state.recipes.find((r) => String(r.id) === String(id))

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <div style={{ marginTop: '12px' }}>
        <Link to={`/recipes/${id}/edit`}>Edit</Link>
        <DeleteRecipeButton id={id} />
      </div>
      <p style={{ marginTop: '12px' }}>
        <Link to="/">Back to list</Link>
      </p>
       <small>ID: {recipe.id}</small>
    </div>
  );
};

export default RecipeDetails;
