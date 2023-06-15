import { createContext, useContext, ReactNode, useState,useEffect } from 'react';




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
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

// Create the RecipeContext
const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  setRecipes: () => {},
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
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");

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
