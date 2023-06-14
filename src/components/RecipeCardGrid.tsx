import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Box, Paper, Grid }  from '@mui/material';
import RecipeCard from './RecipeCard';
import { UserAuth } from '../context/AuthContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RecipeCardGrid() {
  
 
  const {recipes} = UserAuth()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {recipes.map((recipe) => (
          <Grid item xs={2} sm={4} md={4} key={recipe.recipe.uri}>
            <Item>
              <RecipeCard title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image}/>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
