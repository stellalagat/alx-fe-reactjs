import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: "Classic Chocolate Chip Cookies",
      description: "Soft and chewy chocolate chip cookies that are perfect for any occasion.",
      ingredients: ["2 1/4 cups all-purpose flour", "1 tsp baking soda", "1 tsp salt", "1 cup butter", "3/4 cup sugar", "2 large eggs", "2 cups chocolate chips"],
      instructions: "Preheat oven to 375°F. Mix dry ingredients. Cream butter and sugars. Add eggs and vanilla. Combine with dry ingredients. Fold in chocolate chips. Bake for 9-11 minutes.",
      prepTime: 15,
      cookTime: 10,
      difficulty: "Easy",
      category: "Dessert"
    },
    {
      id: 2,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy vegetable stir fry with a savory sauce.",
      ingredients: ["2 tbsp oil", "3 cloves garlic", "1 bell pepper", "2 carrots", "1 cup broccoli", "1/4 cup soy sauce", "1 tbsp honey"],
      instructions: "Heat oil in a wok. Add garlic and stir-fry for 30 seconds. Add vegetables and cook until tender-crisp. Add sauce ingredients and toss to combine.",
      prepTime: 10,
      cookTime: 15,
      difficulty: "Easy",
      category: "Main Course"
    },
    {
      id: 3,
      title: "Creamy Tomato Pasta",
      description: "Rich and creamy tomato pasta with fresh herbs.",
      ingredients: ["250g pasta", "2 cups tomato sauce", "1/2 cup heavy cream", "1 onion", "3 cloves garlic", "Fresh basil", "Parmesan cheese"],
      instructions: "Cook pasta according to package directions. Sauté onion and garlic. Add tomato sauce and cream. Simmer for 10 minutes. Toss with pasta and garnish with basil and Parmesan.",
      prepTime: 5,
      cookTime: 20,
      difficulty: "Medium",
      category: "Main Course"
    }
  ],
  
  // Search and Filter State
  searchTerm: '',
  selectedCategory: '',
  selectedDifficulty: '',
  maxPrepTime: '',
  maxCookTime: '',
  
  // Actions for Search and Filter
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
  setMaxPrepTime: (time) => set({ maxPrepTime: time }),
  setMaxCookTime: (time) => set({ maxCookTime: time }),
  
  // Clear all filters
  clearFilters: () => set({ 
    searchTerm: '',
    selectedCategory: '',
    selectedDifficulty: '',
    maxPrepTime: '',
    maxCookTime: ''
  }),
  
  // Computed filtered recipes
  get filteredRecipes() {
    const { recipes, searchTerm, selectedCategory, selectedDifficulty, maxPrepTime, maxCookTime } = get()
    
    return recipes.filter(recipe => {
      // Search term filter (title, description, ingredients)
      const matchesSearch = searchTerm === '' || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      
      // Category filter
      const matchesCategory = selectedCategory === '' || recipe.category === selectedCategory
      
      // Difficulty filter
      const matchesDifficulty = selectedDifficulty === '' || recipe.difficulty === selectedDifficulty
      
      // Prep time filter
      const matchesPrepTime = maxPrepTime === '' || recipe.prepTime <= parseInt(maxPrepTime)
      
      // Cook time filter
      const matchesCookTime = maxCookTime === '' || recipe.cookTime <= parseInt(maxCookTime)
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrepTime && matchesCookTime
    })
  },
  
  // Get unique categories for filter dropdown
  get categories() {
    const categories = get().recipes.map(recipe => recipe.category)
    return [...new Set(categories)]
  },
  
  // Get unique difficulties for filter dropdown
  get difficulties() {
    const difficulties = get().recipes.map(recipe => recipe.difficulty)
    return [...new Set(difficulties)]
  },
  
  // Existing actions (preserved)
  addRecipe: (newRecipe) => 
    set((state) => ({ 
      recipes: [...state.recipes, { 
        ...newRecipe, 
        id: Date.now(),
        prepTime: newRecipe.prepTime || 0,
        cookTime: newRecipe.cookTime || 0,
        difficulty: newRecipe.difficulty || 'Easy',
        category: newRecipe.category || 'Uncategorized'
      }] 
    })),
  
  setRecipes: (recipes) => set({ recipes }),
  
  removeRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id)
    })),
  
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      )
    })),
  
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id)
    })),
  
  getRecipe: (id) => {
    return get().recipes.find(recipe => recipe.id === parseInt(id))
  }
}))

export default useRecipeStore