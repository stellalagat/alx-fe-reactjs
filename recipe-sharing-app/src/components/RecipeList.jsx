import useRecipeStore from './recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)
  const removeRecipe = useRecipeStore((state) => state.removeRecipe)

  return (
    <div className="recipe-list">
      <h2>Recipes ({recipes.length})</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-header">
              <h3>{recipe.title}</h3>
              <button 
                onClick={() => removeRecipe(recipe.id)}
                className="delete-btn"
              >
                ×
              </button>
            </div>
            <p>{recipe.description}</p>
            <div className="recipe-meta">
              <small>ID: {recipe.id}</small>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default RecipeList