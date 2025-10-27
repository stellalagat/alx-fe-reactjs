import { useParams, Link, useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecipeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = useRecipeStore(state => 
    state.recipes.find(recipe => recipe.id === parseInt(id))
  )
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)

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

  return (
    <div className="recipe-details">
      <div className="details-header">
        <Link to="/" className="back-link">← Back to Recipes</Link>
        <div className="action-buttons">
          <Link to={`/edit/${recipe.id}`} className="edit-btn">
            Edit Recipe
          </Link>
          <button onClick={handleDelete} className="delete-btn">
            Delete Recipe
          </button>
        </div>
      </div>

      <div className="recipe-content">
        <h1>{recipe.title}</h1>
        <p className="recipe-description">{recipe.description}</p>
        
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