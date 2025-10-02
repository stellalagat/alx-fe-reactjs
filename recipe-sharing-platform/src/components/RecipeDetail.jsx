import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams(); // get recipe id from URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json") // fetch the data.json
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r) => r.id === parseInt(id));
        setRecipe(found);
      })
      .catch((err) => console.error("Error loading recipe:", err));
  }, [id]);

  if (!recipe) {
    return <div className="text-center mt-20">Loading recipe...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-600">{recipe.title}</h1>
          <p className="mt-2 text-gray-600">{recipe.summary}</p>

          {/* Ingredients Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              {recipe.ingredients && recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Instructions</h2>
            <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-2">
              {recipe.instructions && recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <Link
            to="/"
            className="inline-block mt-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
