import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Box, Paper, Grid }  from '@mui/material';
import RecipeCard from './RecipeCard';
import { useRecipeContext } from '../context/RecipeContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RecipeCardGrid() {
  
 
  const {recipes} = useRecipeContext()
  console.log(recipes)

  return (
    <Box sx={{ flexGrow: 1, margin: 10,}}>
      <Grid container spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {recipes.map((recipe) => (
          <Grid item xs={3} sm={4} md={4} key={recipe.recipe.uri}>
            <Item>
              <RecipeCard title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} recipeUri={recipe.recipe.uri}/>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
