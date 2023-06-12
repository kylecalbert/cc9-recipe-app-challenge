import React from 'react';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider, Outlet } from 'react-router-dom';
import Login from './components/Login';
import Favourites from './components/Favourites';
import Home from './components/Home';


function App() {

  const APP_ID = '6792d8f2';
  const APP_KEY = '2a44e00a924467ce710d1e6f28e9b96'
  const exampleReq = ``
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
