import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider, Outlet } from 'react-router-dom';
import Login from './components/Login';
import Favourites from './components/Favourites';
import Home from './components/Home';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
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
      <Outlet />
    </div>
  );
};

export default App;