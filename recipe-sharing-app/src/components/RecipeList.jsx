import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)
  const removeRecipe = useRecipeStore((state) => state.removeRecipe) // Keeping existing functionality

  return (
    <div className="recipe-list">
      <div className="list-header">
        <h2>All Recipes ({recipes.length})</h2>
      </div>
      
      {recipes.length === 0 ? (
        <div className="empty-state">
          <h3>No recipes yet</h3>
          <p>Get started by adding your first recipe!</p>
        </div>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-card-content">
                <div className="recipe-header">
                  <h3>
                    <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                      {recipe.title}
                    </Link>
                  </h3>
                  <button 
                    onClick={() => removeRecipe(recipe.id)}
                    className="delete-btn"
                  >
                    ×
                  </button>
                </div>
                
                <p className="recipe-description">{recipe.description}</p>
                
                {recipe.ingredients && (
                  <div className="recipe-preview">
                    <strong>Ingredients:</strong>
                    <ul>
                      {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <li>...and {recipe.ingredients.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}
                
                <div className="recipe-actions">
                  <Link to={`/recipe/${recipe.id}`} className="view-btn">
                    View Details
                  </Link>
                  <Link to={`/edit/${recipe.id}`} className="edit-btn">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecipeList