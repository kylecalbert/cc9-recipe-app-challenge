import { createContext, useContext, ReactNode, useState } from 'react';

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
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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
