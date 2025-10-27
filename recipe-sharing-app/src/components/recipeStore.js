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
    },
    {
      id: 4,
      title: "Fresh Garden Salad",
      description: "Light and refreshing salad with seasonal vegetables.",
      ingredients: ["Mixed greens", "1 cucumber", "2 tomatoes", "1/2 red onion", "1 bell pepper", "Olive oil", "Lemon juice"],
      instructions: "Chop all vegetables. Combine in a large bowl. Drizzle with olive oil and lemon juice. Toss gently and serve immediately.",
      prepTime: 10,
      cookTime: 0,
      difficulty: "Easy",
      category: "Salad"
    },
    {
      id: 5,
      title: "Chocolate Lava Cake",
      description: "Decadent chocolate cake with a molten chocolate center.",
      ingredients: ["4 oz dark chocolate", "1/2 cup butter", "2 eggs", "1/4 cup sugar", "2 tbsp flour", "1 tsp vanilla extract"],
      instructions: "Melt chocolate and butter. Whisk eggs and sugar. Combine all ingredients. Bake at 425°F for 12 minutes. Serve warm.",
      prepTime: 15,
      cookTime: 12,
      difficulty: "Medium",
      category: "Dessert"
    }
  ],
  
  // Search and Filter State (existing)
  searchTerm: '',
  selectedCategory: '',
  selectedDifficulty: '',
  maxPrepTime: '',
  maxCookTime: '',
  
  // NEW: Favorites and Recommendations State
  favorites: [],
  recommendations: [],
  
  // NEW: Favorites Actions
  addFavorite: (recipeId) => set(state => ({ 
    favorites: [...state.favorites, recipeId] 
  })),
  
  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  
  toggleFavorite: (recipeId) => set(state => {
    const isFavorite = state.favorites.includes(recipeId)
    if (isFavorite) {
      return { favorites: state.favorites.filter(id => id !== recipeId) }
    } else {
      return { favorites: [...state.favorites, recipeId] }
    }
  }),
  
  // NEW: Check if recipe is favorite
  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId)
  },
  
  // NEW: Generate personalized recommendations
  generateRecommendations: () => set(state => {
    const userFavorites = state.favorites
    const allRecipes = state.recipes
    
    if (userFavorites.length === 0) {
      // If no favorites, recommend popular or recent recipes
      return { 
        recommendations: allRecipes
          .sort(() => Math.random() - 0.5)
          .slice(0, 3) 
      }
    }
    
    // Get favorite recipe categories and difficulties
    const favoriteCategories = userFavorites.map(favId => {
      const recipe = allRecipes.find(r => r.id === favId)
      return recipe ? recipe.category : null
    }).filter(Boolean)
    
    const favoriteDifficulties = userFavorites.map(favId => {
      const recipe = allRecipes.find(r => r.id === favId)
      return recipe ? recipe.difficulty : null
    }).filter(Boolean)
    
    // Find recipes that match user's preferences but aren't already favorites
    const recommendedRecipes = allRecipes.filter(recipe => {
      const isAlreadyFavorite = userFavorites.includes(recipe.id)
      const matchesCategory = favoriteCategories.includes(recipe.category)
      const matchesDifficulty = favoriteDifficulties.includes(recipe.difficulty)
      
      // Recommend recipes that match preferences and aren't already favorites
      return !isAlreadyFavorite && (matchesCategory || matchesDifficulty)
    })
    
    // If we have enough recommendations, return them
    if (recommendedRecipes.length >= 3) {
      return { 
        recommendations: recommendedRecipes
          .sort(() => Math.random() - 0.5)
          .slice(0, 3) 
      }
    }
    
    // Otherwise, supplement with random recipes
    const remainingSlots = 3 - recommendedRecipes.length
    const additionalRecipes = allRecipes
      .filter(recipe => !userFavorites.includes(recipe.id) && !recommendedRecipes.includes(recipe))
      .sort(() => Math.random() - 0.5)
      .slice(0, remainingSlots)
    
    return { 
      recommendations: [...recommendedRecipes, ...additionalRecipes] 
    }
  }),
  
  // Clear recommendations
  clearRecommendations: () => set({ recommendations: [] }),
  
  // Existing Search and Filter Actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
  setMaxPrepTime: (time) => set({ maxPrepTime: time }),
  setMaxCookTime: (time) => set({ maxCookTime: time }),
  
  clearFilters: () => set({ 
    searchTerm: '',
    selectedCategory: '',
    selectedDifficulty: '',
    maxPrepTime: '',
    maxCookTime: ''
  }),
  
  // Computed filtered recipes (existing)
  get filteredRecipes() {
    const { recipes, searchTerm, selectedCategory, selectedDifficulty, maxPrepTime, maxCookTime } = get()
    
    return recipes.filter(recipe => {
      const matchesSearch = searchTerm === '' || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      
      const matchesCategory = selectedCategory === '' || recipe.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === '' || recipe.difficulty === selectedDifficulty
      const matchesPrepTime = maxPrepTime === '' || recipe.prepTime <= parseInt(maxPrepTime)
      const matchesCookTime = maxCookTime === '' || recipe.cookTime <= parseInt(maxCookTime)
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrepTime && matchesCookTime
    })
  },
  
  // Get unique categories for filter dropdown (existing)
  get categories() {
    const categories = get().recipes.map(recipe => recipe.category)
    return [...new Set(categories)]
  },
  
  // Get unique difficulties for filter dropdown (existing)
  get difficulties() {
    const difficulties = get().recipes.map(recipe => recipe.difficulty)
    return [...new Set(difficulties)]
  },
  
  // Existing recipe actions (preserved)
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
  removeRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  getRecipe: (id) => {
    return get().recipes.find(recipe => recipe.id === parseInt(id))
  }
}))

export default useRecipeStore