// src/App.js
import { useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import AppRoutes from './AppRoutes'; // Import your routes component
import React from 'react';

export const Context = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={[ user, setUser ]}>
      <Router>
        <header className="sticky top-0 z-50 "> 
          <Navbar />
          </header>
            <AppRoutes /> {/* Use your routes component here */}
      </Router>
    </Context.Provider>
  );
}

export default App;
