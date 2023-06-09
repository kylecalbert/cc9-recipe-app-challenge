import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <div>PROJECT</div>
      </AuthContextProvider>
    </div>
  );
}

export default App;
