
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchFavoriteRecipes } from './firebaseAPI';
import { useAuthentication } from './AuthUtils';
import RecipeCard from './RecipeCard';
import { useRecipeContext } from '../context/RecipeContext';

function Favourites() {
 const {favoriteRecipes} = useRecipeContext()



  return (
    <Box>
      {favoriteRecipes.map((recipe)=>(<div>

     {recipe.label}

      </div>))}

     

    </Box>
  );
}

export default Favourites;