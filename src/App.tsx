import React from 'react';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider, Outlet } from 'react-router-dom';
import Login from './components/Login';
import Favourites from './components/Favourites';
import Home from './components/Home';


import  Navbar  from './components/Navbar';
import Protected from './components/Protected';
import { RecipeContextProvider } from './context/RecipeContext';

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
      <RecipeContextProvider>
      <RouterProvider router={router} />
      </RecipeContextProvider>
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