import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const SearchBook = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [user, setUser] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

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
        const currentUser = decodeURIComponent(params.get('user'));

        console.log('Information received:', 'title: ', newTitle, `\n`, "author: ", newAuthor, 'user', currentUser)

        if (newTitle != "null") {
          setTitle(newTitle);
        }
        if (newAuthor != "null") {
          setAuthor(newAuthor);
        }

        if (currentUser != null) {
          setUser(currentUser);
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
    
    function goToBookDetails(book) {
      const bookId = encodeURIComponent(book.id);
      const encodeUser = encodeURIComponent(user);
      if (user != "null") {
        navigate(`/book/details?user=${encodeUser}&book=${bookId}`)
      }
      else {
        navigate(`/book/details?book=${bookId}`)
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
            
            <p>{book.volumeInfo.title} </p><p>by <i>{displayAuthors(book.volumeInfo.authors)}</i></p>
            <button onClick={() => goToBookDetails(book)}>See more</button>
          </li>
        ))}
      </ul>
    ): (<></>)}
    </>
  )
}

export default SearchBook