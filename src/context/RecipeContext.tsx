import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthentication } from '../components/AuthUtils';
import {
  addToFavorites,
  fetchFavoriteRecipes,
  removeFromFavorites,
} from '../components/firebaseAPI';
import { Favorite } from '@mui/icons-material';

const APP_ID = process.env.REACT_APP_APP_ID;
const APP_KEY = process.env.REACT_APP_APP_KEY;

///These interfaces define the structure of recipe objects and favorite recipe objects, respectively.
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

///This interface defines the type of the recipe context. So essentially if we want to pass these objects down through the context,
///then we must say to react, what type of objects they are specifically
export interface RecipeContextType {
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

///we then have to initialise default values
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

export const RecipeContextProvider = ({
  children,
}: RecipeContextProviderProps) => {
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

    ///this function is used to fetch recipes.

    const fetchRecipes = async () => {
      const userId = user.uid || '';
      const favoriteRecipes = await fetchFavoriteRecipes(userId);
      setFavoriteRecipes(favoriteRecipes);
    };

    fetchRecipes();
  }, [user]); //the recipes will only be fetched if there is an active and signed in user

  ///This will be triggered when the user cicks the heart icon on a card
  const toggleFavorite = (recipe: Recipe) => {
    if (!user) {
      return;
    }

    const recipeUri = recipe.recipe?.uri; ///get the recipe uri from the object and store it in recipeUri
    const isFavorite = favoriteRecipes?.some(
      (favoriteRecipe) => favoriteRecipe.uri === recipeUri
    ); ///loop through all the favorite recipe uris and if any of them match the current card uri, then return true

    const userId = user.uid || '';

    if (isFavorite) {
      ///if isFavorite is true, that means the item alrady exists in the database and the user wants to remove the item
      removeFromFavorites(recipe.recipe, userId)
        .then(() => {
          setFavoriteRecipes((prevFavorites) =>
            prevFavorites.filter((favRecipe) => favRecipe.uri !== recipeUri)
          );
        })
        .catch((error) => {
          console.log('Error removing from favorites:', error);
        });

      ///else this means the user wants to add the item to the database
    } else {
      const { label, calories, image, ingredients, uri } = recipe.recipe; ///we are getting all these data from the current card
      const favoriteRecipe: FavoriteRecipe = {
        label,
        calories,
        image,
        ingredients,
        uri,
      }; ///we then create a new variable called favoriteRecipe and add the data to it
      addToFavorites(userId, favoriteRecipe)
        .then(() => {
          setFavoriteRecipes((prevFavorites) => [
            ...prevFavorites,
            favoriteRecipe,
          ]); ///this opens up the favorites array, and adds the new favorites which has been stored in "favoriteRecipe" to the array
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
