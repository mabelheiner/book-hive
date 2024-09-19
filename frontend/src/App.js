import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AddBook from './pages/AddBook';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SearchBook from './pages/SearchBook';
import Home from './pages/Home';

function App() {

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
