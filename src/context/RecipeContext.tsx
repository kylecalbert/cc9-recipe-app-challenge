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
}

// Create the RecipeContext
const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  setRecipes: () => {},
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

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=rice&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    console.log(data)

    setRecipes(data.hits); 
  };
  


  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

// Custom hook to access the RecipeContext
export const useRecipeContext = (): RecipeContextType => {
  return useContext(RecipeContext);
};
