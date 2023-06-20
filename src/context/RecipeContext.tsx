import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthentication } from '../components/AuthUtils';
import { addToFavorites, fetchFavoriteRecipes, removeFromFavorites } from '../components/firebaseAPI';
import { Favorite } from '@mui/icons-material';

const APP_ID = '6792d8f2';
const APP_KEY = '92a44e00a924467ce710d1e6f28e9b96';

export interface Recipe {
  recipe: {
    label: string;
    calories: string;
    image: string;
    ingredients: string[];
    uri: string;
  };
}

export interface FavoriteRecipe {
  label: string;
  calories: string;
  image: string;
  ingredients: string[];
  uri: string;
}

interface RecipeContextType {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  isFavorite: boolean;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  favoriteRecipes: FavoriteRecipe[];
  toggleFavorite: (recipe: Recipe) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  updateSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  setRecipes: () => {},
  isFavorite: false,
  setIsFavorite: () => {},
  favoriteRecipes: [],
  toggleFavorite: () => {},
  query: '',
  setQuery: () => {},
  search: '',
  setSearch: () => {},
  updateSearch: () => {},
  handleSearch: () => {},
});

interface RecipeContextProviderProps {
  children: React.ReactNode;
}

export const RecipeContextProvider = ({ children }: RecipeContextProviderProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([]);
  const [query, setQuery] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();

    setRecipes(data.hits);
  };

  useEffect(() => {
    getRecipes();
  }, [query]);

  const { user } = useAuthentication();

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchRecipes = async () => {
      const userId = user.uid || '';
      const favoriteRecipes = await fetchFavoriteRecipes(userId);
      setFavoriteRecipes(favoriteRecipes);
    };

    fetchRecipes();
  }, [user]);

  const toggleFavorite = (recipe: Recipe) => {
    if (!user) {
      return;
    }

    const recipeUri = recipe.recipe?.uri;
    const isFavorite = favoriteRecipes?.some((favoriteRecipe) => favoriteRecipe.uri === recipeUri);

    const userId = user.uid || '';

    if (isFavorite) {
      removeFromFavorites(recipe.recipe, userId)
        .then(() => {
          setFavoriteRecipes((prevFavorites) =>
            prevFavorites.filter((favRecipe) => favRecipe.uri !== recipeUri)
          );
        })
        .catch((error) => {
          console.log('Error removing from favorites:', error);
        });
    } else {
      const { label, calories, image, ingredients, uri } = recipe.recipe;
      const favoriteRecipe: FavoriteRecipe = { label, calories, image, ingredients, uri };
      addToFavorites(userId, favoriteRecipe)
        .then(() => {
          setFavoriteRecipes((prevFavorites) => [...prevFavorites, favoriteRecipe]);
        })
        .catch((error) => {
          console.log('Error adding to favorites:', error);
        });
    }
  };

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        isFavorite,
        setIsFavorite,
        favoriteRecipes,
        toggleFavorite,
        query,
        setQuery,
        search,
        setSearch,
        updateSearch,
        handleSearch,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => useContext(RecipeContext);
