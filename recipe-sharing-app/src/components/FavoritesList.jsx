// src/components/FavoritesList.jsx
import useRecipeStore from '../store/recipeStore'


const FavoritesList = () => {
  const favorites = useRecipeStore((state) =>
    state.favorites.map((id) => state.recipes.find((recipe) => recipe.id === id))
  );

  return (
    <div>
      <h2>❤️ My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        favorites.map(
          (recipe) =>
            recipe && (
              <div key={recipe.id} style={{ marginBottom: "10px" }}>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
              </div>
            )
        )
      )}
    </div>
  );
};

export default FavoritesList;
