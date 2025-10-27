import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe)
  const navigate = useNavigate()
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState([''])
  const [instructions, setInstructions] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [difficulty, setDifficulty] = useState('Easy')
  const [category, setCategory] = useState('Uncategorized')

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, ''])
  }

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description')
      return
    }

    // Filter out empty ingredients
    const filteredIngredients = ingredients.filter(ingredient => ingredient.trim() !== '')

    const newRecipe = {
      title: title.trim(),
      description: description.trim(),
      ingredients: filteredIngredients.length > 0 ? filteredIngredients : ['No ingredients listed'],
      instructions: instructions.trim(),
      prepTime: parseInt(prepTime) || 0,
      cookTime: parseInt(cookTime) || 0,
      difficulty: difficulty,
      category: category
    }

    addRecipe(newRecipe)
    
    // Reset form
    setTitle('')
    setDescription('')
    setIngredients([''])
    setInstructions('')
    setPrepTime('')
    setCookTime('')
    setDifficulty('Easy')
    setCategory('Uncategorized')

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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter recipe title"
          className="form-input"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
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
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
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
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            placeholder="0"
            min="0"
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Ingredients *</label>
        {ingredients.map((ingredient, index) => (
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
              disabled={ingredients.length === 1}
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
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
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