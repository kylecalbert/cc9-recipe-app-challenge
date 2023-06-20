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

  const { label, calories, image, uri } = recipe.recipe || {};     ///for each recipe that gets loaded on the page, get these data from the object 

  const fRecipe = favoriteRecipes.map((item) => item.uri);    /// retrieve and store every uri that exists in the favorites stored on firebase
  const isFavorite = fRecipe.includes(uri);     /// if the recipe card that has been rendered includes a uri stored on friebase, return true, else return false



  ///when the user clicks the favorite icon we want to do a check weather its being added or removed
  const handleFavoriteClick = () => {
    toggleFavorite(recipe);  ///we pass in the recipe data to this function so that the data can get added to the database
    ///tgo the recipecontext and find this function
 
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
