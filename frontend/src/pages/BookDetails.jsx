import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';
import './BookDetails.css'

const BookDetails = () => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    const bookDescription = useRef(null);

    const params = useParams()

    const fetchBook = useCallback(async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${params.book}`);
            const data = await response.json()
            console.log('data', data.items[0])
            setBook(data.items[0])
            setLoading(false)            
        } catch (error) {
            console.error('Failed to fetch book data:', error)
            setLoading(false)
        }
        
    }, [params.book])
    
    useEffect(() => {
        fetchBook();

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

    function displayDescription() {
        console.log('Reference', bookDescription.current.style)
        bookDescription.current.style = 'fit-content';
    }

  return (
    <div>
        <h1>Book Details</h1>
        <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title}/>
            
        <p>{book.volumeInfo.title} by <i>{displayAuthors(book.volumeInfo.authors)}</i></p>
        <StarRating rating={book.volumeInfo.averageRating}/>
        <p className='book-description' ref={bookDescription}>Description: {book.volumeInfo.description}</p>
        <p>... <button onClick={displayDescription}>See More</button></p>
    </div>
  )
}

export default BookDetails