import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchFavoriteRecipes } from './firebaseAPI';
import { useAuthentication } from './AuthUtils';
import RecipeCard from './RecipeCard';
import { useRecipeContext } from '../context/RecipeContext';

function Favourites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);
  const { user } = useAuthentication();
  const {recipes} = useRecipeContext()

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchRecipes = async () => {
      const userId = typeof user.uid === 'string' ? user.uid : '';
      const recipes = await fetchFavoriteRecipes(userId);
      setFavoriteRecipes(recipes);

    };

    fetchRecipes();
  }, [user]);

  if (!user) {
    return null;
  }



  const filteredRecipes = recipes.filter((recipe) =>
    favoriteRecipes.includes(recipe.recipe.uri)
  );

  console.log(recipes)
  console.log("filtered",filteredRecipes)


  return (
    <Box>
      {favoriteRecipes.map((recipeUri) => (
        <Link key={recipeUri} to={recipeUri}>
          {recipeUri}
        </Link>
      ))}
    </Box>
  );
}

export default Favourites;
