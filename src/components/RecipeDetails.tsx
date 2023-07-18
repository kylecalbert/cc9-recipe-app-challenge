import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecipeContext, Recipe } from '../context/RecipeContext';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Add '?' to make id parameter optional
  const { recipes } = useRecipeContext();

  // Check if id exists before decoding
  const decodedId = id ? decodeURIComponent(id) : '';

  // Loop through each recipe and compare the encoded URIs
  const recipe: Recipe | undefined = recipes.find((recipe) => {
    const uriParts = recipe.recipe.uri.split('#');
    const recipeId = encodeURIComponent(uriParts[1]);
    return recipeId === decodedId;
  });

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const { label, ingredients } = recipe.recipe;

  console.log(ingredients);
  return (
    <div>
      <h2>{label}</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <h2 key={index}>{ingredient.text}</h2>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetails;
