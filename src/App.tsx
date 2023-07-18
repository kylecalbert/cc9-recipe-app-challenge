import React from 'react';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import {
  BrowserRouter as Router,
  createRoutesFromElements,
  Route,
  Outlet,
} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Favorites from './components/Favourites';
import RecipeDetails from './components/RecipeDetails';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import { RecipeContextProvider } from './context/RecipeContext';

function App() {
  const routes = createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Login />} />
      <Route
        path="/home"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />
      <Route
        path="/favorites"
        element={
          <Protected>
            <Favorites />
          </Protected>
        }
      />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Route>
  );

  return (
    <AuthContextProvider>
      <RecipeContextProvider>
        <Router>
          <Root />
        </Router>
      </RecipeContextProvider>
    </AuthContextProvider>
  );
}

const Root = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
