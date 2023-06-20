import React, { useEffect } from 'react';
import { Box, Typography, CardContent, CardActions, CardMedia, IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useAuthentication } from './AuthUtils';
import { useRecipeContext, Recipe } from '../context/RecipeContext';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { favoriteRecipes, toggleFavorite } = useRecipeContext();
  const { user } = useAuthentication();

  if (!user) {
    return null;
  }

  const { label, calories, image, uri } = recipe.recipe || {};

  const fRecipe = favoriteRecipes.map((item) => item.uri);
  const isFavorite = fRecipe.includes(uri);

  const handleFavoriteClick = () => {
    toggleFavorite(recipe);
    console.log("uri",uri)
  };

  const roundedCalories = Math.round(parseFloat(calories));

  return (
    <Box>
      <CardMedia component="img" height="194" src={image} alt={label} />
      <CardContent>
        <Typography variant="h5">{label}</Typography>
        <Typography variant="h6">{roundedCalories}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
          {isFavorite ? <Favorite color="error" /> : <Favorite />}
        </IconButton>
      </CardActions>
    </Box>
  );
};

export default RecipeCard;
