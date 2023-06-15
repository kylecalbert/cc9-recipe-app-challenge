import React, { useEffect, useState } from 'react';

import { useRecipeContext } from '../context/RecipeContext';
import RecipeCardGrid from './RecipeCardGrid';

function Home() {
  const { recipes, setRecipes } = useRecipeContext();

  const APP_ID = '6792d8f2';
  const APP_KEY = '92a44e00a924467ce710d1e6f28e9b96';

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=rice&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits); 
  };


  return (
    <div className="App">
      <form className="search-form" action="">
        <input className="search-bar" type="text" />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      <RecipeCardGrid />
    </div>
  );
}

export default Home;
