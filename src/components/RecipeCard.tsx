import React, { useState } from 'react';
import { Box, Typography, CardContent, CardActions, CardMedia, IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { addToFavorites, removeFromFavorites } from './firebaseAPI';
import { useAuthentication } from './AuthUtils';

interface RecipeCardProps {
  title: string;
  calories: string;
  image: string;
  recipeUri: string;

}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, calories, image, recipeUri }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const{user} = useAuthentication()

  if(!user){
    return null
  }

  const handleFavoriteClick = () => {

    setIsFavorite((currentState)=>!currentState)// on click take the value of isFavorite  and set it to the opposite value (!prevIsFavorite) -toggling
    if(isFavorite){
      removeFromFavorites(recipeUri,user.uid) //if favourite is true, and user clicks it, remove 
    }else{
      addToFavorites(recipeUri,user.uid) ///else add to favourite
    }


  

  };

      // setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    // if (isFavorite) {
    //   removeFromFavorites(recipeUri, user.uid); // Pass userId argument
    // } else {
    //   addToFavorites(recipeUri, user.uid); // Pass userId argument
    // }

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
