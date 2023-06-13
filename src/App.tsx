import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider, Outlet } from 'react-router-dom';
import Login from './components/Login';
import Favourites from './components/Favourites';
import Home from './components/Home';

import RecipeCard from './components/RecipeCard';
import RecipeCardGrid from './components/RecipeCardGrid';


import  Navbar  from './components/Navbar';
import Protected from './components/Protected';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Login />} />
        <Route path="/home" element={<Protected><Home /></Protected>} />
        <Route path="/favourites" element={<Protected><Favourites /></Protected>} />
      </Route>
    )
  );

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

const Root = () => {
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  );
};

export default App;