import React, {useEffect, useState} from 'react';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider, Outlet } from 'react-router-dom';
import Login from './components/Login';
import Favourites from './components/Favourites';
import Home from './components/Home';


function App() {

  const APP_ID = '6792d8f2';
  const APP_KEY = '2a44e00a924467ce710d1e6f28e9b96';

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
      </Route>
    )
  );

  useEffect (() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=6792d8f2&app_key=92a44e00a924467ce710d1e6f28e9b96`);
    const data = response.json();
    console.log(data);
  }
   return (
    <div className="App">
      <form className="search-form" action="">
      <input className="search-bar" type="text" />
      <button className="search-button" type="submit">Search</button>
      </form>
    </div>
    // <AuthContextProvider>
    //   <RouterProvider router={router} />
    // </AuthContextProvider>
  );
}

const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
