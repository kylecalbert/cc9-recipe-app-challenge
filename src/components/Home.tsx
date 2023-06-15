import React, { useEffect, useState } from 'react';

import { useRecipeContext } from '../context/RecipeContext';
import RecipeCardGrid from './RecipeCardGrid';

function Home() {
  const {recipes } = useRecipeContext();
  const {query, setQuery } = useRecipeContext()
  const {search, setSearch } = useRecipeContext()




  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

 useEffect(()=>{

},[query])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
  }
  
  return (
    <div className="App">
      <form className="search-form" onSubmit={handleSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <RecipeCardGrid />
    </div>
  );
}

export default Home;
