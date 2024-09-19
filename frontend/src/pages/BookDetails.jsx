import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BookDetails = () => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams()

    const fetchBook = useCallback(async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${params.book}`);
            const data = await response.json()
            setBook(data)
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
  return (
    <div>
        <h1>Book Details</h1>
        <pre>{JSON.stringify(book, null, 2)}</pre>
    </div>
  )
}

export default BookDetails