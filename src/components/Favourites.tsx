import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchFavoriteRecipes } from './firebaseAPI';
import { useAuthentication } from './AuthUtils';
import RecipeCard from './RecipeCard';
import { useRecipeContext } from '../context/RecipeContext';

function Favourites() {
  const { user } = useAuthentication();
  const {recipes,favoriteRecipes} = useRecipeContext()
  const filteredRecipes = recipes.filter((recipe) =>
    favoriteRecipes.includes(recipe.recipe.uri)
  );


  return (
    <Box>
      {filteredRecipes.map((recipe) => (
       <div>

        {recipe.recipe.label}

       </div>
      ))}
    </Box>
  );
}

export default Favourites;
