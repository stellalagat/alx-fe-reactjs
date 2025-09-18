import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes added yet.</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h3>
             <Link to={`/recipes/${r.id}`}>{r.title}</Link> 
              </h3>
               <p>{r.description.length > 140 ? `${r.description.slice(0, 140)}...` : r.description}</p>
            <Link to={`/recipes/${r.id}/edit`}>Edit</Link>
            <DeleteRecipeButton id={r.id} />
           
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
