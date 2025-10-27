import { create } from 'zustand'

const useRecipeStore = create((set) => ({
  recipes: [
    {
      id: 1,
      title: "Classic Chocolate Chip Cookies",
      description: "Soft and chewy chocolate chip cookies that are perfect for any occasion.",
      ingredients: ["2 1/4 cups all-purpose flour", "1 tsp baking soda", "1 tsp salt", "1 cup butter", "3/4 cup sugar", "2 large eggs", "2 cups chocolate chips"],
      instructions: "Preheat oven to 375°F. Mix dry ingredients. Cream butter and sugars. Add eggs and vanilla. Combine with dry ingredients. Fold in chocolate chips. Bake for 9-11 minutes."
    },
    {
      id: 2,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy vegetable stir fry with a savory sauce.",
      ingredients: ["2 tbsp oil", "3 cloves garlic", "1 bell pepper", "2 carrots", "1 cup broccoli", "1/4 cup soy sauce", "1 tbsp honey"],
      instructions: "Heat oil in a wok. Add garlic and stir-fry for 30 seconds. Add vegetables and cook until tender-crisp. Add sauce ingredients and toss to combine."
    }
  ],
  
  // Add a new recipe (existing functionality)
  addRecipe: (newRecipe) => 
    set((state) => ({ 
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] 
    })),
  
  // Set recipes (existing functionality)
  setRecipes: (recipes) => set({ recipes }),
  
  // Remove recipe (existing functionality - keeping it as removeRecipe for backward compatibility)
  removeRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id)
    })),
  
  // NEW: Update an existing recipe
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      )
    })),
  
  // NEW: Delete a recipe (alias for removeRecipe for consistency)
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id)
    })),
  
  // NEW: Get a specific recipe by ID
  getRecipe: (id) => {
    return useRecipeStore.getState().recipes.find(recipe => recipe.id === parseInt(id))
  }
}))

export default useRecipeStore