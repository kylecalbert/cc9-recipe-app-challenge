import React, { useEffect, useState } from 'react';

import { useRecipeContext } from '../context/RecipeContext';
import RecipeCardGrid from './RecipeCardGrid';

function Home() {


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
