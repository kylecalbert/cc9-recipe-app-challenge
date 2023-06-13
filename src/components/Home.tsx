import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeCardGrid from "./RecipeCardGrid";

interface Recipe {
  label: string;
  calories: string;
  image: string;
  ingredients: string[];
}

function Home() {
  const APP_ID = '6792d8f2';
  const APP_KEY = '2a44e00a924467ce710d1e6f28e9b96';

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect (() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=6792d8f2&app_key=92a44e00a924467ce710d1e6f28e9b96`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }
  
  return (
    <div className="App">
    <form className="search-form" action="">
    <input className="search-bar" type="text" />
    <button className="search-button" type="submit">Search</button>
  
    </form>

    
    {recipes.map((recipe) => (
        <RecipeCard  key={recipe.label}  title={recipe.label} calories={recipe.calories} image={recipe.image} />
      ))}
    </div>
  );

}
export default Home