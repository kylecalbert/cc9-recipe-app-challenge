import React from 'react'
import { Box, Typography, CardContent, CardActions, CardMedia, IconButton, } from '@mui/material';
import { Favorite, } from '@mui/icons-material';

function RecipeCard({title, calories, image}:any) {
  const roundedCalories = Math.round(calories); 

  return (
    <Box>
      <CardMedia
        component="img"
        height="194"
        src={image}
      />
        <CardContent>
        <Typography variant="h5">
        {title}
        </Typography>
        <Typography variant="h6">
        {roundedCalories}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite/>
          </IconButton>
       </CardActions> 
    </Box>
    
  )
}

export default RecipeCard