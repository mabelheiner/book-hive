import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';

const SearchBook = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const location = useLocation();

    if (title == null) {
      setTitle('')
    }

    if (author == null) {
      setAuthor("")
    }
    function fetchParams() {
      try {       
        
        const params = new URLSearchParams(location.search);
        const newTitle = decodeURIComponent(params.get('title'));
        const newAuthor = decodeURIComponent(params.get('author'));

        console.log('Information received:', 'title: ', newTitle, `\n`, "author: ", newAuthor)

        if (newTitle != "null") {
          setTitle(newTitle);
        }
        if (newAuthor != "null") {
          setAuthor(newAuthor);
        }

        searchBook(newTitle, newAuthor);

      } catch (error) {
        console.log('nothing passed')
        setTitle("");
        setAuthor("")
      }
    }

    useEffect(() => {
        fetchParams();
    }, [])

    async function searchBook(title, author) {
      if (author != "" && title != "" && author != "null" && title != "null"){
        console.log(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&inauthor:${author}&saleability=FOR_SALE&filter=ebooks`)
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&inauthor:${author}&saleability=FOR_SALE&&filter=ebooks`);
        const data = await response.json()
        console.log('data', data)
        setBooks(data.items);
      }

      else if (author != "" && author != "null") {
        console.log(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&saleability=FOR_SALE&filter=ebooks`)
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&saleability=FOR_SALE&&filter=ebooks`);
        const data = await response.json()
        console.log('data', data)
        setBooks(data.items);
      }

      else if (title != "" && title != "null") {
        console.log(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&saleability=FOR_SALE&filter=ebooks`)
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&saleability=FOR_SALE&&filter=ebooks`);
        const data = await response.json()
        console.log('data', data)
        setBooks(data.items);
      }

      else {
        setBooks(null)
      }
    }

    async function searchBookByTitle(e) {
      e.preventDefault();
      console.log('Searching')
      if (author != "" && title != "" && author != "null" || title != "null"){
        console.log('First true')
        console.log(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&inauthor:${author}&saleability=FOR_SALE&filter=ebooks`)
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&inauthor:${author}&saleability=FOR_SALE&&filter=ebooks`);
        const data = await response.json()
        console.log('data', data)
        setBooks(data.items);
      }

      else if (author != "" && author != "null") {
        console.log('second true')
        console.log(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&saleability=FOR_SALE&filter=ebooks`)
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&saleability=FOR_SALE&&filter=ebooks`);
        const data = await response.json()
        console.log('data', data)
        setBooks(data.items);
      }

      else if (title != "" && title != "null") {
        console.log('third true')
        console.log(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&saleability=FOR_SALE&filter=ebooks`)
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&saleability=FOR_SALE&&filter=ebooks`);
        const data = await response.json()
        console.log('data', data)
        setBooks(data.items);
      }

      else {
        setBooks(null)
      }
    }

    function displayImages(book) {
        try {
          return book.volumeInfo.imageLinks.thumbnail;
        } catch (error) {
          return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s';
        }
    }

    function displayAuthors(authors) {
      console.log('Authors', authors);
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

    function displayDescription(book) {
      try {
        return book.volumeInfo.description
      } catch (error) {
        return ''
      }
    }
    

  return (
    <>
    <form onSubmit={searchBookByTitle}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)}/> 
        <label htmlFor="author">Author</label>
        <input type="text" name='author' id='author' onChange={(e) => setAuthor(e.target.value)}/>
        <button>Find Book</button>
    </form>
    {books ? (
    <ul>
        {books.map((book, index) => (
          <li key={index}>
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title}/>
            
            <a href={`/book/details/${book.id}`}><p>{book.volumeInfo.title} </p></a><p>by <i>{displayAuthors(book.volumeInfo.authors)}</i></p>
          </li>
        ))}
      </ul>
    ): (<></>)}
    </>
  )
}

export default SearchBook