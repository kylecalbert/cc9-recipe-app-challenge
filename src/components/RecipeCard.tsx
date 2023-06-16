import React from 'react';
import { Box, Typography, CardContent, CardActions, CardMedia, IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useAuthentication } from './AuthUtils';
import { useRecipeContext } from '../context/RecipeContext';

interface RecipeCardProps {
  title: string;
  calories: string;
  image: string;
  recipeUri: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, calories, image, recipeUri }) => {
  const { favoriteRecipes, toggleFavorite } = useRecipeContext();
  const { user } = useAuthentication();

  if (!user) {
    return null;
  }

  const isFavorite = favoriteRecipes.includes(recipeUri);
  console.log("isfaovurite",isFavorite)

  const handleFavoriteClick = () => {
    toggleFavorite(recipeUri);
  };

  const roundedCalories = Math.round(parseInt(calories, 10));

  return (
    <Box>
      <CardMedia component="img" height="194" src={image} alt={title} />
      <CardContent>
        <Typography variant="h5">{title}</Typography>
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
