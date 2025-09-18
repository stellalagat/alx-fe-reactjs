import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === id));
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);
  const navigate = useNavigate();

  const [title, setTitle] = useState('recipe ? recipe.title : ""');
  const [description, setDescription] = useState('(recipe ? recipe.description : ""');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
  }, [recipe]);

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  const handleSubmit = (e) => {
     event.preventDefault();
    updateRecipe(id, { title, description });
    navigate(`/recipes/${id}`);
  };
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditRecipeForm;
