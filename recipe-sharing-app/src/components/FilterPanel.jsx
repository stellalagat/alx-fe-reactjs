import React from 'react'
import useRecipeStore from './recipeStore'

const FilterPanel = () => {
  const {
    selectedCategory,
    selectedDifficulty,
    maxPrepTime,
    maxCookTime,
    categories,
    difficulties,
    setSelectedCategory,
    setSelectedDifficulty,
    setMaxPrepTime,
    setMaxCookTime,
    clearFilters
  } = useRecipeStore()

  const hasActiveFilters = selectedCategory || selectedDifficulty || maxPrepTime || maxCookTime

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filter Recipes</h3>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear All
          </button>
        )}
      </div>

      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="filter-select"
        >
          <option value="">All Difficulties</option>
          {difficulties.map(difficulty => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="prepTime">Max Prep Time (minutes)</label>
        <select
          id="prepTime"
          value={maxPrepTime}
          onChange={(e) => setMaxPrepTime(e.target.value)}
          className="filter-select"
        >
          <option value="">Any Time</option>
          <option value="5">5 minutes</option>
          <option value="10">10 minutes</option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">60 minutes</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="cookTime">Max Cook Time (minutes)</label>
        <select
          id="cookTime"
          value={maxCookTime}
          onChange={(e) => setMaxCookTime(e.target.value)}
          className="filter-select"
        >
          <option value="">Any Time</option>
          <option value="10">10 minutes</option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">60 minutes</option>
        </select>
      </div>
    </div>
  )
}

export default FilterPanel