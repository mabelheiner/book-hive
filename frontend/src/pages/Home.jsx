import React, { useState } from 'react'
import SearchBook from './SearchBook'
import { useNavigate } from 'react-router-dom';

import "./Home.css";


const Home = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate()

    function searchBook(e) {
        e.preventDefault();
        const encodeTitle = encodeURIComponent(title);
        const encodeAuthor = encodeURIComponent(author);

        navigate(`/search?title=${encodeTitle}&author=${encodeAuthor}`);
    }
  return (
    <div>
        <header>
            <h1>Welcome to Book Hive!</h1>
            <p>🐝<i>Just buzzzzzzzing about books!</i>🐝</p>
            <button className='login-button'><a href="/login">Login</a></button>
        </header>
        <section className='description-card'>
            <h2>What We Believe</h2>
            <p>We believe in being honest about what material books contain and who should be reading them.</p>
        </section>
        <section className='description-card'>
            <h2>How We Do This</h2>
            <p>This platform is meant to be a safe place where you can find out more about what books contain before you read them.</p>
        </section>
        <section>
            <form onSubmit={searchBook}>
                <h2>Search a book here to find out more about it</h2>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)}/>

                <label htmlFor="author">Author</label>
                <input type="text" name="author" id="author" onChange={(e) => setAuthor(e.target.value)} />

                <button>Find Book</button>
            </form>
        </section>
    </div>
  )
}

export default Home