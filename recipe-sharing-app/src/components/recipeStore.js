import { create } from 'zustand';

/**
 * Helper that filters recipes by a search term.
 * It checks title, description, ingredients (array or string) and prepTime (if present).
 */
const filterHelper = (recipes, term) => {
  const q = (term || '').trim().toLowerCase();
  if (!q) return recipes;
  return recipes.filter((recipe) => {
    // title
    if (recipe.title && recipe.title.toLowerCase().includes(q)) return true;
    // description
    if (recipe.description && recipe.description.toLowerCase().includes(q)) return true;
    // ingredients: allow arrays or a string
    if (Array.isArray(recipe.ingredients) && recipe.ingredients.join(' ').toLowerCase().includes(q)) return true;
    if (typeof recipe.ingredients === 'string' && recipe.ingredients.toLowerCase().includes(q)) return true;
    // prepTime (number or string)
    if (recipe.prepTime && String(recipe.prepTime).toLowerCase().includes(q)) return true;
    return false;
  });
};

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  // add / update / delete keep filteredRecipes in sync
  addRecipe: (newRecipe) =>
    set((state) => {
      const recipes = [...state.recipes, newRecipe];
      return { recipes, filteredRecipes: filterHelper(recipes, state.searchTerm) };
    }),

  updateRecipe: (id, updatedFields) =>
    set((state) => {
      const recipes = state.recipes.map((r) => (String(r.id) === String(id) ? { ...r, ...updatedFields } : r));
      return { recipes, filteredRecipes: filterHelper(recipes, state.searchTerm) };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const recipes = state.recipes.filter((r) => String(r.id) !== String(id));
      return { recipes, filteredRecipes: filterHelper(recipes, state.searchTerm) };
    }),

  setRecipes: (recipes) =>
    set((state) => ({
      recipes,
      filteredRecipes: filterHelper(recipes, state.searchTerm),
    })),

  // search API
  setSearchTerm: (term) =>
    set((state) => ({
      searchTerm: term,
      filteredRecipes: filterHelper(state.recipes, term),
    })),

  // an action you can call if you change recipes externally and want to re-run the filter
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: filterHelper(state.recipes, state.searchTerm),
    })),
}));
