import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import StarRating from './StarRating';
import './BookDetails.css'

import { FaRegHeart, FaHeart } from "react-icons/fa6";

import {getUser} from '../components/user.mjs'

const BookDetails = () => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorite, setFavorite] = useState(false);

    const [user, setUser] = useState(getUser())

    const [more, setMore] = useState(false);

    const params = useParams()

    const location = useLocation();
    const navigate = useNavigate();

    const fetchBook = useCallback(async () => {
        try {
            const searchParams = new URLSearchParams(location.search);
            const bookId = searchParams.get('book');
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookId}`);
            const data = await response.json()
            setBook(data.items[0])
            setLoading(false)            
        } catch (error) {
            console.error('Failed to fetch book data:', error)
            setLoading(false)
        }
        
    }, [params.book])
    
    useEffect(() => {
        fetchBook();

        try {
            const searchParams = new URLSearchParams(location.search);
            setUser(searchParams.get('user'))
        } catch (error) {
            setUser(null)
        }

    }, [fetchBook])

    if (loading) {
        return <div>Loading book details...</div>
    }

    function displayAuthors(authors) {
        let authorList = ""
        
        for (const index in authors) {
          if (index != (authors.length - 1)) {
            authorList += authors[index] + ', '
          }
          else {
            authorList += authors[index]
          }
        }
        return authorList;
      }

    function displayDescription(description) {
        let displayDescription = "";
        let count = 0;
        if (more == true) {
            return description
        }

        else {
            for (let index in description) {
                displayDescription += description[index];
                if (description[index] == '.') {
                    count += 1
                }
                
                if (count > 10) {
                    break
                }
            }
            return displayDescription;
        }
    }

    function handleFavorite() {
        if (favorite == true) {
            setFavorite(false)
        }
        else {
            setFavorite(true)
        }
    }

  return (
    <div>
        <h1>Book Details</h1>
        <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title}/>
        {user != null ? <button onClick={handleFavorite}>{favorite ? <FaHeart /> : <FaRegHeart />}</button> :
        <></>}
            
        <p>{book.volumeInfo.title} by <i>{displayAuthors(book.volumeInfo.authors)}</i></p>
        <StarRating rating={book.volumeInfo.averageRating}/>
        <p>Description: {displayDescription(book.volumeInfo.description)}</p> 
        <button onClick={() => setMore(!more)}>See {more ? 'Less' : 'More'}</button>
    </div>
  )
}

export default BookDetails