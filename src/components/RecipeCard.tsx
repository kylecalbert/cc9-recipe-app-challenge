import React from 'react'
import { Box, Typography, CardContent, CardActions, CardMedia, IconButton, } from '@mui/material';
import { Favorite, } from '@mui/icons-material';

function RecipeCard({title, calories, image}:any) {
  return (
    <Box sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        alt={image}
      /> {image}
        <CardContent>
        <Typography variant="body2" color="text.secondary">
        {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {calories}
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