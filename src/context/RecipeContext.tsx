import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Favorite } from '@mui/icons-material';
import { useAuthentication } from '../components/AuthUtils';
import { fetchFavoriteRecipes } from '../components/firebaseAPI';
const APP_ID = '6792d8f2';
const APP_KEY = '92a44e00a924467ce710d1e6f28e9b96';

interface Recipe {
  recipe: {
    label: string;
    calories: string;
    image: string;
    ingredients: string[];
    uri: string;
  };
}

interface RecipeContextType {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  isFavorite: boolean;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  favoriteRecipes: string[];
}

// Create the RecipeContext
const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  setRecipes: () => {},
  isFavorite: false,
  setIsFavorite: () => {},
  favoriteRecipes: [],
});

interface RecipeContextProviderProps {
  children: ReactNode;
}

export const RecipeContextProvider = ({
  children,
}: RecipeContextProviderProps) => {
  useEffect(() => {
    getRecipes();
  }, []);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=rice&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();

    setRecipes(data.hits);
  };

  const { user } = useAuthentication();

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchRecipes = async () => {
      const userId = typeof user.uid === 'string' ? user.uid : '';
      const recipes = await fetchFavoriteRecipes(userId);
      setFavoriteRecipes(recipes);
    };

    fetchRecipes();
  }, [user]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        isFavorite,
        setIsFavorite,
        favoriteRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};


export const useRecipeContext = (): RecipeContextType => {
  return useContext(RecipeContext);
};
