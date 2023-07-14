import React from 'react';
import { useRecipeContext } from '../context/RecipeContext';
import RecipeCardGrid from './RecipeCardGrid';

function Home() {
  const { search, handleSearch, updateSearch } = useRecipeContext();

  return (
    <div className="App">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
          data-testid="search-input"
        />
        <button className="search-button" type="submit" data-testid="search-button">
          Search
        </button>
      </form>
      <RecipeCardGrid />
    </div>
  );
}

export default Home;
