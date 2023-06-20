
import { Box } from '@mui/material';

import { useRecipeContext } from '../context/RecipeContext';

function Favourites() {
 const {favoriteRecipes} = useRecipeContext()



  return (
    <Box>
      {favoriteRecipes.map((recipe)=>(<div>

     {recipe.label}

      </div>))}

     

    </Box>
  );
}

export default Favourites;