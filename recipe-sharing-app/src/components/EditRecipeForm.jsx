import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const EditRecipeForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = useRecipeStore(state => 
    state.recipes.find(recipe => recipe.id === parseInt(id))
  )
  const updateRecipe = useRecipeStore(state => state.updateRecipe)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: ''
  })

  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title || '',
        description: recipe.description || '',
        ingredients: recipe.ingredients?.length > 0 ? recipe.ingredients : [''],
        instructions: recipe.instructions || ''
      })
    }
  }, [recipe])

  if (!recipe) {
    return (
      <div className="edit-recipe-form">
        <div className="error-message">
          <h2>Recipe Not Found</h2>
          <p>Cannot edit a recipe that doesn't exist.</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Back to Recipes
          </button>
        </div>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = value
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }))
  }

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }))
  }

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      setFormData(prev => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index)
      }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault() // Added event.preventDefault() here
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in both title and description')
      return
    }

    // Filter out empty ingredients
    const filteredIngredients = formData.ingredients.filter(ingredient => ingredient.trim() !== '')

    updateRecipe(recipe.id, {
      ...formData,
      ingredients: filteredIngredients.length > 0 ? filteredIngredients : ['No ingredients listed']
    })

    navigate(`/recipe/${recipe.id}`)
  }

  return (
    <div className="edit-recipe-form">
      <div className="form-header">
        <h2>Edit Recipe</h2>
        <button onClick={() => navigate(`/recipe/${recipe.id}`)} className="back-btn">
          ← Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label htmlFor="title">Recipe Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter recipe title"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your recipe"
            className="form-textarea"
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-input-group">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
                className="form-input"
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="remove-ingredient-btn"
                disabled={formData.ingredients.length === 1}
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="add-ingredient-btn"
          >
            + Add Ingredient
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            placeholder="Provide step-by-step instructions"
            className="form-textarea"
            rows="5"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Update Recipe
          </button>
          <button 
            type="button" 
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditRecipeForm