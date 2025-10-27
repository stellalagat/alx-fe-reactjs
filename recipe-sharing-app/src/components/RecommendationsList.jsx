import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations)
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations)
  const toggleFavorite = useRecipeStore(state => state.toggleFavorite)
  const isFavorite = useRecipeStore(state => state.isFavorite)

  // Generate recommendations when component mounts
  useEffect(() => {
    generateRecommendations()
  }, [generateRecommendations])

  const handleRefresh = () => {
    generateRecommendations()
  }

  return (
    <div className="recommendations-list">
      <div className="section-header">
        <h2>🎯 Personalized Recommendations</h2>
        <button onClick={handleRefresh} className="refresh-btn" title="Refresh recommendations">
          🔄
        </button>
      </div>
      
      {recommendations.length === 0 ? (
        <div className="empty-recommendations">
          <div className="empty-icon">🤔</div>
          <h3>No recommendations yet</h3>
          <p>Add some recipes to your favorites to get personalized recommendations!</p>
          <button onClick={handleRefresh} className="refresh-btn-large">
            Try Generating Recommendations
          </button>
        </div>
      ) : (
        <>
          <p className="recommendations-subtitle">
            Based on your favorite recipes and preferences
          </p>
          <div className="recommendations-grid">
            {recommendations.map((recipe) => (
              <div key={recipe.id} className="recommendation-card">
                <div className="recommendation-card-content">
                  <div className="recommendation-header">
                    <h3>
                      <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                        {recipe.title}
                      </Link>
                    </h3>
                    <button 
                      onClick={() => toggleFavorite(recipe.id)}
                      className={`favorite-btn ${isFavorite(recipe.id) ? 'favorited' : ''}`}
                      title={isFavorite(recipe.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      {isFavorite(recipe.id) ? '❤️' : '🤍'}
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
                  
                  <div className="recommendation-actions">
                    <Link to={`/recipe/${recipe.id}`} className="view-btn">
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default RecommendationsList