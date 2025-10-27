import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe)
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: '',
    prepTime: '',
    cookTime: '',
    difficulty: 'Easy',
    category: 'Uncategorized'
  })

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
    event.preventDefault()
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in both title and description')
      return
    }

    // Filter out empty ingredients
    const filteredIngredients = formData.ingredients.filter(ingredient => ingredient.trim() !== '')

    const newRecipe = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      ingredients: filteredIngredients.length > 0 ? filteredIngredients : ['No ingredients listed'],
      instructions: formData.instructions.trim(),
      prepTime: parseInt(formData.prepTime) || 0,
      cookTime: parseInt(formData.cookTime) || 0,
      difficulty: formData.difficulty,
      category: formData.category
    }

    addRecipe(newRecipe)
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      ingredients: [''],
      instructions: '',
      prepTime: '',
      cookTime: '',
      difficulty: 'Easy',
      category: 'Uncategorized'
    })

    // Navigate to home to see the new recipe in the list
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <h2>Add New Recipe</h2>
      
      <div className="form-group">
        <label htmlFor="title">Recipe Title *</label>
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
        <label htmlFor="description">Description *</label>
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

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="Uncategorized">Uncategorized</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Salad">Salad</option>
            <option value="Soup">Soup</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Beverage">Beverage</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="prepTime">Prep Time (minutes)</label>
          <input
            type="number"
            id="prepTime"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleInputChange}
            placeholder="0"
            min="0"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cookTime">Cook Time (minutes)</label>
          <input
            type="number"
            id="cookTime"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleInputChange}
            placeholder="0"
            min="0"
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Ingredients *</label>
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
      
      <button type="submit" className="submit-btn">
        Add Recipe
      </button>
    </form>
  )
}

export default AddRecipeForm