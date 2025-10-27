import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const FavoritesList = () => {
  const favorites = useRecipeStore(state => state.favorites)
  const recipes = useRecipeStore(state => state.recipes)
  const removeFavorite = useRecipeStore(state => state.removeFavorite)
  
  // Get favorite recipes by matching IDs
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id))

  return (
    <div className="favorites-list">
      <div className="section-header">
        <h2>❤️ My Favorite Recipes</h2>
        <span className="count-badge">{favoriteRecipes.length} recipes</span>
      </div>
      
      {favoriteRecipes.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-icon">⭐</div>
          <h3>No favorites yet</h3>
          <p>Start adding recipes to your favorites by clicking the heart icon!</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favoriteRecipes.map((recipe) => (
            <div key={recipe.id} className="favorite-card">
              <div className="favorite-card-content">
                <div className="favorite-header">
                  <h3>
                    <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                      {recipe.title}
                    </Link>
                  </h3>
                  <button 
                    onClick={() => removeFavorite(recipe.id)}
                    className="remove-favorite-btn"
                    title="Remove from favorites"
                  >
                    ❤️
                  </button>
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
                
                <div className="favorite-actions">
                  <Link to={`/recipe/${recipe.id}`} className="view-btn">
                    View Recipe
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

export default FavoritesList