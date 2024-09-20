import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddBook from './pages/AddBook';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import BookDetails from './pages/BookDetails';
import SearchBook from './pages/SearchBook';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename=''>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signup/:username' element={<SignUp />}/>
        <Route path='/search' element={<SearchBook />}/>
        <Route path='/addBook/:id' element={<AddBook />}/>
        <Route path='/book/details/:book' element={<BookDetails />}></Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
