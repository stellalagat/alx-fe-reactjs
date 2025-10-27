import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes)
  const searchTerm = useRecipeStore((state) => state.searchTerm)
  const removeRecipe = useRecipeStore((state) => state.removeRecipe)
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite)
  const isFavorite = useRecipeStore((state) => state.isFavorite)

  const displayRecipes = filteredRecipes
  const hasSearchTerm = searchTerm.trim() !== ''

  return (
    <div className="recipe-list">
      <div className="list-header">
        <h2>
          {hasSearchTerm ? `Search Results (${displayRecipes.length})` : `All Recipes (${recipes.length})`}
        </h2>
        {hasSearchTerm && displayRecipes.length === 0 && (
          <div className="no-results">
            <p>No recipes found matching your search. Try different keywords or clear filters.</p>
          </div>
        )}
      </div>
      
      {displayRecipes.length === 0 && !hasSearchTerm ? (
        <div className="empty-state">
          <h3>No recipes yet</h3>
          <p>Get started by adding your first recipe!</p>
        </div>
      ) : (
        <div className="recipes-grid">
          {displayRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-card-content">
                <div className="recipe-header">
                  <h3>
                    <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                      {recipe.title}
                    </Link>
                  </h3>
                  <div className="recipe-actions-header">
                    <button 
                      onClick={() => toggleFavorite(recipe.id)}
                      className={`favorite-btn ${isFavorite(recipe.id) ? 'favorited' : ''}`}
                      title={isFavorite(recipe.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      {isFavorite(recipe.id) ? '❤️' : '🤍'}
                    </button>
                    <button 
                      onClick={() => removeRecipe(recipe.id)}
                      className="delete-btn"
                      title="Delete recipe"
                    >
                      ×
                    </button>
                  </div>
                </div>
                
                <p className="recipe-description">{recipe.description}</p>
                
                <div className="recipe-meta-info">
                  <span className="meta-item">
                    <strong>Category:</strong> {recipe.category}
                  </span>
                  <span className="meta-item">
                    <strong>Difficulty:</strong> {recipe.difficulty}
                  </span>
                  <span className="meta-item">
                    <strong>Time:</strong> {recipe.prepTime + recipe.cookTime} min
                  </span>
                </div>
                
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