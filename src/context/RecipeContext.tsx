import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Favorite, SkipPrevious } from '@mui/icons-material';
import { useAuthentication } from '../components/AuthUtils';
import { addToFavorites, fetchFavoriteRecipes, removeFromFavorites } from '../components/firebaseAPI';
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
  toggleFavorite: (recipeUri: string) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

}

// Create the RecipeContext
const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  setRecipes: () => {},

  isFavorite: false,
  setIsFavorite: () => {},
  favoriteRecipes: [],
  toggleFavorite: () => {},


  query: "",
  setQuery: () => {},
  search: "",
  setSearch: () => {},

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
  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
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
      const userId = user.uid || '';

      const favoriteRecipes = await fetchFavoriteRecipes(userId);
      setFavoriteRecipes(favoriteRecipes);
    };

    fetchRecipes();
  }, [user]);



  //one recipe  uri will be passed in at a time
  const toggleFavorite = (recipeUri:string)=>{


    if(!user){
      return
    }

    const isFavorite = favoriteRecipes.includes(recipeUri); ///getting all the favorite recipes
    const userId = user.uid || '';

   ///if recipe uri exists and user clicks the favourite icon again.
    if(isFavorite){
      removeFromFavorites(recipeUri,userId).then(()=>{  ///remove the recipe and then update the favourite Recipes
        setFavoriteRecipes((prevFavorites)=>prevFavorites.filter((uri)=>uri!==recipeUri))
      }).catch((error)=>{
        console.log('Error removing from favorites:', error);


      })
    }else{  ///else add the recipe to the favorite
      addToFavorites(recipeUri,userId).then(()=>{
        setFavoriteRecipes((prevFavorites)=>[...prevFavorites,recipeUri])

      }).catch((error)=>{
        console.log('Error adding to favorites:', error);

      })
    }






  }

    setRecipes(data.hits);
  };

  useEffect(() => {
    getRecipes();
  }, [query]);

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
  };


  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        isFavorite,
        setIsFavorite,
        favoriteRecipes,
        toggleFavorite
        query,
        setQuery,
        search,
        setSearch,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};


export const useRecipeContext = (): RecipeContextType => {
  return useContext(RecipeContext);
};
