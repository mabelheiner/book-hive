import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserHome = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    async function fetchUser() {
        try{
            const searchParams = new URLSearchParams(location.search)
            const userId = searchParams.get('user')
            console.log('User id from url', userId)

            const user = await axios.get(`http://localhost:5000/users/${userId}`)
            const data = user.data;
            console.log('Data received', data)

            setUser(data)
        } catch (error) {
            navigate('/')
        }
    }

    useEffect(() => {
        fetchUser();
    }, [location.search])


    function searchBook(e) {
        e.preventDefault();
        const encodeTitle = encodeURIComponent(title);
        const encodeAuthor = encodeURIComponent(author);

        navigate(`/search?title=${encodeTitle}&author=${encodeAuthor}`);
    }
  return (
    <div><header>
            <h1>Hi, {user.firstName}!</h1>
            <button className='login-button'><a href="/login">Logout</a></button>
        </header>
        <section className='description-card'>
            <h2>Your Favorites</h2>
            <p>Your books that you "heart" will appear here.</p>
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

export default UserHome