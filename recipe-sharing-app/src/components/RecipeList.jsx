import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((s) => s.filteredRecipes);
  const recipes = useRecipeStore((s) => s.recipes);

  // if filteredRecipes is empty AND there's a search term, that means no results.
  // otherwise show filteredRecipes (if any) or all recipes.
  const searchTerm = useRecipeStore((s) => s.searchTerm);
  const list = searchTerm ? filteredRecipes : recipes;

  return (
    <div>
      <h2>Recipe List</h2>
      {list.length === 0 ? (
        <p>{searchTerm ? 'No recipes match your search.' : 'No recipes added yet.'}</p>
      ) : (
        list.map((r) => (
          <div key={r.id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
            <h3>
              <Link to={`/recipes/${r.id}`}>{r.title}</Link>
            </h3>
            <p>{r.description?.length > 140 ? `${r.description.slice(0, 140)}...` : r.description}</p>
            <div>
              <Link to={`/recipes/${r.id}/edit`}>Edit</Link>
              <DeleteRecipeButton id={r.id} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
