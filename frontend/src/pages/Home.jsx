import React from 'react'
import SearchBook from './SearchBook'

import "./Home.css";

const Home = () => {
  return (
    <div>
        <header>
            <h1>Welcome to Book Hive!</h1>
            <p>🐝<i>Just buzzzzzzzing about books!</i>🐝</p>
            <p>Want to leave your own reviews? <button><a href="/login">Login</a></button></p>
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
            <h2>Search a book here to find out more about it</h2>
            <SearchBook />
        </section>
    </div>
  )
}

export default Home