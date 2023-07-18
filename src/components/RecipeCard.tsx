import React from 'react';
import {
  Box,
  Typography,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
} from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useAuthentication } from './AuthUtils';
import { useRecipeContext, Recipe } from '../context/RecipeContext';
import { Link } from 'react-router-dom';

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
  };

  const roundedCalories = Math.round(parseFloat(calories));

  // Extract the recipe ID from the URI
  const uriParts = uri.split('#');
  const recipeId = encodeURIComponent(uriParts[1]); // Encode the URI component

  return (
    <Box data-testid="recipe-card">
      <CardMedia component="img" height="194" src={image} alt={label} />
      <CardContent>
        <Typography data-testid="recipe-label" variant="h6">
          {label}
        </Typography>
        <Typography data-testid="recipe-calories" variant="body2">
          {roundedCalories}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
          {isFavorite ? <Favorite color="error" /> : <Favorite />}
        </IconButton>
        <Link to={`/recipe/${recipeId}`}>View Details</Link>
      </CardActions>
    </Box>
  );
};

export default RecipeCard;
