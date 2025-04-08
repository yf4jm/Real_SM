// src/App.js
import { useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, useSearchParams } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import AppRoutes from './AppRoutes'; 
import React from 'react';

export const Context = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={[user, setUser]}>
      
      <Router>
        {/* Remove sticky positioning here */}
        <header className="relative"> 
          <Navbar />
        </header>
        

        {/* Add padding to main content */}
        <main className="min-h-[calc(100vh-4rem)] pt-16">
          <AppRoutes />
        </main>
        
      </Router>
    </Context.Provider>
  );
}

export default App;