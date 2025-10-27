import { useParams, Link, useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecipeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = useRecipeStore(state => 
    state.recipes.find(recipe => recipe.id === parseInt(id))
  )
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
  const toggleFavorite = useRecipeStore(state => state.toggleFavorite)
  const isFavorite = useRecipeStore(state => state.isFavorite)

  if (!recipe) {
    return (
      <div className="recipe-details">
        <div className="error-message">
          <h2>Recipe Not Found</h2>
          <p>The recipe you're looking for doesn't exist.</p>
          <Link to="/" className="back-link">← Back to Recipes</Link>
        </div>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipe.id)
      navigate('/')
    }
  }

  const handleToggleFavorite = () => {
    toggleFavorite(recipe.id)
  }

  return (
    <div className="recipe-details">
      <div className="details-header">
        <Link to="/" className="back-link">← Back to Recipes</Link>
        <div className="action-buttons">
          <button 
            onClick={handleToggleFavorite}
            className={`favorite-btn-large ${isFavorite(recipe.id) ? 'favorited' : ''}`}
          >
            {isFavorite(recipe.id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
          <Link to={`/edit/${recipe.id}`} className="edit-btn">
            Edit Recipe
          </Link>
          <button onClick={handleDelete} className="delete-btn">
            Delete Recipe
          </button>
        </div>
      </div>

      <div className="recipe-content">
        <div className="recipe-title-section">
          <h1>{recipe.title}</h1>
          {isFavorite(recipe.id) && (
            <span className="favorite-badge">❤️ Favorite</span>
          )}
        </div>
        
        <p className="recipe-description">{recipe.description}</p>
        
        <div className="recipe-meta-details">
          <div className="meta-detail">
            <strong>Category:</strong> {recipe.category}
          </div>
          <div className="meta-detail">
            <strong>Difficulty:</strong> {recipe.difficulty}
          </div>
          <div className="meta-detail">
            <strong>Prep Time:</strong> {recipe.prepTime} minutes
          </div>
          <div className="meta-detail">
            <strong>Cook Time:</strong> {recipe.cookTime} minutes
          </div>
          <div className="meta-detail">
            <strong>Total Time:</strong> {recipe.prepTime + recipe.cookTime} minutes
          </div>
        </div>
        
        <div className="details-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            )) || <li>No ingredients listed</li>}
          </ul>
        </div>

        <div className="details-section">
          <h2>Instructions</h2>
          <div className="instructions">
            {recipe.instructions ? (
              <p>{recipe.instructions}</p>
            ) : (
              <p>No instructions provided</p>
            )}
          </div>
        </div>

        <div className="recipe-meta">
          <small>Recipe ID: {recipe.id}</small>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails