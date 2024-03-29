import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Box, Paper, Grid } from '@mui/material';
import RecipeCard from './RecipeCard';
import { useRecipeContext, Recipe } from '../context/RecipeContext';

interface RecipeCardProps {
  recipe: Recipe;
  recipeUri: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

export default function RecipeCardGrid() {
  const { recipes } = useRecipeContext();

  return (
    <Box sx={{ flexGrow: 1, margin: 10 }}>
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {recipes.map((recipe) => (
          <Grid item xs={3} sm={4} md={4} key={recipe.recipe.uri}>
            <Item>
              <RecipeCard recipe={recipe} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
