import React, { useEffect, useState } from "react";

function Home() {
  const APP_ID = '6792d8f2';
  const APP_KEY = '2a44e00a924467ce710d1e6f28e9b96';

  const [recipes, setRecipes] = useState([]);

  useEffect (() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=6792d8f2&app_key=92a44e00a924467ce710d1e6f28e9b96`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data);
  }
  
  return (
    <div className="App">
    <form className="search-form" action="">
    <input className="search-bar" type="text" />
    <button className="search-button" type="submit">Search</button>
    </form>
  </div>
  )

}
export default Home