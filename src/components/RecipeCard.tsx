import React from 'react'
import { Box, Typography, CardContent, CardActions, CardMedia, IconButton, } from '@mui/material';
import { Favorite, } from '@mui/icons-material';

function RecipeCard({title, calories, image}:any) {
  return (
    <Box sx={{ maxWidth: 345, bgcolor: 'light', boxShadow: 1, margin: 2 }}>
      <CardMedia
        component="img"
        height="194"
      /> {image}
        <CardContent>
        <Typography variant="h5" color="text.secondary">
        {title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
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