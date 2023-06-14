import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeCardGrid from "./RecipeCardGrid";

interface Recipe {
  recipe: {
    label: string;
    calories: string;
    image: string;
    ingredients: string[];

  };
}

function Home() {
  const APP_ID = '6792d8f2';
  const APP_KEY = '92a44e00a924467ce710d1e6f28e9b96';
  

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=rice&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }
  console.log(recipes)
  
  return (
    <div className="App">
      <form className="search-form" action="">
        <input className="search-bar" type="text" />
        <button className="search-button" type="submit">Search</button>
      </form>

      {recipes.map((recipe) => (
        <RecipeCard key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} />
      ))}
    </div>
  );
}

export default Home;
